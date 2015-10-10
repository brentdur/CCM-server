/*
	Main application file
 */

var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  googleAuth = require('./app/google-auth');
  mongoose = require('mongoose');

// var mongoStore = require('connect-mongo')(session);

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});

if(config.seed) { require('./config/seed'); }

googleAuth.getSecrets(null, function(){
	var app = express();
	require('./config/express')(app, config);
	app.listen(config.port);
	console.log('Server started on port '+ config.port + ' in ' + config.env + ' mode');
});



