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


var router = express.Router();

module.exports = function(app) {
	app.use('/api/users', router);
	app.use('/auth', require('../auth'));
}

var validationError = function(res, err) {
  return res.status(422).send(err);
};

//new user
router.post('/', function(req, res, next){
	var newUser = new User(req.body);
	newUser.provider = 'local';
	newUser.role = 'user';

	newUser.save(function(err, user) {
	    if(err) return validationError(res, err);
	   	mail.welcome(user.name, user.email);
	    var token = jwt.sign({_id: user._id}, config.session, { expiresInMinutes: 60*5 });
	    res.json({token: token});
	  });
});

// dev use only
router.get('/', function(req, res, next){
	User.find({}, function(err, users){
		if(err){ return next(err); }
		res.json(users);
	});
});

//get me
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

router.put('/group', auth.isAuthenticated(), function(req, res, next){
	Group.findOne({name: req.body.group}, function(err, group){
		if(err) { return next(err); }
		if(!group) { return res.status(404).send(); }
		req.user.addGroup(group._id, function(err, number){
			if(err) {return next(err);}
			group.addUser(req.user._id, function(err, number){
				if(err) {return next(err);}
				res.json(number);
			})
		})
	})
});

router.put('/confirm', function(req, res, next){
	var token = req.body.token;

	Token.findOne({ uuid: token }).exec(function(err, token){
		if(err) return next(err);
		if(!token) return res.status(404).send('Invalid token');
		if(token.type != 'confirm') return res.status(404).send('Invalid token');
		User.findOneAndUpdate({ _id: token.userId}, { confirmed: true }, function(err, user){
			if(err){ return next(err); }
			token.expire(function(err){
				if(err){ return next(err); }
				//send email
				res.json(user);
			});
		});
	});
});

router.put('/reset', function(req, res, next){
	var token = req.body.token;
	var password = req.body.password;

	Token.findOne({ uuid: token }).exec(function(err, token){
		if(err) return next(err);
		if(!token) return res.status(404).send('Invalid token');
		if(token.type != 'reset') return res.status(404).send('Invalid token');
		User.findById(token.userId, function (err, user) {
			if(err){ return next(err); }
			token.expire(function(err){
				if(err){ return next(err); }
			});
		    user.password = password;
		    user.save(function(err) {
		      if (err) return validationError(res, err);
		      res.send(200);
		    });
		});
	});
});


router.put('/addToken', function(req, res, next){
	var query = User.findOne({email: req.body.email});
	  query.exec(function (err, user){
	    if (err) { return next(err); }
	    if (!user) { return next(new Error('Cannot find user')); }

	    req.user = user;
		var send = {
			hours: 0,
			type: req.body.type,
			user: req.user
		};
		var validation = new Token();


		if(send.type === 'reset' && send.user.confirmed === false){
			return next(new Error('Email not confirmed'));
		}
		if (send.type === 'confirm') {
			send.hours = 24;
		}
		else if (send.type === 'reset') {
			send.hours = 1;
		}
		else {
			return next(new Error('No type specified'));
		}

		validation.createToken(send, function(err, token){
			if(err) { return next(err); }
			//send email
			if(send.type === 'confirm'){
				mail.sendConfirm(token.uuid, req.body.email);
			}
			else if(send.type === 'reset'){
				mail.sendReset(token.uuid, req.body.email);
			}
			else {
				res.status(404).send("Type not found");
			}
			res.status(202).send('Email sent');
		});
	});
});

router.put('/pass', auth.isAuthenticated(), function(req, res, next) {
 	var userId = req.user._id;
	var oldPass = String(req.body.current);
	var newPass = String(req.body.password);

	User.findById(userId, function (err, user) {
	  if(user.authenticate(oldPass)) {
	    user.password = newPass;
	    user.save(function(err) {
	      if (err) return validationError(res, err);
	      res.send(200);
	    });
	  } else {
	    res.send(403);
	  }
	});
});


