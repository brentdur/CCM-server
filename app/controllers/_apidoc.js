module.exports = function (app) {
}

/**
 * @api {get} /api/events Get all events
 * @apiGroup Events
 * @apiVersion 0.1.0
 *
 * @apiSuccess {String} _id Unique string for event
 * @apiSuccess {String} title The simple name for this event.
 * @apiSuccess {String} location The simple name of the venue.
 * @apiSuccess {String} date Date of this event in standard format.
 * @apiSuccess {String} description Full description of this event.
 * @apiSuccess {Number} lat Latitude of venue.
 * @apiSuccess {Number} lng Longitude of venue. 
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