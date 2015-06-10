'use strict';

var uuid = require('node-uuid');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TokenSchema = new Schema({
  uuid: String,
  expireAt: {type: Date, expires:0},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  type: String
});

TokenSchema.methods.createToken = function(req, cb){
	var verify = this;
	var date = new Date();
	date.setUTCHours(date.getUTCHours() + req.hours);
	var token = uuid.v4();
	verify.set('uuid', token);
	verify.set('userId', req.user._id);
	verify.set('type', req.type);
	verify.set('expireAt', date.toString());
	verify.save(function(err){
		if(err) return cb(err);
		return cb(null, verify);
	});
};

TokenSchema.methods.expire = function(cb){
	this.set('uuid', '');
	this.save(function(err){
		if(err) return cb(err);
		return cb();
	});
};

module.exports = mongoose.model('Token', TokenSchema);