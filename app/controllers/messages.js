/*
  Messages Controller
 */
/**
 * @apiDefine msgGet
 * @apiSuccess {String} _id Unique string for message
 * @apiSuccess {User} from User that sent the message
 * @apiSuccess {Group} to Recipient group of the message, will always be ministers
 * @apiSuccess {String} simpleTo Text name of the group for display purposes, will always be ministers
 * @apiSuccess {String} simpleFrom Text name of the sender of the message
 * @apiSuccess {String} subject Subject of the message, used like a title
 * @apiSuccess {Topic} topic topic of the message
 * @apiSuccess {String} date Formated date that the message was sent
 * @apiSuccess {String} message Actualy message text
 * @apiSuccess {Number} version Version identifier of the message
 * 
 * @apiSuccessExample {json} Response Example
 * [
 * {
 *     "_id": "55c5527f8efd394f3634c762",
 *     "to": "55c54d8c374fcd3b332085d6",
 *     "simpleTo": "minister",
 *     "simpleFrom": "theuser",
 *     "subject": "Hello",
 *     "topic": "55c5527f8efd394f3634c76a",
 *     "from": "55c54d8c374fcd3b332085d1",
 *     "date": "2015-09-09T04:00:00.000Z",
 *     "message": "Hey guys, welcome to RUF",
 *     "version": 0
 *   },
 *   {...},
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
 * @apiDescription Gets messages addressed to the groups of the current user, will hide the from field if topic is anonymous
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
    Message.find().lean().populate('topic').exec({to: item}, function(err, msgs) {
      if(err) { callback(err); }
      for(var i = 0; i < msgs.length; i++){
        var ok = true;
        for(var j = 0; j < messages.length; j++){
          if(messages[j]._id === msgs[i]._id){
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
    for (var i = 0; i < messages.length; i++){
      if(messages[i].topic.isAnon){
        messages[i].from = '';
        messages[i].simpleFrom = '';
      }
    }
    res.json(messages);
  });
});

/**
 * @api {POST} /api/messages Creates a new message for the 'ministers' group
 * @apiGroup Messages
 * @apiVersion 1.0.0
 *
 * @apiParam {String} subject Subject/Title of the message
 * @apiParam {String} message Text of the message
 * @apiParam {Topic} topic id of the topic
 *
 * @apiParamExample {json} Request Example
 * {
 *  "subject": "Question!!!",
 *  "message": "Me have question",
 *  "topic": "55c55101cc899eb235a309fd"
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
//'to' group is always set to ministers
router.post('/', auth.canWrite('Msgs'), function(req, res, next){
  req.body.from = req.user._id;
  req.body.simpleFrom = req.user.name;
  console.log(req.body.to);
  async.waterfall([
    function(callback){
        Group.findOne({name: 'ministers'}, '_id name', function(err, group){
          if(err) return callback(err);
          if(!group) return callback({message: 'No group found', status: 404, title:'Group not found'});
          console.log(group);
          req.body.to = group._id;
          req.body.simpleTo = group.name;
          callback(err);
          return;
        });
    },
    function(callback){
      req.body.date = Date();
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

/**
 * @api {DELETE} /api/messages Delete message
 * @apiGroup  Messages
 * @apiVersion 1.0.0
 *
 * @apiParam {String} message id of the message to be deleted
 * @apiParamExample {query} Request Example
 * http://ccm.brentondurkee.com/api/messages?message="h5kjjf9jkjfklqj3j;qkljfklfnkla"
 *
 * @apiPermission inGroup(ministers)
 * @apiUse authHeader
 */

router.delete('/', auth.inGroup('ministers'), function(req, res,next){
  var msg = req.query.message;
  Message.findById(msg).remove(function(err, data){
    if(err) return next(err);
    console.log(data.result);
    gcm.sendGCM(1);
    res.status(200).send();
  });
});

/**
 * @api {DELETE} /api/messages/delete Delete message for admin
 * @apiGroup Messages
 * @apiVersion 1.1.0
 *
 * @apiParam {String} item id of the message item to be deleted
 * @apiParamExample {json} Request Example
 * {
 *   "item":"555kljdfkk4l2eer"
 * }
 *
 * @apiPermission inGroup(admin)
 * @apiUse authHeader
 */
router.delete('/delete', auth.inGroup('admin'), function(req, res, next){
  Message.findOneAndRemove({'_id':req.body.item}, function(err){
    if(err) return next(err);
    gcm.sendGCM(1);
    res.status(200).send();
  });
});