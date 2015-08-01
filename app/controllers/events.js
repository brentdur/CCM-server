/*
  Event Controller
 */

var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Event = mongoose.model('Event'),
  Location = mongoose.model('Location');
var auth = require('../auth/auth.service');
var http = require('https');
var async = require('async');
var gcm = require('../gcm');

module.exports = function (app) {
  app.use('/api/events', router);
}

var errorForm = function(title, message, status) {
  err = {}
  err.title = title;
  err.message = message;
  err.status = status;
  return err;
}


//returns list of events
router.get('/', auth.isAuthenticated(), function (req, res, next) {
  Event.find(function (err, events) {
    if (err) return next(err);
    res.json(events);
    });
  });

//creates new event, if the location name exists in the database as a Location then the lat and lng are pulled from there,
//else they are geocoded from the address field
router.post('/', auth.canWrite('Events'), function(req, res, next){
  //TODO: move key to keys file
  var key = 'AIzaSyD9OrxkDhvWpiuKDajoXp4hlHGgu-4B4TQ';
  req.body.creator = req.user._id;
  async.waterfall([
      function(callback){
        Location.findOne({name: req.body.location}, function(err, location){
          if(err) callback(err);

          if(location) callback(null, true, location.lat, location.lng);
          else callback(null, false, 0, 0);
          return;
        })
      },
      function(skip, lat, lng, callback){
        if(skip){
          console.log('skip geocode');
          callback(null, lat, lng);
          return;
        }
        else {
          if(!req.body.address){
            callback(errorForm('Geocoding Error', 'No location found and no address given', 403));
            return;
          }
          var location = req.body.address.toString();
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
                  return;
                }
                else{
                  callback(errorForm('Geocoding error', obj.status, 403));
                  return;
                }
            })
          });
        }
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
          callback(err, 'done');
        });
      
 }   ], 
    function(err, results){
      if (err) {return next(err);}
      console.log(err);
      gcm.sendGCM(0);
      res.status(200).send();
    });
});