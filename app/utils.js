
var mongoose = require('mongoose'),
	Conversation = mongoose.model('Conversation'),
	Message = mongoose.model('Message'),
	Topic = mongoose.model('Topic'),
	async = require('async'),
	uuid = require('node-uuid');

module.exports = {
	create: {
		conversation: function (topic, subject, message, user, singleton, cb) {
			var conversation = new Conversation();
			var participant = {};
			participant.user = user;
			participant.senderId = uuid.v4();
			participant.alive = true;
			conversation.minister.senderId = uuid.v4();
			conversation.topic = topic;
			conversation.subject = subject;
			conversation.messages = [];

			async.waterfall([
				function(callback){
					Topic.findById(topic, function(err, topic){
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
					subject: subject,
					message: message,
					topic: topic,
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
						callback(err, convo);
						return;
					});
				}
			],
			function(err, results){
				if(err) return next(err);
				cb(results);
				return;
			});
		}
	}
}