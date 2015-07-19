/*
	Main application file
 */

var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);

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
var app = express();

require('./config/express')(app, config);

app.listen(config.port);

app.use(session({
	secret: config.session,
	resave: true,
	saveUninitialized: true,
	store: new mongoStore({ mongooseConnection: mongoose.connection })
}));

console.log('Server started on port '+ config.port + ' in ' + config.env + ' mode');

