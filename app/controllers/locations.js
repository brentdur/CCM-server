/*
  Location Controller
 */

var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Location = mongoose.model('Location');
var auth = require('../auth/auth.service');
var async = require('async');
var gcm = require('../gcm');

module.exports = function (app) {
  app.use('/api/locations', router);
}

//get all locations
router.get('/', auth.isAuthenticated(), function(req, res, next){
	Location.find({}, function(err, locations){
		res.json(locations);
	});
})

//creates new location
router.post('/', auth.inGroup('admin'), function(req, res, next){
	var location = new Location(req.body).save(function(err) {
        if(err) return next(err);
        gcm.sendGCM(4);
      	res.status(200).end();
      });
})