module.exports = function (app) {

}

/**
 * @apiDefine msgGet
 * @apiSuccess {String} _id Unique string for message
 * @apiSuccess {User} from User that sent the message
 * @apiSuccess {Group} to Recipient group of the message, will always be ministers
 * @apiSuccess {String} simpleTo Text name of the group for display purposes, will always be ministers
 * @apiSuccess {String} simpleFrom Text name of the sender of the message
 * @apiSuccess {String} subject Subject of the message, used like a title
 * @apiSuccess {Topic} topic topic of the message
 * @apiSuccess {String} date Formated date that the message was sent
 * @apiSuccess {String} message Actualy message text
 * @apiSuccess {Number} version Version identifier of the message
 * @apiSuccess {Conversation} conversation Conversation that this message is connected to 
 * @apiSuccess {String} senderId The sender of this message, identified by unique id
 * 
 * @apiSuccessExample {json} Response Example
 * [
 * {
 *     "_id": "55c5527f8efd394f3634c762",
 *     "to": "55c54d8c374fcd3b332085d6",
 *     "simpleTo": "minister",
 *     "simpleFrom": "theuser",
 *     "subject": "Hello",
 *     "topic": "55c5527f8efd394f3634c76a",
 *     "from": "55c54d8c374fcd3b332085d1",
 *     "date": "2015-09-09T04:00:00.000Z",
 *     "message": "Hey guys, welcome to RUF",
 *     "version": 0
 *   },
 *   {...},
 * ]
 */
/**
 * @api {GET} /api/messages Get all messages
 * @apiGroup Messages
 * @apiVersion 1.0.0
 *
 * @apiUse msgGet
 *
 * @apiPermission inGroup(admin)
 * @apiUse authHeader
 */
/**
 * @api {GET} /api/messages/mine Get my messages
 * @apiGroup Messages
 * @apiDescription Gets messages addressed to the groups of the current user, will hide the from field if topic is anonymous
 * @apiVersion 1.0.0
 *
 * @apiUse msgGet
 *
 * @apiPermission isAuthenticated()
 * @apiUse authHeader
 * 
 */
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
