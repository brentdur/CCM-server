/*
  Location Controller
 */

var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Location = mongoose.model('Location');
var auth = require('../auth/auth.service');
var async = require('async');

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
        console.log('saved');
        if(err) return next(err);
      	res.status(200).end();
      });
})