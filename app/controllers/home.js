var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Event = mongoose.model('Event');
  Talk = mongoose.model('Talk');
  Message = mongoose.model('Message'),
  Location = mongoose.model('Location'),
  User = mongoose.model('User'),
  Group = mongoose.model('Group'),
  async = require('async');

module.exports = function (app) {
  app.use('/', router);
}

router.get('/', function (req, res, next) {
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
      }
    ], function(err, results){
      if (err) return next(err);
      res.render('index', {
          title: 'Generator-Express MVC',
          events: results[0],
          msgs: results[1],
          talks: results[2],
          locs: results[3],
          users: results[4],
          groups: results[5]
          });

  });
});