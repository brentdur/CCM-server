/*
  Event Controller
 */

var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Event = mongoose.model('Event'),
  Location = mongoose.model('Location');
var auth = require('./auth/auth.service');
var http = require('https');
var async = require('async');
var User = mongoose.model('User');
var config = require('../config/config')

var gcm = {

  terms: {
    events:'events',
    messages: 'messages',
    talks: 'talks',
    groups: 'groups',
    locations: 'locations',
    topics: 'topics',
    signups: 'signups',
    conversations: 'conversations',
    broadcasts: 'broadcasts',
    all: 'all'
  },

  createNotification: function(title, text) {
    return {
      "payload": {
        "title" : title,
        "text" : text,
        "icon": "icon",
        "click_action": "OPEN_CCM"
      }
    };
  },

  syncGCM: function(terms, users, notification) {

    //TODO add clearing of failed GCM keys
    async.waterfall([function(callback){
      var ids = [];
      var search = {};
      if(users && (users instanceof Array)){
        var search = {
          '_id': {$in:users}
        };
      }
      else if(users){
        var search = {
          '_id': users
        };
      };
      users = [];
      User.find(search).select('gcm').exec(function(err, results){
        if (err) {console.log(err);}
        if (!results) {console.log('GCM Error: No users found')};
        for(var i = 0; i < results.length; i++){
          if(results[i].gcm && results[i].gcm.length > 0){
            ids.push(results[i].gcm);
            users.push(results[i]);
          }
        }
        if (ids.length < 1){
          callback('done');
          return;
        }
        callback(null, ids);
      })
    },
    function(ids, callback){
      var query = {
        "registration_ids": ids,
        "content_available": terms && terms.length != 0,
        "data": {
              "sync":terms.toString()
          }
      };

      if (notification && notification.payload){
        query.notification = notification.payload;
      }
      query = JSON.stringify(query);

      console.log('GCM');
      console.log(query);

      var options = {
        hostname: 'gcm-http.googleapis.com',
        path: '/gcm/send',
        port: 443,
        method: 'POST',
        headers: {
          'Authorization': 'key=' + config.key.gcm,
          'Content-Type': 'application/json'
        }
      };

      var req = http.request(options, function(res){
        console.log('STATUS: ' + res.statusCode);
        res.setEncoding('utf8');
        var body = '';
        res.on('data', function (chunk) {
          body += chunk;
        });

        res.on('end', function(err){
          body = JSON.parse(body);
          console.log(body);
          
          for (var i = 0; i < body.results.length; i++){
            var error = body.results[i].error || null;
            if (error && ( error === 'InvalidRegistration' || error === 'NotRegistered' )) {
              console.log('FAILED USER ID: ' + users[i]);
              users[i].removeGCM();
            }
          }
        })

      });
      req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
      });

      // write data to request body
      req.write(query);
      req.end();
      callback(null);
    }
    ], function(err, results){
      console.log(err);
      return;
    });
  }

};

module.exports = gcm;
