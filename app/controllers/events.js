/**
 *   Event Controller
 *
 * @apiDefine authHeader
 * @apiHeader {String} Authorization Authorization Key Header needed for almost all calls.
 * @apiHeaderExample Authorization Example
 *       {
 *         "Authorization": "Bearer {your key goes here}"
 *       }
 */

/**
 * @apiDefine  VerificationError
 * @apiError (Error 500) {String} ValidationError Required fields were not set
 * @apiErrorExample {json} ValidationError 
 * {
 *   "message": "Event validation failed",
 *   "name": "ValidationError",
 *   "errors": {...}
 * }
 */

var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Event = mongoose.model('Event'),
  Location = mongoose.model('Location');
var auth = require('../auth/auth.service');
var http = require('https');
var async = require('async');
var gcm = require('../gcm');
var config = require('../../config/config');

module.exports = function (app) {
  app.use('/api/events', router);
}

var errorForm = function(title, message, status) {
  err = {}
  err.title = title;
  err.message = message;
  err.status = status;
  return err;
}


/**
 * @api {get} /api/events Get all events
 * @apiGroup Events
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} _id Unique string for event
 * @apiSuccess {String} title The simple name for this event.
 * @apiSuccess {String} location The simple name of the venue.
 * @apiSuccess {String} date Date of this event in standard format.
 * @apiSuccess {String} description Full description of this event.
 * @apiSuccess {Number} lat Latitude of venue.
 * @apiSuccess {Number} lng Longitude of venue.
 * @apiSuccess {Signup} [relatedSignup] Signup related to this event
 * @apiSuccess {Number} version Version of event, starting at 0.
 *
 * @apiSuccessExample {json} Response Example
 * [
   * {
   *  "_id": "55bd34d9b70a934b24e952e6",
   *  "title": "first event",
   *  "location": "Reedemer West Side",
   *  "date": "2015-09-14T04:00:00.000Z",
   *  "description": "This is the first event",
   *  "lat": 40.786122,
   *  "lng": -73.975738,
   *  "__v": 0,
   *  "version": 0
   * },
   * {...}
 * ]
 *   
 * 
 *
 * @apiPermission isAuthenticated()
 * @apiUse authHeader
 *
 */
//returns list of events
router.get('/', auth.isAuthenticated(), function (req, res, next) {
  Event.find({$or:[{expired:false}, {expired: {$exists:false}}]}, function (err, events) {
    if (err) return next(err);
    res.json(events);
    });
  });

// router.get('/gcm', auth.isAuthenticated(), function (req, res, next) {
//   gcm.sendGCM(7);
//   res.status(200).send();
//   });


/**
 * @api {POST} /api/events Create new event
 *@apiGroup Events
 *@apiVersion 1.0.0
 *
 * @apiParam {String} title The title for the event
 * @apiParam {String} location The name of the existing location or the simple name for a new location
 * @apiParam {String} [address] If the location name is not an existing one, this field is required. Full address for geocoding
 * @apiParam {String} date In valid format.
 * @apiParam {String} description Full event description.

 * @apiParamExample {json} Request Example
 * {
   * "title": "newevent",
   * "location": "New",
   * "date": "6/14/2015",
   * "description": "First Event",
   * "address": "1003 New Street, New York, New York, 30902"
 * }
 *
 * @apiError (Error 403) {String} LocationError Location field was not an existing event and address field was not set
 *
 * @apiErrorExample {json} No Location Found
 * {
 *   "Error" "No location found and no address given"
 * }
 *
 * @apiError (Error 403) {String} ValidationError Required fields were not set or cast to date failed
 * @apiErrorExample {json} Validation Error
 *{
 *   "Error": {
 *     "message": "Event validation failed",
 *     "name": "ValidationError",
 *     "errors": {
 *       "title": {
 *         "properties": {
 *           "type": "required",
 *           "message": "Path `{PATH}` is required.",
 *           "path": "title"
 *         },
 *         "message": "Path `title` is required.",
 *         "name": "ValidatorError",
 *         "kind": "required",
 *         "path": "title"
 *       }
 *     }
 *   }
 * }
 *
 * 
 * @apiPermission group canWrite(Events)
 * @apiUse authHeader
 * 
 */
//creates new event, if the location name exists in the database as a Location then the lat and lng are pulled from there,
//else they are geocoded from the address field
router.post('/', auth.canWrite('Events'), function(req, res, next){
  //TODO: move key to keys file
  var key = config.key.geocode;
  req.body.creator = req.user._id;
  async.waterfall([
      function(callback){
        Location.findOne({name: req.body.location}, function(err, location){
          if(err) callback(err);

          if(location) callback(null, true, location.lat, location.lng);
          else callback(null, false, 0, 0);
          return;
        })
      },
      function(skip, lat, lng, callback){
        if(skip){
          callback(null, lat, lng);
          return;
        }
        else {
          if(!req.body.address){
            callback(errorForm('Geocoding Error', 'No location found and no address given', 403));
            return;
          }
          var location = req.body.address.toString();
          http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&key=' + key, function(res){
            var data = '';
            res.on('data', function (chunk){
                data += chunk;
            });
            res.on('end',function(){
                var obj = JSON.parse(data);
                if(obj.status==='OK'){
                  obj = obj.results[0].geometry.location;
                  callback(null, obj.lat, obj.lng);
                  return;
                }
                else{
                  callback(errorForm('Geocoding error', obj.status, 403));
                  return;
                }
            })
          });
        }
      },
      function(lat, lng, callback){
        var event = new Event({
          title: req.body.title,
          location: req.body.location,
          date: req.body.date,
          lat: lat,
          lng: lng,
          description: req.body.description,
          creator: req.body.creator
        }).save(function(err) {
          callback(err, 'done');
        });
      
 }   ], 
    function(err, results){
      if (err) {return next(err);}
      gcm.sendGCM(0);
      res.status(200).send();
    });
});

/**
 * @api {DELETE} /api/events/delete Delete event
 * @apiGroup Events
 * @apiVersion 1.1.0
 *
 * @apiParam {String} item id of the event item to be deleted
 * @apiParamExample {json} Request Example
 * {
 *   "item":"555kljdfkk4l2eer"
 * }
 *
 * @apiPermission inGroup(admin)
 * @apiUse authHeader
 */
router.delete('/delete', auth.inGroup('admin'), function(req, res, next){
  Event.findOneAndRemove({'id':req.item}, function(err){
    if(err) return next(err);
    gcm.sendGCM(0);
    res.status(200).send();
  });
});