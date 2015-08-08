/*
  Topic Controller
 */

var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Topic = mongoose.model('Topic');
var auth = require('../auth/auth.service');
var async = require('async');
var gcm = require('../gcm');

module.exports = function (app) {
  app.use('/api/topics', router);
}

/**
 * @api {GET} /api/topics Get all Topics
 * @apiGroup Topics
 * @apiVersion 0.1.0
 *
 *@apiSuccess {String} _id Unique string for topic
 *@apiSuccess {String} name Simple name of topic
 *@apiSuccess {Boolean} isAnon Whether the sender of a message of this topic type is anonoymous or not
 *@apiSuccess {Number} version Version identifier of topic, updates if topic is changed.
 *
 * 
 * @apiSuccessExample {json} Response Example
 * [
 *   {
 *     "_id": "55c5527f8efd394f3634c76a",
 *     "name": "Question",
 *     "__v": 0,
 *     "version": 0,
 *     "isAnon": true
 *   },
 *   {...}
 * ]
 *
 * @apiPermission isAuthenticated()
 * @apiUse authHeader
 */
//get all topics
router.get('/', auth.isAuthenticated(), function(req, res, next){
  Topic.find({}, function(err, topics){
    res.json(topics);
  });
})

/**
 * @api {POST} /api/topics Create a new topic
 * @apiGroup Topics
 * @apiVersion 0.1.0
 *
 * @apiParam {String} name Name of topic
 * @apiParam {Boolean} [isAnon=false] Whether the sender of a message of this topic type is anonoymous or not
 * 
 * @apiParamExample {json} Request Example
 * {
 *   "name": "Question",
 *   "isAnon": "true"
 * }
 *
 * @apiUse VerificationError
 * @apiUse authHeader
 * @apiPermission inGroup(admin)
 */
//creates new topic
router.post('/', auth.inGroup('admin'), function(req, res, next){
  var topic = new Topic(req.body).save(function(err) {
        if(err) return next(err);
        gcm.sendGCM(5);
        res.status(200).end();
      });
})