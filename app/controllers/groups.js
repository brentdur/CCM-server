/**
 *   Groups Controller
 *
 */


var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Group = mongoose.model('Group');
  var auth = require('../auth/auth.service');
  var gcm = require('../gcm');

module.exports = function (app) {
  app.use('/api/groups', router);
}

/**
 * @api {GET} /api/groups Get all groups
 * @apiGroup Groups
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} _id Unique string for group
 * @apiSuccess {String} name Name of the event
 * @apiSuccess {Number} version Version number for group
 * @apiSuccess {Boolean} writeEvents Specifies whether this group has write permission for events
 * @apiSuccess {Boolean} writeMsgs Specifies whether this group has write permission for messages
 * @apiSuccess {Boolean} writeTalks Specifies whether this group has write permission for talks
 * @apiSuccess {Boolean} writeSignups Specifies whether this group has write permission for signups
 * @apiSuccess {Users[]} members Populated list of all members
 *
 * @apiSuccessExample {json} Response Example
 * [
 * {
 *   "_id": "55aaad047b521bba68335407",
 *   "name": "admin",
 *   "__v": 2,
 *   "version": 0,
 *   "writeEvents": true,
 *   "writeMsgs": true,
 *   "writeTalks": true,
 *   "writeSignups": true,
 *   "members": [
 *     {
 *       "_id": "55aaad047b521bba68335409",
 *       "name": "admin",
 *       "email": "admin@brentondurkee.com",
 *       "__v": 2,
 *       "gcm": "e2nP4VMFNQw:APA91bG73-p2xQkYLZSJx29eYlgFP2GQ2eclj6Z9vKIWreerpa3xoyYDmGiJ8x7yUIRu1q2Z-t-2FSsY_rMFQKo-jnP099R4hOqxUlfVGKIJa-kb90kFppL3kbAnJ1VfpvMKacpXEqpT",
 *       "groups": [
 *         "55aaad047b521bba68335407"
 *       ],
 *       "opt": true,
 *       "confirmed": false,
 *       "role": "user"
 *     },
 *     {
 *       ...
 *     }
 *   ]
 * },
 * {...}
 * ]
 *
 * @apiPermission inGroup(admin)
 * @apiUse authHeader
 */
//gets all groups with populated members names
router.get('/', auth.inGroup('admin'), function (req, res, next) {
  Group.find({})
  .populate('members', '-hashedPassword -salt')
  .exec(function (err, groups) {
    if (err) return next(err);
    res.json(groups);
    });
  });

/**
 * @api {POST} /api/groups Create new group
 * @apiGroup Groups
 * @apiVersion 1.0.0
 * @apiParam name The name of the new group
 * @apiParam {Boolean} [writeTalks=false] whether this group can make new talks
 * @apiParam {Boolean} [writeEvents=false] whether this group can make new events
 * @apiParam {Boolean} [writeMsgs=false] whether this group can make new messages
 * @apiParam {Boolean} [writeSignups=false] whether this group can make new signups
 * 
 *
 * @apiParamExample {json} Request Example
 * {
 *   "name": "admins"
 * }
 *
 * @apiPermission inGroup(admin)
 * @apiUse authHeader
 * @apiUse  VerificationError
 */
//creates a new, empty group
router.post('/', auth.inGroup('admin'), function(req, res, next){
  req.body.creator = req.user._id;
  var group = new Group(req.body).save(function(err){
    if (err) return next(err);
    gcm.sendGCM(3);
    res.status(200).send();
  });
});