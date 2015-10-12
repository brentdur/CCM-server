/*
  Messages Controller
 */
/**
 * @apiDefine msgGet12
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
 * @apiSuccess {Conversation} conversation Conversation that this message is connected to 
 * @apiSuccess {String} senderId The sender of this message, identified by unique id
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
  Conversation = mongoose.model('Conversation'),
  uuid = require('node-uuid'),
  utils = require('../utils'),
  Message = mongoose.model('Message'),
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
 * @apiVersion 1.2.0
 *
 * @apiUse msgGet12
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
 * @apiVersion 1.2.0
 *
 * @apiUse msgGet12
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
        messages[i].from = 'Anonymous';
        messages[i].simpleFrom = 'Anonymous';
      }
    }
    res.json(messages);
  });
});

/**
 * @api {POST} /api/messages Creates a new singleton-convo, deprecated
 * @apiGroup Messages
 * @apiVersion 1.2.0
 *
 * @apiParam {String} subject Subject/Title of the convo
 * @apiParam {String} message Text of the convo
 * @apiParam {Topic} topic id of the topic
 *
 * @apiParamExample {json} Request Example
 * {
 *  "subject": "Question!!!",
 *  "message": "Me have question",
 *  "topic": "55c55101cc899eb235a309fd"
 * }
 * 
 * @apiUse  VerificationError
 * @apiUse authHeader
 * @apiPermission group canWrite(Msgs)
 */
//checks if logged-in user has write permission, then creates the message
//'to' group is always set to ministers
router.post('/', auth.canWrite('Conversations'), function(req, res,next){
  var conversation = new Conversation();
  var participant = {};
  participant.user = req.user;
  participant.senderId = uuid.v4();
  participant.alive = false;

  conversation.minister.senderId = uuid.v4();
  conversation.topic = req.body.topic;
  conversation.subject = req.body.subject;
  conversation.messages = [];
  conversation.singleton = true;

  async.waterfall([
    function(callback){
      Topic.findById(req.body.topic, function(err, topic){
        if(!topic) {
          callback("No Topic");
          return;
        }
        callback(err, topic);
        return;
      });
    },
    function(topic, callback){
      Group.findOne({name:"ministers"}, function(err, group){
        if(err) callback(err);
        if(!group) callback("No Group");
        callback(null, topic, group);
      });
    },
    function(topic, group, callback){
      var newMessage = new Message({
        from: req.user,
        to: group,
        simpleTo: group.name,
        simpleFrom: req.user.name,
        subject: req.body.subject,
        message: req.body.message,
        topic: req.body.topic,
        conversation: conversation,
        senderId: participant.senderId,
        date: Date()
      }).save(function(err, message){
        callback(err, message, topic);
        return;
      });
    },
    function(message, topic, callback){
      conversation.messages.push(message._id);
      participant.isAnon = topic.isAnon;
      conversation.participant = participant;
      conversation.save(function(err, convo){
        callback(err, convo);
        return;
      });
    },
    function(convo, callback){
      participant.user.addConvo(convo._id, function(err){
        callback(err);
        return;
      });
    }
  ],
  function(err, results){
    if(err) return next(err);
    utils.get.ministerUsers(function(err, ministers){
      gcm.syncGCM(gcm.terms.conversations, ministers, gcm.createNotification('New Message', 'New message from ' + req.user.name));      
    });
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
    gcm.syncGCM(gcm.terms.messages, null, null);
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
  Message.findOneAndRemove({'id':req.item}, function(err){
    if(err) return next(err);
    gcm.syncGCM(gcm.terms.messages, null, null);
    res.status(200).send();
  });
});