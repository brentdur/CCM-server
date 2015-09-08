/*
  Talks Controller
 */

var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Talk = mongoose.model('Talk');
  var auth = require('../auth/auth.service');
  var http = require('http');
  var async = require('async');
  var gcm = require('../gcm');

module.exports = function (app) {
  app.use('/api/talks', router);
}

//gets all talks
/**
 * @api {GET} /api/talks Get all talks
 * @apiGroup Talks
 * @apiVersion 0.1.0
 *
 * @apiSuccess {String} _id The unique id of the talk object
 * @apiSuccess {String} author The name of the talk author
 * @apiSuccess {String} subject The subject of the talk
 * @apiSuccess {Date} date The date the talk was given
 * @apiSuccess {String} reference The specific reference of the passage used
 * @apiSuccess {String} creator The id of the user who created the talk
 * @apiSuccess {String} fullVerse The verse in its entirety, pulled from esvapi.org
 * @apiSuccess {Integer} version The version number of the specific talk
 * @apiSuccess {String[]} outline The outline points
 *
 * @apiSuccessExample {json} Response Example
 [
  {
    "_id": "55e5c6c0e3eb4ba034d19e57",
    "author": "eric",
    "subject": "example",
    "date": "2015-06-14T00:00:00.000Z",
    "reference": "john 3:16",
    "creator": "55de4c4d53d79af8061d5e61",
    "fullVerse": "[16]\"For God so loved the world, that he gave his only Son, that \nwhoever believes in him should not perish but have eternal life.",
    "__v": 0,
    "version": 0,
    "outline": [
      "point a",
      "pointb"
    ]
  }
]
 * @apiPermission isAuthenticated
 * @apiUse authHeader
 */
router.get('/', auth.isAuthenticated(), function (req, res, next) {
  Talk.find(function (err, talks) {
    if (err) return next(err);
    res.json(talks);
    });
  });

//creates a new talk, replacing the reference with the full passage pulled from esvapi.org
/**
 * @api {POST} /api/talks Create new talk
 * @apiGroup Talks
 * @apiVersion 0.1.0
 *
 * @apiParam {String} author The author of the talk
 * @apiParam {String} subject The subject of the talk
 * @apiParam {String} date The date/time that the talk was given in standard format
 * @apiParam {String} reference The reference for the talk context. Will be used to load the full verse
 * @apiParam {String[]} [outline] The outline points
 *
 * @apiParamExample {json} Request Example
 * {
 * "author": "Eric"
 * "subject": "sorrow"
 * "date": "6/14/2015"
 * "reference": "John 1: 1-16"
 * "outline": "note a"
 * "outline": "note b"
 *}
 *
 * @apiError (Error 403) {String} ValidationError Required fields were not set or cast to date failed
 * @apiPermission group canWrite(Talks)
 * @apiUse authHeader
 */
router.post('/', auth.canWrite('Talks'), function(req, res, next){

  req.body.creator = req.user._id;
  async.waterfall([
      function(callback){
        http.get('http://www.esvapi.org/v2/rest/passageQuery?passage='+req.body.reference+'&key=IP&output-format=plain-text&include-passage-references=0&include-footnotes=0&include-short-copyright=0&include-passage-horizontal-lines=0&include-heading-horizontal-lines=0&include-headings=0', function(res){
          var data = '';
          res.on('data', function (chunk){
              data += chunk;
          });
          res.on('end',function(){
              data = data.trim();
              callback(null, data);
          })
        });
      },
      function(full, callback){
        req.body.fullVerse = full;
        var talk = new Talk(req.body).save(function(err){
          callback(err);
        });
      }
    ], 
    function(err, results){
      if (err) { return next(err); }
      gcm.sendGCM(2);
      res.status(200).send();
    });
});

//adds outline-notes to a previously created talk
//currently not avaliable in the app, more of a future feature
/**
 * @api {PUT} /api/talks/note Adds a new outline point to the specified talk
 * @apiGroup Talks
 * @apiVersion 0.1.0
 *
 * @apiParam {String} talk The id of the talk that is being modified
 * @apiParam {String} note The text of the outline point being added
 *
 * @apiParamExample {json} Request Example
 * {
 * "talk": "55a471d03b3ab5ea1294c3ed"
 * "note": "new note"
 * }
 *
 * @apiPermission inGroup(admin)
 * @apiUse authHeader
 */
router.put('/note', auth.inGroup("admin"), function(req, res, next){
  var id = req.body.talk;
  Talk.findById(id, function(err, talk){
    if (err) { return next(err); }
    if (!talk) { return next();}
    console.log(req.body.note);
    talk.addNote(req.body.note, function(err, number){
      if (err) { return next(err); }
      talk.incVersion(function(err){
        if(err) { return next(err); }
        sendGCM(2);
        res.json(number);
      });
    });
  });
});
