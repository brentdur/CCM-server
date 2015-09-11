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

    ids = [];

    User.find({}, function(err, results){
      if (err) {console.log(err);}
      for(var i = 0; i < results.length; i++){
        ids.push(results[i].gcm);
      }
    })

    syncTerm = ['events', 'messages', 'talks', 'groups', 'locations', 'topics', 
    'signups'];

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
    });

    // write data to request body
    req.write(query);
    req.end();
  }

};

module.exports = func;
