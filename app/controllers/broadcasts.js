/**
 * Conversations Controller
 */

 var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	auth = require('../auth/auth.service'),
	Conversation = mongoose.model('Conversation'),
	Message = mongoose.model('Message'),
	Topic = mongoose.model('Topic'),
	User = mongoose.model('User'),
	Broadcast = mongoose.model('Broadcast'),
	// http = require('https'),
	async = require('async'),
	uuid = require('node-uuid'),
	gcm = require('../gcm'),
	utils = require('../utils')
	// config = require('../../config/config')
	;


module.exports = function (app) {
  app.use('/api/broadcasts', router);
}


var errorForm = function(title, message, status) {
  err = {}
  err.title = title;
  err.message = message;
  err.status = status;
  return err;
}

/**
 * @api {get} /api/broadcasts Get all broadcasts
 * @apiGroup Broadcasts
 * @apiVersion 1.2.0
 *
 * @apiSuccess {String} _id Unique string for event
 * @apiSuccess {Group[]} recepients An array of groups that should receive the broadcast
 * @apiSuccess {String} title The title of the broadcast
 * @apiSuccess {String} message The text of the message to send
 * @apiSuccess {Boolean} isNotification Whether the broadcast should notify
 * @apiSuccess {String[]} syncs Enumerated of: "all", "events", "convos", "signups", "messages", "talks". What the gcm message syncs
 * @apiSuccess {Date} createdAt When the broadcast was sent
 * @apiSuccess {User} createdBy The user that sent the broadcast
 *
 * @apiSuccessExample {json} Response Example
 *   
 * 
 *
 * @apiPermission inGroup(admin)
 * @apiUse authHeader
 *
 */

router.get('/', auth.inGroup('admin'), function(req, res, next){
	Broadcast.find(function(err, bcs){
		if (err) return next(err);
		res.json(bcs);
	});
});


/**
 * @api {POST} /api/broadcasts/send Create new broadcast
 * @apiDescription Creates a new broadcast, which begins to spawn messages and send notifications for every user
 *@apiGroup Broadcasts
 *@apiVersion 1.2.0
 *
 * @apiParam {String} title The title of the broadcast
 * @apiParam {String} message The message text to send
 * @apiParam {Group[]} [recepients] An array of groups to send the broadcast to, or null if all groups should receive it
 * @apiParam {Boolean} [isNotification]=false Whether the broadcast is silent or not
 * @apiParam {String[]} [syncs] What the broadcast syncs, if anything. One of: 'all', 'events', 'conversations', 'signups', 'messages', or 'talks'
 * @apiParamExample {json} Request Example
 * {
 * "title": "new",
 * "message": "newnew",
 * "syncs": "all",
 * "syncs": "messages",
 * "recepients": "admin"
 * }
 *
 * @apiError (Error 403) {String} Required field missing Title and Message are required fields
 *
 * @apiErrorExample {json} Required field missing
 * {
 *   "Error" "Title and Message must be set"
 * }
 *
 *
 * 
 * @apiPermission group canWrite(Broadcasts)
 * @apiUse authHeader
 * 
 */

router.post('/send', auth.canWrite('Broadcasts'), function(req, res, next) {
	if (req.body.recepients && !(req.body.recepients instanceof Array)){
		req.body.recepients = [req.body.recepients];
	}
	var search = {
		'name': {$in: req.body.recepients}
	};
	var recepients = [];
	if (!req.body.recepients) {
		search = {};
	}
	var people = [];
	if(!req.body.title || !req.body.message) {
		return next(errorForm("Required field missing", "Title and Message must be set", 403));
	}
	async.waterfall([
		function(callback){
			Group.find(search).lean().populate('members').exec(function(err, groups){
				if (err) callback(err);
				groups.forEach(function(group) {
					group.members.forEach(function(member){
						people.push(member._id);
					})
					recepients.push(group._id);
				});

				callback(null);
			});
		},
		function(callback){
			var bcast = new Broadcast ({
			recepients: recepients,
			title: req.body.title,
			message: req.body.message,
			isNotification: req.body.isNotification,
			syncs: req.body.syncs,
			createdBy: req.user
			}).save(function(err){
				callback(err)
			});
		},
		function(callback){
			callback(null);
		}
		//TODO create and send singleton convo
	], function(err, results){
		if (err) return next(err);
		gcm.syncGCM(req.body.syncs, people, gcm.createNotification(req.body.title, req.body.message));
		res.status(200).send();
	});
	
});

/**
 * @api {POST} /api/broadcasts/sync Create new broadcast that only syncs
 *@apiGroup Broadcasts
 *@apiVersion 1.2.0
 *
 * @apiParam {String[]} syncs What the broadcast syncs, if anything. One of: 'all', 'events', 'convos', 'signups', 'messages', or 'talks'
 * @apiParam {Group[]} [recepients] An array of groups to send the broadcast to, or null if all groups should receive it
 * 
 * @apiParamExample {json} Request Example
 * {
 * "syncs": "all",
 * "recepients": "admin"
 * }
 * 
 * @apiError (Error 403) {String} RequiredFieldError Syncs must be set
 *
 * @apiErrorExample {json} Required Field Missing
 * {
 *   "Error" "Syncs must be set"
 * }
 *
 * 
 * @apiPermission group canWrite(Broadcasts)
 * @apiUse authHeader
 * 
 */

router.post('/sync', auth.canWrite('Broadcasts'), function(req, res, next) {
	if (req.body.recepients && !(req.body.recepients instanceof Array)){
		req.body.recepients = [req.body.recepients];
	}
	var search = {
		'name': {$in: req.body.recepients}
	};
	var recepients = [];
	if (!req.body.recepients) {
		search = {};
	}
	var people = [];
	if(!req.body.syncs) {
		return next(errorForm("Required field missing", "Syncs must be set", 403));
	}
	async.waterfall([
		function(callback){
			Group.find(search).populate('members').exec(function(err, groups){
				if (err) callback(err);
				groups.forEach(function(group) {
					group.members.forEach(function(member){
						people.push(member._id);
					});
					recepients.push(group._id);
				});
				callback(null);
			});
		},
		function(callback) {
			var bcast = new Broadcast ({
				recepients: recepients,
				syncs: req.body.syncs,
				createdBy: req.user
			}).save(function(err){
				callback(err);
			});
		}
		], function(err, results){
			if(err) return next(err);
			gcm.syncGCM(req.body.syncs, people);
			res.status(200).send();
		});
});


