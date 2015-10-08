/**
 * Conversations Controller
 */

 var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	auth = require('../auth/auth.service'),
	Conversation = mongoose.model('Conversation'),
	Message = mongoose.model('Message'),
	Topic = mongoose.model('Topic'),
	User = mongoose.model('User'),
	Broadcast = mongoose.model('Broadcast'),
	// http = require('https'),
	async = require('async'),
	uuid = require('node-uuid'),
	gcm = require('../gcm'),
	utils = require('../utils')
	// config = require('../../config/config')
	;


module.exports = function (app) {
  app.use('/api/broadcasts', router);
}

To get sent broadcasts
Sync
only does gcm sync, no notification


/**
 * @api {get} /api/broadcasts Get all broadcasts
 * @apiGroup Broadcasts
 * @apiVersion 1.2.0
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
 *   
 * 
 *
 * @apiPermission inGroup(admin)
 * @apiUse authHeader
 *
 */


/**
 * @api {POST} /api/broadcasts/send Create new broadcast
 * @apiDescription Creates a new broadcast, which begins to spawn messages and send notifications for every user
 *@apiGroup Broadcasts
 *@apiVersion 1.2.0
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

/**
 * @api {POST} /api/broadcasts/sync Create new broadcast that only syncs
 * @apiDescription Creates a new broadcast, which begins to spawn messages and send notifications for every user
 *@apiGroup Broadcasts
 *@apiVersion 1.2.0
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


