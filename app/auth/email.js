'use strict';

var config = require('../../config/config');
// var sendgrid  = require('sendgrid')(config.sendgrid);

var mail = {
	domain: config.domain
};

// Spec:
// {
// to: array of to email addresses
// subject: message subject
// text: text form of message
// html: html form of message
// }

mail.send = function(obj){
	return;
	var to = obj.to;

	var email = new sendgrid.Email({
		from: 'noreply',
		subject: obj.subject,
		text: obj.text,
		html: obj.html
	});

	for(var i = 0; i < to.length; i++){
		email.addTo(to[i]);
	}

	sendgrid.send(email, function(err, json){
		if(err) {console.log(err);}
		console.log(json);
	})
}

mail.welcome = function(user, type, email){
	var text = '';
	var html = '';

	var obj = {
		to: [email],
		subject: 'Welcome',
		text: text,
		html: html
	}

	this.send(obj);
}
mail.sendConfirm = function(token, email){
	var obj = {
		to: [email],
		subject: 'Confirm your email',
		text: 'Please go to the following link to confirm your email ' + this.domain +'/receive/confirm?id=' + token,
		html: '<p>Please go to the following link to confirm your email <a href="' + this.domain +'/receive/confirm?id=' + token +'">confirm your email here</a></p>'
	}

	this.send(obj);
}

mail.sendReset = function(token, email){
	var obj = {
		to: [email],
		subject: 'Reset your password',
		text: 'Hello. If you asked for a password reset then please go to the following link to reset your password ' + this.domain +'/receive/reset?id=' + token,
		html: '<p>Hello,</p> Please go to the following link to reset your password <a href="' + this.domain +'/receive/reset?id=' + token +'">reset your password here</a></p> ' +
				'<p>Do not do this if you did not request a reset, just ignore this email</p>'
	}

	this.send(obj);
}


module.exports = mail;
