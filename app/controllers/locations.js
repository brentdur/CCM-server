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

/**
 * @api {GET} /api/locations Get all locations
 * @apiGroup Locations
 * @apiVersion 1.0.0
 *
 *@apiSuccess {String} _id Unique string for location
 *@apiSuccess {String} name Simple name of location
 *@apiSuccess {String} address Full address
 *@apiSuccess {Number} lat Latitude of location
 *@apiSuccess {Number} lng Longitude of location
 *@apiSuccess {Number} version Version identifier of location, updates if location is changed.
 *
 * 
 * @apiSuccessExample {json} Response Example
 * [
 *    {
 *     "_id": "55be42eda4cdbe7912fadc42",
 *     "name": "Redeemer UWS",
 *     "address": "W83 Ministry Center, 150 W. 83rd St., New York, New York",
 *     "lat": 40.786122,
 *     "lng": -73.975738,
 *     "__v": 0,
 *     "version": 0
 *   },
 *   {...}
 * ]
 *
 * @apiPermission isAuthenticated()
 * @apiUse authHeader
 */
//get all locations
router.get('/', auth.isAuthenticated(), function(req, res, next){
	Location.find({}, function(err, locations){
		res.json(locations);
	});
})

/**
 * @api {POST} /api/locations Create a new location
 * @apiGroup Locations
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name Name of location
 * @apiParam {Number} lat Latitude of location. Required as location doesn't current support geocoding
 * @apiParam {Number} lng Longitude of location. Required as location doesn't current support geocoding
 * @apiParam {String} address Currently just used as an identifier, may be used for geocoding later
 *
 * @apiParamExample {json} Request Example
 * {
 *   "name": "Redeemer",
 *   "lat": "72.5456456",
 *   "lng": "71.564456",
 *   "address": "West 83rd St, NY, NY, 10003"
 * }
 *
 * @apiUse  VerificationError
 * @apiUse authHeader
 * @apiPermission inGroup(admin)
 */
//creates new location
router.post('/', auth.inGroup('admin'), function(req, res, next){
	var location = new Location(req.body).save(function(err) {
        if(err) return next(err);
        gcm.syncGCM(gcm.terms.locations, null, null);
      	res.status(200).end();
      });
})