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

var func = {

  sendGCM: function(type){

    syncTerm = ['events', 'messages', 'talks', 'groups', 'locations', 'topics', 
      'signups', 'all'];

    async.waterfall([function(callback){
      ids = [];
      User.find().lean().exec(function(err, results){
        if (err) {console.log(err);}
        for(var i = 0; i < results.length; i++){
          console.log(results[i].gcm);
          if(results[i].gcm != null){
            ids.push(results[i].gcm);
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
          // "notification": {
          //     "title": "hello",
          //     "text": "hello",
          //     "icon": "icon",
          //     "click_action": "OPEN_CCM"
          // },
          "data": {
              "sync":syncTerm[type]
          }
      };
      query = JSON.stringify(query);

      console.log(ids);
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

      console.log('sending gcm');
      var req = http.request(options, function(res){
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
          console.log('BODY: ' + chunk);
        });
      });
      req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
        console.log('on');
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

module.exports = func;
