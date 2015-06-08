

var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose');

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

console.log('Server started on port '+ config.port + ' in ' + config.env + ' mode');

