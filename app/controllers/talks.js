var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Talk = mongoose.model('Talk');
  var auth = require('../auth/auth.service');
  var http = require('http');
  var async = require('async');

module.exports = function (app) {
  app.use('/api/talks', router);
}

router.get('/', auth.isAuthenticated(), function (req, res, next) {
  Talk.find(function (err, talks) {
    if (err) return next(err);
    res.json(talks);
    });
  });

router.post('/', auth.inGroup("admin"), function(req, res, next){

  

  async.waterfall([
      function(callback){
        http.get('http://www.esvapi.org/v2/rest/passageQuery?passage='+req.body.reference+'&key=IP&output-format=plain-text&include-passage-references=0&include-footnotes=0&include-short-copyright=0&include-passage-horizontal-lines=0&include-heading-horizontal-lines=0&include-headings=0', function(res){
          console.log(res.statusCode);
          var data = '';
          res.on('data', function (chunk){
              data += chunk;
          });
          res.on('end',function(){
              // var obj = JSON.parse(data);
              data = data.trim();
              console.log( data );
              callback(null, data);
          })
        });
      },
      function(full, callback){
        req.body.fullVerse = full;
        var talk = new Talk(req.body).save(function(err){
          if (err) return next(err);
          console.log('saved');
          res.status(200).end();
        });
      }
    ], 
    function(err, results){
      if (err) { return next(err); }
      res.status(200).send();
    });
});

router.put('/note', auth.inGroup("admin"), function(req, res, next){
  var id = req.body.talk;
  Talk.findById(id, function(err, talk){
    if (err) { return next(err); }
    if (!talk) { return next();}
    console.log(req.body.note);
    talk.addNote(req.body.note, function(err, number){
      if (err) { return next(err); }
      res.json(number)
    });
  });
});
