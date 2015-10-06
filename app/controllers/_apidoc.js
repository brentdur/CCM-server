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

/**
 * @api {GET} /api/users Get all users
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} _id Unique identifier for the object
 * @apiSuccess {String} provider The authentication provider, usually local
 * @apiSuccess {String} name The name of the user
 * @apiSuccess {String} email The user's email
 * @apiSuccess {String} hashedPassword The encrypted version of the user's password
 * @apiSuccess {String} gcm The gcm token for notification access
 * @apiSuccess {String} salt The encryption salt for the user
 * @apiSuccess {String[]} groups An array of group ids that the user is a member of
 * @apiSuccess {Boolean} opt [Unused] Whether the user has opted in for email delivery or not
 * @apiSuccess {Boolean} confirmed [Unused] Whether the user has confirmed their email address
 * @apiSuccess {String} role [Unusued] The user's specified role. Was deprecated in favor of a group-based system.
 *
 * @apiSuccessExample {json} Response Example
 * [
  {
    "_id": "55e4b8ae1959b17a0777a816",
    "provider": "local",
    "name": "test",
    "email": "test@brentondurkee.com",
    "hashedPassword": "7/YjGYRO8BZAqmztaLmjww==",
    "gcm": "lkdjafkljdf",
    "salt": "s/u",
    "__v": 4,
    "groups": [
      "55de4d373596ddbf6c25e932"
    ],
    "opt": true,
    "confirmed": false,
    "role": "user"
  },
  {...} 
  ]
 *
 * @apiPermission inGroup(admin)
 * @apiUse authHeader
 */
/**
 * @api {GET} /api/users/me Get information about the current user
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} _id Unique identifier for the object
 * @apiSuccess {String} provider The authentication provider, usually local
 * @apiSuccess {String} name The name of the user
 * @apiSuccess {String} email The user's email
 * @apiSuccess {String} gcm The gcm token for notification access
 * @apiSuccess {Group[]} groups An array of populated groups that the user is a member of 
 * @apiSuccess {Boolean} opt [Unused] Whether the user has opted in for email delivery or not
 * @apiSuccess {Boolean} confirmed [Unused] Whether the user has confirmed their email address
 * @apiSuccess {String} role [Unusued] The user's specified role. Was deprecated in favor of a group-based system.
 *
 * @apiSuccessExample {json} Response Example
 * [
  {
    "_id": "55e4b8ae1959b17a0777a816",
    "provider": "local",
    "name": "test",
    "email": "test@brentondurkee.com",
    "gcm": "lkdjafkljdf",
    "__v": 4,
    "groups": [
      {...}
    ],
    "opt": true,
    "confirmed": false,
    "role": "user"
  },
  {...} 
  ]
 *
 * @apiPermission isAuthenticated
 * @apiUse authHeader
 */
/**
 * @api {POST} /api/messages Creates a new message for the 'ministers' group
 * @apiGroup Messages
 * @apiVersion 1.0.0
 *
 * @apiParam {String} subject Subject/Title of the message
 * @apiParam {String} message Text of the message
 * @apiParam {Topic} topic id of the topic
 *
 * @apiParamExample {json} Request Example
 * {
 *  "subject": "Question!!!",
 *  "message": "Me have question",
 *  "topic": "55c55101cc899eb235a309fd"
 * }
 *
 * @apiError (Error 404) {String} GroupNotFoundError The specified group was not found.
 * @apiErrorExample {json} No Group Found
 * {
 *   "message": "No group found",
 *   "status": 404,
 *   "title": "Group not found"
 * }
 * 
 * @apiUse  VerificationError
 * @apiUse authHeader
 * @apiPermission group canWrite(Msgs)
 */
