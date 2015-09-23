/**
 * Conversations Controller
 */
/**
 * @apiDefine convoGet
 * @apiSuccess {Boolean} alive Whether the conversation is still happening or has been deleted
 * @apiSuccess {Object} minister The minister group participating in the conversation
 * @apiSuccess {Boolean} minister.alive Whether the minister still considers the conversation to be alive
 * @apiSuccess {Boolean} minister.readLast Whether the minister has read the last message sent by another party
 * @apiSuccess {Boolean} minister.isAnon Whether the minister is anonymous in this conversation (will be false for the most part)
 * @apiSuccess {String} minister.senderId The string identifier of the sender
 * @apiSuccess {Object} participant The participating (initiating) user of this conversation
 * @apiSuccess {Boolean} participant.alive Whether the user still considers the conversation to be alive
 * @apiSuccess {Boolean} participant.readLast Whether the user has read the last message sent by another party
 * @apiSuccess {Boolean} participant.isAnon Whether the user is anonymous in this conversation
 * @apiSuccess {String} participant.senderId The string identifier of the sender
 * @apiSuccess {User} participant.user The user id associated with this participant
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
 * 		"readLast": false,
 * 		"isAnon": false,
 * 		"senderId": "92920192"
 * 	 	},
 * 	"participant": {
 * 		"alive": false,
 * 		"readLast": true,
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
	Conversation.find(function(err, conversations){
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
	Conversation.find({alive:true, "minister.alive":true}, function(err, conversations){
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
	Conversation.find({alive: true, "participant.alive": true, "participant.user": req.user._id}, function(err, conversations){
		if(err) return next(err);
		res.json(conversations);
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
	conversation.participant.user = req.user;
	conversation.participant.senderId = uuid.v4();
	conversation.minister.senderId = uuid.v4();
	conversation.topic = req.body.topic;
	conversation.subject = req.body.subject;
	conversation.messages = [];
	if(req.body.singleton && req.body.singleton == true){
		conversation.singleton = true;
	}

	async.waterfall([
		function(callback){
			Topic.findById(req.body.topic, function(err, topic){
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
			senderId: conversation.participant.senderId,
			date: Date()
			}).save(function(err, message){
				callback(err, message, topic);
				return;
			});
		},
		function(message, topic, callback){
			console.log(message._id);
			conversation.messages.push(message._id);
			conversation.participant.isAnon = topic.isAnon;
			conversation.save(function(err){
				callback(err);
				return;
			});
		}
	],
	function(err, results){
		if(err) return next(err);
		res.status(200).send();
	});
});

/**
 * @api {put} /api/conversations/send Adds a new message to an existing conversation
 * @apiGroup Conversations
 * @apiVersion 1.2.0
 *
 * @apiPermission isAuthenticated()
 * @apiUse authHeader
 */
//will make the conversation alive again for all parties
//will set readLast to false for all parties except the sender
