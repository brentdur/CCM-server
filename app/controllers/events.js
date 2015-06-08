var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Event = mongoose.model('Event');

module.exports = function (app) {
  app.use('/api/events', router);
}

router.get('/', function (req, res, next) {
  Event.find(function (err, events) {
    if (err) return next(err);
    res.json(events);
    });
  });

router.post('/', function(req, res, next){
  var event = new Event({
    title: req.body.title,
    location: req.body.location,
    date: req.body.date,
    description: req.body.description
  }).save(function(err) {
    if (err) return next(err);
    console.log('saved');
    res.status(200).end();
  });
})