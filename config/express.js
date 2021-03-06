/*
  Express application file
 */

var express = require('express');
var glob = require('glob');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var passport = require('passport');
var methodOverride = require('method-override');
var exphbs  = require('express-handlebars');
var session = require('express-session');
var mongoose = require('mongoose')
var mongoStore = require('connect-mongo')(session);

module.exports = function(app, config) {
  app.engine('handlebars', exphbs({
    layoutsDir: config.root + '/app/views/layouts/',
    defaultLayout: 'main',
    partialsDir: [config.root + '/app/views/partials/']
  }));
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'handlebars');

  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser(config.session));
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(session({
    secret: config.session,
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({ mongooseConnection: mongoose.connection })
  }));
  app.use(methodOverride());
  app.use(passport.initialize());
  app.use(passport.session());


  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  app.use('/api/docs', express.static(config.root + '/docs'));
  app.use('/auth', require(config.root + '/app/auth'));

  app.use(function (err, req, res, next){
    res.status(err.status || 500);
    res.json(err);
  });

  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
      });
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

};
