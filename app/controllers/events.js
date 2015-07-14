var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Event = mongoose.model('Event');
var auth = require('../auth/auth.service');
var http = require('https');
var async = require('async');

module.exports = function (app) {
  app.use('/api/events', router);
}

router.get('/', auth.isAuthenticated(), function (req, res, next) {
  Event.find(function (err, events) {
    if (err) return next(err);
    res.json(events);
    });
  });

router.post('/', auth.inGroup("admin"), function(req, res, next){
  var location = req.body.location.toString();
  var key = 'AIzaSyD9OrxkDhvWpiuKDajoXp4hlHGgu-4B4TQ';

  async.waterfall([
      function(callback){
        http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&key=' + key, function(res){
          console.log(res.statusCode);
          var data = '';
          res.on('data', function (chunk){
              data += chunk;
          });
          res.on('end',function(){
              var obj = JSON.parse(data);
              if(obj.status==='OK'){
                obj = obj.results[0].geometry.location;
                console.log( obj );
                callback(null, obj.lat, obj.lng);
              }
              else{
                callback(obj.status);
              }
              
          })
        });
      },
      function(lat, lng, callback){
        var event = new Event({
          title: req.body.title,
          location: req.body.location,
          date: req.body.date,
          lat: lat,
          lng: lng,
          description: req.body.description
        }).save(function(err) {
          if (err) return next(err);
          console.log('saved');
          callback(null, 'done');
        });
      }
    ], 
    function(err, results){
      if (err) { res.send({Error: err}); }
      res.status(200).send();
    });

  
})