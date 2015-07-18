var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Event = mongoose.model('Event');
  Talk = mongoose.model('Talk');
  Message = mongoose.model('Message'),
  Location = mongoose.model('Location');

module.exports = function (app) {
  app.use('/', router);
}

router.get('/', function (req, res, next) {
  Event.find(function (err, events) {
    if (err) return next(err);
    Message.find(function (err, messages){
      if(err) return next(err);
      Talk.find(function (err, talks){
        if(err) return next(err);
        Location.find(function(err, locations){
          if(err) return next(err);
          res.render('index', {
          title: 'Generator-Express MVC',
          events: events,
          talks: talks,
          msgs: messages,
          locs: locations
          });
        });
      });
    });
  });
});