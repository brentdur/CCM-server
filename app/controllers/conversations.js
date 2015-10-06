/**
 * Conversations Controller
 */
/**
 * @apiDefine convoGet
 * @apiSuccess {Boolean} alive Whether the conversation is still happening or has been deleted
 * @apiSuccess {Object} minister The minister group participating in the conversation
 * @apiSuccess {Boolean} minister.alive Whether the minister still considers the conversation to be alive
 * @apiSuccess {Boolean} minister.responded Whether the minister has read the last message sent by another party
 * @apiSuccess {Boolean} minister.isAnon Whether the minister is anonymous in this conversation (will be false for the most part)
 * @apiSuccess {String} minister.senderId The string identifier of the sender
 * @apiSuccess {Object[]} participant The participating (initiating) user of this conversation, or users involved in a broadcast
 * @apiSuccess {Boolean} participant.alive Whether the user still considers the conversation to be alive
 * @apiSuccess {Boolean} participant.responded Whether the user has read the last message sent by another party
 * @apiSuccess {Boolean} participant.isAnon Whether the user is anonymous in this conversation
 * @apiSuccess {String} participant.senderId The string identifier of the sender
 * @apiSuccess {User} participant.user The user id associated with this participant
 * @apiSuccess {Boolean} broadcast Whether this conversation is a broadcast to all users, sets seem default things differently
 * @apiSuccess {Topic} topic The topic associated with this conversation
 * @apiSuccess {Boolean} singleton Whether this conversation is a single message or a whole conversation (one way vs two way, designed to enable older -> newer communication)
 * @apiSuccess {Message[]} messages The messages connected with this conversation
 *
 * @apiSuccessExample {json} Response Example
 * [{
 * 	"_id": "55c5527f8efd394f3634c762",
 * 	"alive": true,
 * 	"minister": {
 * 		"alive": true,
 * 		"responded": false,
 * 		"isAnon": false,
 * 		"senderId": "92920192"
 * 	 	},
 * 	"participant": {
 * 		"alive": false,
 * 		"responded": true,
 * 		"isAnon": true,
 * 		"senderId": "adfa313g32g231"
 * 		"user":"55c5527f8efd394f3634c762"
 * 		},
 * 	"topic":"55c5527f8efd394f3634c762",
 * 	singleton: false,
 * 	messages:[...]
 * },
 * {...}.
 * ]
*/

var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	auth = require('../auth/auth.service'),
	Conversation = mongoose.model('Conversation'),
	Message = mongoose.model('Message'),
	Topic = mongoose.model('Topic'),
	User = mongoose.model('User'),
	// http = require('https'),
	async = require('async'),
	uuid = require('node-uuid'),
	gcm = require('../gcm')
	// config = require('../../config/config')
	;

module.exports = function (app) {
	app.use('/api/conversations', router);
}

/**
 * @api {get} /api/conversations Get all conversations
 * @apiGroup Conversations
 * @apiVersion 1.2.0
 *
 * @apiUse convoGet
 * 
 * @apiPermission inGroup(admin)
 * @apiUse authHeader
 */
router.get('/', auth.inGroup('admin'), function(req, res, next){
	Conversation.find().populate('messages', 'message senderId').exec(function(err, conversations){
		if(err) return next(err);
		res.json(conversations);
	});
});

/**
 * @api {get} /api/conversations/minister Get all conversations that are still alive
 * @apiGroup Conversations
 * @apiVersion 1.2.0
 *
 * @apiUse convoGet
 *
 * @apiPermission inGroup(ministers)
 * @apiUse authHeader
 */
router.get('/minister', auth.inGroup('ministers'), function(req, res, next){
	Conversation.find({alive:true, "minister.alive":true}).populate('messages', 'message senderId').exec(function(err, conversations){
		if(err) return next(err);
		res.json(conversations);
	});
});


/**
 * @api {get} /api/conversations/mine Get all conversations for a user that are still alive
 * @apiGroup Conversations
 * @apiVersion 1.2.0
 *
 * @apiUse convoGet
 *
 * @apiPermission isAuthenticated()
 * @apiUse authHeader
 */
router.get('/mine', auth.isAuthenticated(), function(req, res, next){
	console.log(req.user.convos);
	Conversation
	.find({'_id': {$in:req.user.convos}})
	.find({'alive':true})
	.find({'participant.alive':true})
	.populate('messages', 'message senderId')
	.exec(function(err, convos){
		res.json(convos);
	});
});


/**
 * @api {post} /api/conversations Creates a new conversation
 * @apiGroup Conversations
 * @apiVersion 1.2.0
 *
 * @apiParam {Topic} topic The id of the topic for the conversation
 * @apiParam {String} subject The subject of the conversation
 * @apiParam {String} message The original message text of the conversation
 *
 * @apiPermission group canWrite(Conversations)
 * @apiUse authHeader
 */
router.post('/', auth.canWrite('Conversations'), function(req, res,next){
	var conversation = new Conversation();
	var participant = {};
	participant.user = req.user;
	participant.senderId = uuid.v4();
	participant.alive = true;
	conversation.minister.senderId = uuid.v4();
	conversation.topic = req.body.topic;
	conversation.subject = req.body.subject;
	conversation.messages = [];

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
			var newMessage = new Message({
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
		gcm.sendGCM(7);
		res.status(200).send();
	});
});

/**
 * @api {put} /api/conversations/send Adds a new message to an existing conversation
 * @apiGroup Conversations
 * @apiVersion 1.2.0
 *
 * @apiParam {String} message The message to add
 * @apiParam {Conversation} conversation The conversation id to add the message to
 *
 * @apiPermission isAuthenticated()
 * @apiUse authHeader
 */
router.put('/send', auth.isAuthenticated(), function(req, res, next){
	async.waterfall([
		function(callback){
			Conversation.findById(req.body.conversation, function(err, convo){
				if (!convo){
					err = "403";
				}
				callback(err, convo);
			});
		},
		function(convo, callback){
			if (!convo.alive){
				callback("Conversation is dead");
				return;
			}
			else if (convo.singleton){
				callback("Conversation is a singleton");
				return;
			}
			convo.minister.alive = true;
			convo.participant.alive = true;
			console.log(convo.participant.user);
			console.log(req.user._id);
			if (convo.participant.user.toString() === req.user._id.toString()){
				convo.minister.responded = false;
				convo.participant.responded = true;
				callback(null, convo, convo.participant.senderId);
			}
			else {
				convo.minister.responded = true;
				convo.participant.responded = false;
				callback(null, convo, convo.minister.senderId);
			}
		},
		function(convo, senderId, callback){
			var newMessage = new Message({
			subject: convo.subject,
			message: req.body.message,
			topic: convo.topic,
			conversation: convo,
			senderId: senderId,
			date: Date()
			}).save(function(err, message){
				callback(err, convo, message);
				return;
			});
		},
		function(convo, message, callback){
			convo.addMessage(message._id, function(err){
				callback(err);
			});
		}
	],
	function(err, results){
		if(err) return next(err);
		gcm.sendGCM(7);
		res.status(200).send();
	});
	
});


/**
 * @api {put} /api/conversations/kill Marks a conversation as dead for a person and determines its state
 * @apiGroup Conversations
 * @apiVersion 1.2.0
 *
 * @apiParam {Conversation} conversation The conversation id that the user is killing
 *
 * @apiPermission isAuthenticated()
 * @apiUse authHeader
 */
 router.put('/kill', auth.isAuthenticated(), function(req, res, next) {
 	async.waterfall([
 		function(callback){
 			Conversation.findById(req.body.conversation, function(err, convo){
 				if(!convo) {
 					err = 403;
 				}
 				callback(err, convo);
 			});
 		},
 		function(convo, callback){
 			if (req.user._id.toString() === convo.participant.user.toString()){
 				convo.killParticipant(function(err, result){
 					callback(err, result);
 				});
 			}
 			else {
 				convo.killMinister(function(err, result){
 					callback(err, result);
 				});
 			}
 		},
 		function(convo, callback){
 			console.log(convo);
 			if(!convo.participant.alive && !convo.minister.alive) {
 				convo.killConvo(function(err, result){
 					callback(err, result);
 				});
 			}
 			else {
 				callback(null);
 			}
 		}
 		],
 		function(err, results){
 			if (err) return next(err);
 			gcm.sendGCM(7);
 			res.status(200).send();
 		});
 });