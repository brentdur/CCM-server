/*
  Messages Controller
 */

var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Message = mongoose.model('Message');
  Group = mongoose.model('Group');
  var auth = require('../auth/auth.service');
  var async = require('async');

module.exports = function (app) {
  app.use('/api/messages', router);
}

//gets all messages
router.get('/', auth.inGroup('admin'), function (req, res, next) {
  Message.find(function (err, messages) {
    if (err) return next(err);
    res.json(messages);
    });
  });

//gets messages only addressed to the user-group of the current user
router.get('/mine', auth.isAuthenticated(), function (req, res, next) {
  var groups = req.user.groups;
  var messages = [];

  async.forEachOf(groups, function(item, key, callback){
    Message.find({to: item}, function(err, msgs) {
      if(err) { callback(err); }
      console.log(item);
      console.log(msgs);
      for(var i = 0; i < msgs.length; i++){
         messages.push(msgs[i]);
         console.log(messages.indexOf(msgs[i]));
      }
      callback();
    })

  }, function(err){
    if (err) return next(err);
    console.log(messages);
    res.json(messages);
  });
});

//checks if logged-in user has write permission, then creates the message
//either takes in the group id or group name, if the second is given it finds the id automatically
router.post('/', auth.canWrite('Msgs'), function(req, res, next){
  req.body.creator = req.user._id;
  console.log(req.body.to);
  async.waterfall([
    function(callback){
      req.body.simpleTo = req.body.to;
      if(req.body.groupid){
        req.body.to = req.body.groupid;
        callback();
      }
      else {
        Group.findOne({name: req.body.to}, '_id', function(err, group){
          if(err) return next(err);
          if(!group) return next();
          console.log(group);
          req.body.to = group.id;
          callback(err);
        })
      }
    },
    function(callback){
      if(!req.body.date){
        req.body.date = Date();
      }
      console.log(req.body.to);
      var message = new Message(req.body).save(function(err) {
        console.log('saved');
        callback(err);
      });
    }

    ], function(err, results){
      if(err) return next(err);
      res.status(200).end();
  })
  
  
})