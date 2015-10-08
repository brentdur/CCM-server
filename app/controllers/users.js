/*
  Users Controller
 */

'use strict';

var mongoose = require('mongoose');
var express = require('express');
var config=require('../../config/config');
var auth = require('../auth/auth.service');
var User = mongoose.model('User');
var Group = mongoose.model('Group');
var Token = mongoose.model('Token');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var mail = require('../auth/email');
var async = require('async');


var router = express.Router();

module.exports = function(app) {
	app.use('/api/users', router);
	app.use('/auth', require('../auth'));
}

var validationError = function(res, err) {
  return res.status(422).send(err);
};

//new user
/**
 *@api {POST} /api/users Create a new user
 *@apiGroup Users
 *@apiVersion 1.0.0
 *
 * @apiParam {String} name The new users full name
 * @apiParam {String} email The new user's email
 * @apiParam {String} password The new user's login password
 *
 * @apiParamExample {json} Request Example
 * {
	 * "name": "brenton",
	 * "email": "brentdur@gmail.com",
	 * "password": "123"
 * }
 * 
 * @apiError (Error 403) {String} ValidationError Required fields were not set or cast to date failed
 * @apiErrorExample {json} Validation Error
 *{
 *   "Error": {
 *     "message": "Event validation failed",
 *     "name": "ValidationError",
 *     "errors": {
 *       "name": {
 *         "properties": {
 *           "type": "required",
 *           "message": "Path `{PATH}` is required.",
 *           "path": "name"
 *         },
 *         "message": "Path `name` is required.",
 *         "name": "ValidatorError",
 *         "kind": "required",
 *         "path": "name"
 *       }
 *     }
 *   }
 * }
 *
 * 
 */
router.post('/', function(req, res, next){
	var newUser = new User(req.body);
	newUser.provider = 'local';
	newUser.role = 'user';

	newUser.save(function(err, user) {
	    if(err) return validationError(res, err);
	   	mail.welcome(user.name, user.email);
	    var token = jwt.sign({_id: user._id}, config.session, { expiresInMinutes: 60*5 });

      async.waterfall([
        function(callback){
          Group.findOne({name: 'users'}, function(err, group){
            if(err) { 
              callback(err);
              return;
            }
            if(!group) {
              callback("no group");
              return;
            };
            callback(null, group);
          });
        },
        function(group, callback){
          console.log(group);
          console.log(user);
          user.addGroup(group._id, function(err, number){
            if(err) {return next(err);}
            group.addUser(user._id, function(err, num ){
              if(err) callback(err);
              console.log('5');
              callback(null);
            });
        });
        }
      ], 
      function(err, results){
        if (err) { 
          if(err !== 'no group'){
            return next(err); 
          }
        }
        res.json({token: token});
      });
	  });
});

// dev use only
/**
 * @api {GET} /api/users Get all users
 * @apiGroup Users
 * @apiVersion 1.2.0
 *
 * @apiSuccess {String} _id Unique identifier for the object
 * @apiSuccess {String} provider The authentication provider, usually local
 * @apiSuccess {String} name The name of the user
 * @apiSuccess {String} email The user's email
 * @apiSuccess {String} hashedPassword The encrypted version of the user's password
 * @apiSuccess {String} gcm The gcm token for notification access
 * @apiSuccess {String} salt The encryption salt for the user
 * @apiSuccess {String[]} groups An array of group ids that the user is a member of
 * @apiSuccess {Conversation[]} convos An array of conversations that the user has participated in
 * @apiSuccess {String} clientType The client that the user is using
 * @apiSuccess {String} clientVersion The version identifier of the client
 * @apiSuccess {Boolean} opt [Unused] Whether the user has opted in for email delivery or not
 * @apiSuccess {Boolean} confirmed [Unused] Whether the user has confirmed their email address
 * @apiSuccess {String} role [Unusued] The user's specified role. Was deprecated in favor of a group-based system.
 *
 * @apiSuccessExample {json} Response Example
 * [
  {
    "_id": "55e4b8ae1959b17a0777a816",
    "provider": "local",
    "name": "test",
    "email": "test@brentondurkee.com",
    "hashedPassword": "7/YjGYRO8BZAqmztaLmjww==",
    "gcm": "lkdjafkljdf",
    "salt": "s/u",
    "__v": 4,
    "groups": [
      "55de4d373596ddbf6c25e932"
    ],
    "opt": true,
    "confirmed": false,
    "role": "user"
  },
  {...} 
  ]
 *
 * @apiPermission inGroup(admin)
 * @apiUse authHeader
 */
router.get('/', auth.inGroup('admin'), function(req, res, next){
	User.find({}, function(err, users){
		if(err){ return next(err); }
		res.json(users);
	});
});

//adds the gcm key to the user, to allow gcm-sync messages to be sent
/**
 * @api {POST} /api/users/gcm Adds a gcm token to the user
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiParam {String} gcm The gcm token to add
 *
 * @apiParamExample {json} Request Example
 * {
 * 	"gcm": "d39wkskf93fkdkjf9e"
 * }
 *
 * @apiPermission isAuthenticated
 * @apiUse authHeader
 */
router.post('/gcm', auth.isAuthenticated(), function(req, res, next){
	User.findById(req.user._id, function(err, user) {
		if(err){ return next(err); }
		user.gcm=req.body.gcm;
		user.save(function(err, user){
			if(err){ return next(err); }
			res.status(200).send();
		});
	});
});

//get me
/**
 * @api {GET} /api/users/me Get information about the current user
 * @apiGroup Users
 * @apiVersion 1.2.0
 *
 * @apiSuccess {String} _id Unique identifier for the object
 * @apiSuccess {String} provider The authentication provider, usually local
 * @apiSuccess {String} name The name of the user
 * @apiSuccess {String} email The user's email
 * @apiSuccess {String} gcm The gcm token for notification access
 * @apiSuccess {Group[]} groups An array of populated groups that the user is a member of 
 * @apiSuccess {Conversation[]} convos An array of conversations that the user has participated in
 * @apiSuccess {String} clientType The client that the user is using
 * @apiSuccess {String} clientVersion The version identifier of the client
 * @apiSuccess {Boolean} opt [Unused] Whether the user has opted in for email delivery or not
 * @apiSuccess {Boolean} confirmed [Unused] Whether the user has confirmed their email address
 * @apiSuccess {String} role [Unusued] The user's specified role. Was deprecated in favor of a group-based system.
 *
 * @apiSuccessExample {json} Response Example
 * [
  {
    "_id": "55e4b8ae1959b17a0777a816",
    "provider": "local",
    "name": "test",
    "email": "test@brentondurkee.com",
    "gcm": "lkdjafkljdf",
    "__v": 4,
    "groups": [
      {...}
    ],
    "opt": true,
    "confirmed": false,
    "role": "user"
  },
  {...} 
  ]
 *
 * @apiPermission isAuthenticated
 * @apiUse authHeader
 */
router.get('/me', auth.isAuthenticated(), function(req, res, next){
	var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword')
  .populate('groups')
  .exec(function(err, user) { 
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
});


/**
 * @api {PUT} /api/users/group Adds a user to a group
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiParam {String} group The name of the group to add the user to
 * @apiParam {String} user The id of the user to add to the group
 *
 * @apiParamExample {json} Request Example
 * {
 * 	"group":"admin",
 * 	"user":"55e4b8ae1959b17a0777a816"
 * }
 *
 * @apiError (Error 404) {String} GroupNotFoundError The specified group was not found.
 * @apiError (Error 404) {String} UserNotFoundError The specified user was not found.
 * 
 * @apiUse authHeader
 * @apiPermission inGroup(admin)
 */
router.put('/group', auth.inGroup('admin'), function(req, res, next){
	async.waterfall([
      function(callback){
	    Group.findOne({name: req.body.group}, function(err, group){
			if(err) { callback(err);}
			if(!group) { return res.status(404).send(); }
			callback(null, group);
		});
      },
      function(group, callback){
	    User.findById(req.body.user, function(err, user){
	    	if(err) {callback(err);}
	    	if(!user) {return res.status(404).send();}
	    	callback(null, user, group);
      	});
      },
      function(user, group, callback){
        for (var i = 0; i < user.groups.length; i++){
          if(user.groups[i].toString() === group._id.toString()){
            callback('Already in Group');
            return;
          }
        }
      	user.addGroup(group._id, function(err, number){
      		if(err) {return next(err);}
      		console.log('4');
      		group.addUser(user._id, function(err, num ){
      			if(err) callback(err);
      			console.log('5');
      			callback(null);
      		});
	    });
      }
    ], 
    function(err, results){
      if (err) { return next(err); }
      res.status(200).send();
    });
});

// router.put('/confirm', function(req, res, next){
// 	var token = req.body.token;

// 	Token.findOne({ uuid: token }).exec(function(err, token){
// 		if(err) return next(err);
// 		if(!token) return res.status(404).send('Invalid token');
// 		if(token.type != 'confirm') return res.status(404).send('Invalid token');
// 		User.findOneAndUpdate({ _id: token.userId}, { confirmed: true }, function(err, user){
// 			if(err){ return next(err); }
// 			token.expire(function(err){
// 				if(err){ return next(err); }
// 				//send email
// 				res.json(user);
// 			});
// 		});
// 	});
// });

// router.put('/reset', function(req, res, next){
// 	var token = req.body.token;
// 	var password = req.body.password;

// 	Token.findOne({ uuid: token }).exec(function(err, token){
// 		if(err) return next(err);
// 		if(!token) return res.status(404).send('Invalid token');
// 		if(token.type != 'reset') return res.status(404).send('Invalid token');
// 		User.findById(token.userId, function (err, user) {
// 			if(err){ return next(err); }
// 			token.expire(function(err){
// 				if(err){ return next(err); }
// 			});
// 		    user.password = password;
// 		    user.save(function(err) {
// 		      if (err) return validationError(res, err);
// 		      res.send(200);
// 		    });
// 		});
// 	});
// });


// router.put('/addToken', function(req, res, next){
// 	var query = User.findOne({email: req.body.email});
// 	  query.exec(function (err, user){
// 	    if (err) { return next(err); }
// 	    if (!user) { return next(new Error('Cannot find user')); }

// 	    req.user = user;
// 		var send = {
// 			hours: 0,
// 			type: req.body.type,
// 			user: req.user
// 		};
// 		var validation = new Token();


// 		if(send.type === 'reset' && send.user.confirmed === false){
// 			return next(new Error('Email not confirmed'));
// 		}
// 		if (send.type === 'confirm') {
// 			send.hours = 24;
// 		}
// 		else if (send.type === 'reset') {
// 			send.hours = 1;
// 		}
// 		else {
// 			return next(new Error('No type specified'));
// 		}

// 		validation.createToken(send, function(err, token){
// 			if(err) { return next(err); }
// 			//send email
// 			if(send.type === 'confirm'){
// 				mail.sendConfirm(token.uuid, req.body.email);
// 			}
// 			else if(send.type === 'reset'){
// 				mail.sendReset(token.uuid, req.body.email);
// 			}
// 			else {
// 				res.status(404).send("Type not found");
// 			}
// 			res.status(202).send('Email sent');
// 		});
// 	});
// });

// router.put('/pass', auth.isAuthenticated(), function(req, res, next) {
//  	var userId = req.user._id;
// 	var oldPass = String(req.body.current);
// 	var newPass = String(req.body.password);

// 	User.findById(userId, function (err, user) {
// 	  if(user.authenticate(oldPass)) {
// 	    user.password = newPass;
// 	    user.save(function(err) {
// 	      if (err) return validationError(res, err);
// 	      res.send(200);
// 	    });
// 	  } else {
// 	    res.send(403);
// 	  }
// 	});
// });


