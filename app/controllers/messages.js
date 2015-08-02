/*
  Messages Controller
 */
/**
 * @apiDefine msgGet
 * @apiSuccess {String} _id Unique string for message
 * @apiSuccess {String} from Name of sender
 * @apiSuccess {Group} to Recipient group of the message
 * @apiSuccess {String} simpleTo Text name of the group for display purposes
 * @apiSuccess {String} subject Subject of the message, used like a title
 * @apiSuccess {String} date Formated date that the message was sent
 * @apiSuccess {String} message Actualy message text
 * @apiSuccess {Number} version Version identifier of the message
 * 
 * @apiSuccessExample {json} Response Example
 * [
 *   {
 *     "_id": "55be45b8b550fde113cec036",
 *     "from": "Michael",
 *     "to": "55a71acf6de35f6d159b07bc",
 *     "simpleTo": "admin",
 *     "subject": "Hello",
 *     "date": "2015-09-09T04:00:00.000Z",
 *     "message": "Hey guys, welcome to RUF",
 *     "__v": 0,
 *     "version": 0
 *   },
 *   {...}
 * ]
 */

var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Message = mongoose.model('Message');
  Group = mongoose.model('Group');
  var auth = require('../auth/auth.service');
  var async = require('async');
  var gcm = require('../gcm');

module.exports = function (app) {
  app.use('/api/messages', router);
}

/**
 * @api {GET} /api/messages Get all messages
 * @apiGroup Messages
 * @apiVersion 1.0.0
 *
 * @apiUse msgGet
 *
 * @apiPermission inGroup(admin)
 * @apiUse authHeader
 */
//gets all messages
router.get('/', auth.inGroup('admin'), function (req, res, next) {
  Message.find(function (err, messages) {
    if (err) return next(err);
    res.json(messages);
    });
  });

/**
 * @api {GET} /api/messages/mine Get my messages
 * @apiGroup Messages
 * @apiDescription Gets messages addressed to the groups of the current user
 * @apiVersion 1.0.0
 *
 * @apiUse msgGet
 *
 * @apiPermission isAuthenticated()
 * @apiUse authHeader
 * 
 */
//gets messages only addressed to the user-group of the current user
router.get('/mine', auth.isAuthenticated(), function (req, res, next) {
  var groups = req.user.groups;
  var messages = [];

  async.forEachOf(groups, function(item, key, callback){
    Message.find({to: item}, function(err, msgs) {
      if(err) { callback(err); }
      for(var i = 0; i < msgs.length; i++){
        var ok = true;
        for(var j = 0; j < messages.length; j++){
          if(messages[j].id === msgs[i].id){
            ok = false;
          }
        }
        if(ok){
          messages.push(msgs[i]);
        }
      }
      callback();
    })

  }, function(err){
    if (err) return next(err);
    res.json(messages);
  });
});

/**
 * @api {POST} /api/messages Creates a new message
 * @apiGroup Messages
 * @apiVersion 1.0.0
 *
 * @apiParam {String} from Name of sender, not necessarily the creator of the message
 * @apiParam {String} to Simple name of group to send to, will be parsed into group id if groupid parameter is not sent
 * @apiParam {String} [groupid] Explicit ID of group to send to
 * @apiParam {String} [date] Date message was sent. Will be set automatically to current date if none specified
 * @apiParam {String} subject Subject/Title of the message
 * @apiParam {String} message Text of the message
 *
 * @apiParamExample {json} Request Example
 * {
 * "from": "Michael",
 *  "to": "all",
 *  "date": "6/14/2015",
 *  "subject": "Hello",
 *  "message": "Hey guys!"
 * }
 *
 * @apiError (Error 404) {String} GroupNotFoundError The specified group was not found.
 * @apiErrorExample {json} No Group Found
 * {
 *   "message": "No group found",
 *   "status": 404,
 *   "title": "Group not found"
 * }
 * 
 * @apiUse  VerificationError
 * @apiUse authHeader
 * @apiPermission group canWrite(Msgs)
 */
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
        return;
      }
      else {
        Group.findOne({name: req.body.to}, '_id', function(err, group){
          if(err) return callback(err);
          if(!group) return callback({message: 'No group found', status: 404, title:'Group not found'});
          console.log(group);
          req.body.to = group.id;
          callback(err);
          return;
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
        return;
      });
    }

    ], function(err){
      console.log(err);
      if(err) return next(err);
      console.log('done');
      gcm.sendGCM(1);
      res.status(200).send();
  });
  
  
});