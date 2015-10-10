
var mongoose = require('mongoose'),
	Conversation = mongoose.model('Conversation'),
	Message = mongoose.model('Message'),
	Group = mongoose.model('Group'),
	Topic = mongoose.model('Topic'),
	async = require('async'),
	gcm = require('./gcm'),
	spawn = require('child_process').spawn
	uuid = require('node-uuid');

module.exports = {
	purge: function(rootPath){
		var minutes = 30, the_interval = minutes * 60 * 1000;
		setInterval(function() {
		  	console.log("I am doing my 1 minutes check");
			var deploySh = spawn('sh', [ 'update.sh' ], {
			  cwd: rootPath + '/scripts',
			  stdio: 'inherit'
			});
			deploySh.on('close', function (code) {
			  console.log('child process exited with code ' + code);
			  gcm.syncGCM(gcm.terms.events, null, null);
			});
		}, the_interval);
	},
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
				cb(err, results);
				return;
			});
		}
	},
	get :{
		ministerUsers: function(cb){
			Group.findOne({name: 'ministers'}).select('members').lean().exec(function(err, group){
				return cb(err, group.members);
			});
		}
	}
}