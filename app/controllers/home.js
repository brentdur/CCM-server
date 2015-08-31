/*
  Home, html Controller
 */

var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Event = mongoose.model('Event');
  Talk = mongoose.model('Talk');
  Message = mongoose.model('Message'),
  Location = mongoose.model('Location'),
  User = mongoose.model('User'),
  Group = mongoose.model('Group'),
  Topic = mongoose.model('Topic'),
  Signup = mongoose.model('Signup'),
  async = require('async');
  var gcm = require('../gcm');
  var config = require('../../config/config');

module.exports = function (app) {
  app.use('/', router);
}

//gets all the different information and assigns the arrays to variables delivered to the webpage
router.get('/', function (req, res, next) {
  if(config.env !== 'production'){
    async.series([
        function(callback){
          Event.find(function (err, events) {
            callback(err, events);
         });
        },
        function(callback){
          Message.find(function (err, messages){
            callback(err, messages);
          });
        },
        function(callback){
          Talk.find(function (err, talks){
            callback(err, talks);
          });
        },
        function(callback){
          Location.find(function(err, locations){
            callback(err, locations);
          });
        },
        function(callback){
          User.find(function(err, users){
            callback(err, users);
          });
        },
        function(callback){
          Group.find(function(err, groups){
            callback(err, groups);
          });
        },
        function(callback){
          Topic.find(function(err, topics){
            callback(err, topics);
          });
        },
        function(callback){
          Signup.find(function(err, signups){
            callback(err, signups);
          });
        }
      ], function(err, results){
        if (err) return next(err);
        res.render('index', {
            title: 'CCM Server',
            events: results[0],
            msgs: results[1],
            talks: results[2],
            locs: results[3],
            users: results[4],
            groups: results[5],
            topics: results[6],
            signups: results[7]
            });

    });
  }
  else {
    res.render('partials/welcome', {
            title: 'CCM'
            });
  }
});

router.get('/privacy', function (req, res, next) {
  res.render('partials/privacy', {
          title: 'Privacy Policy'
          });
});