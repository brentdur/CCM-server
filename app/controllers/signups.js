/**
 *   Signup Controller
*/

var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Signup = mongoose.model('Signup'),
  Location = mongoose.model('Location');
var auth = require('../auth/auth.service');
var http = require('https');
var async = require('async');
var gcm = require('../gcm');

module.exports = function (app) {
  app.use('/api/signups', router);
}

var errorForm = function(title, message, status) {
  err = {}
  err.title = title;
  err.message = message;
  err.status = status;
  return err;
}


/**
 * @api {get} /api/signups Get all signups
 * @apiGroup Signups
 * @apiVersion 0.1.0
 *
 * @apiSuccess {String} _id Unique string for signup
 * @apiSuccess {String} name The simple name for this signup .
 * @apiSuccess {String} dateInfo Recurring date of the event that the signup is for, information about timing
 * @apiSuccess {String} location The simple name of the venue.
 * @apiSuccess {String} address The full address for the venue the signup is for
 * @apiSuccess {String} description Full description of this event.
 * @apiSuccess {Number} version Version of event, starting at 0.
 * @apiSuccess {Number} memberCount number of total members
 * @apiSuccess {[User]} members Array of all people signuped for this
 * @apiSuccess {Event} [relatedEvent] currently not in use
 * @apiSuccess {User} creator the user id of the user that created the signup
 *
 * @apiSuccessExample {json} Response Example
 * [
 *   {
 *     "_id": "55c554107d7078ab36912c7d",
 *     "name": "Small Group",
 *     "dateInfo": "Every Wednesday at 7:00pm",
 *     "location": "The house",
 *     "address": "75 Third Avenue, 10003",
 *     "description": "Our weekly small group event!",
 *     "__v": 0,
 *     "version": 0,
 *     "memberCount": 0,
 *     "members": []
 *   },
 *   {...}
 * ]
 *   
 * 
 *
 * @apiPermission isAuthenticated()
 * @apiUse authHeader
 *
 */
//returns list of signups
router.get('/', auth.isAuthenticated(), function (req, res, next) {
  Signup.find().lean().exec(function (err, signups) {
    if (err) return next(err);
    for (var i = 0; i < signups.length; i++){
      console.log(signups[i]);
      signups[i].isMemberOf = false;
      for (var j = 0; j< signups[i].members.length; j++){
        console.log(signups[i].members[j]);
        console.log(req.user._id);
        if(signups[i].members[j].toString() === req.user._id.toString()){
          signups[i].isMemberOf = true;
          console.log(signups[i]);
          break;
        }
      }
    }
    res.json(signups);
    });
  });


/**
 * @api {POST} /api/signups Create new signup
 *@apiGroup Signups
 *@apiVersion 0.1.0
 *
 * @apiParam {String} name The title for the event
 * @apiParam {String} dateInfo String explanation of date/times
 * @apiParam {String} location The name of the existing location or the simple name for a new location
 * @apiParam {String} [address] If the location name is not an existing one, this field is required. Full address for map finding
 * @apiParam {String} description Full event description.
 * @apiParam {String} [eventid] id of connected event, not currently used

 * @apiParamExample {json} Request Example
 *  {
 *     "name":" new signup",
 *     "dateInfo": "This occurs often",
 *     "location": "NEW!",
 *     "address": "75 Third Avenue, 10003",
 *     "description": "new stuff!!!"
 *   }
 *
 * @apiError (Error 403) {String} LocationError Location field was not an existing location and address field was not set
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
 *     "message": "Signup validation failed",
 *     "name": "ValidationError",
 *     "errors": {
 *       "name": {
 *         "properties": {
 *           "type": "required",
 *           "message": "Path `{PATH}` is required.",
 *           "path": "name"
 *         },
 *         "message": "Path `name` is required.",
 *         "name": "ValidatorError",
 *         "kind": "required",
 *         "path": "name"
 *       }
 *     }
 *   }
 * }
 *
 * 
 * @apiPermission group canWrite(Signups)
 * @apiUse authHeader
 * 
 */
//creates new signup, if the location name exists in the database as a Location then the address is pulled from there,
router.post('/', auth.canWrite('Signups'), function(req, res, next){
  //TODO: move key to keys file
  var key = 'AIzaSyD9OrxkDhvWpiuKDajoXp4hlHGgu-4B4TQ';
  req.body.creator = req.user._id;
  async.waterfall([
      function(callback){
        Location.findOne({name: req.body.location}, function(err, location){
          if(err) callback(err);

          if(location) callback(null, true, location.address);
          else callback(null, false, null);
          return;
        })
      },
      function(skip, address, callback){
        if(skip){
          console.log('skip geocode');
          callback(null, address);
          return;
        }
        else {
          if(!req.body.address){
            callback(errorForm('Geocoding Error', 'No location found and no address given', 403));
            return;
          }
          callback(null, req.body.address.toString());
        }
      },
      function(address, callback){
        var signup = new Signup({
          name: req.body.name,
          dateInfo: req.body.dateInfo,
          location: req.body.location,
          address: address,
          relatedEvent: req.body.eventid,
          description: req.body.description,
          creator: req.body.creator
        }).save(function(err) {
          callback(err, 'done');
        });
      
 }   ], 
    function(err, results){
      if (err) {return next(err);}
      console.log(err);
      gcm.sendGCM(6);
      res.status(200).send();
    });
});

/**
 * @api {PUT} /api/signups/addme Add user to signup
 *@apiGroup Signups
 *@apiVersion 0.1.0
 *
 * @apiParam {Signup} signup The signup to register the authorized user to
 * 
 * @apiParamExample {json} Request Example
 *  {
 *    "signup": "55c55ca49c34de703b01a770"
 *  }
 *
 * @apiError (Error 403) {String} SignupError No signup matching the provided id was fonud
 *
 * @apiErrorExample {json} No Signup Found
 * {
 *   "Error" "No location found and no address given"
 * }
 *
 * @apiPermission isAuthenticated()
 * @apiUse authHeader
 * 
 */
router.put('/addme', auth.isAuthenticated(), function(req, res, next){
  Signup.findById(req.body.signup, function(err, signup){
    if (err) return next(err);
    if(!signup) return next(errorForm('Signup Error', 'No signup found', 403));
    signup.addMember(req.user._id, function(err, number){
      if (err) return next(err);
      res.status(200).send();
    });
  });
});