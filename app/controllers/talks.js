var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Talk = mongoose.model('Talk');

module.exports = function (app) {
  app.use('/api/talks', router);
}

router.get('/', function (req, res, next) {
  Talk.find(function (err, talks) {
    if (err) return next(err);
    res.json(talks);
    });
  });

router.post('/', function(req, res, next){
  var talk = new Talk(req.body).save(function(err){
    if (err) return next(err);
    console.log('saved');
    res.status(200).end();
  });
});

router.put('/note', function(req, res, next){
  var id = req.body.talk;
  Talk.findById(id, function(err, talk){
    if (err) { return next(err); }
    console.log(req.body.note);
    talk.addNote(req.body.note, function(err, number){
      if (err) { return next(err); }
      res.json(number)
    });
  });
});
