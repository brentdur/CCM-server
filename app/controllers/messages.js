var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Message = mongoose.model('Message');

module.exports = function (app) {
  app.use('/api/messages', router);
}

router.get('/', function (req, res, next) {
  Message.find(function (err, messages) {
    if (err) return next(err);
    res.json(messages);
    });
  });

router.post('/', function(req, res, next){
  var message = new Message(req.body).save(function(err) {
    if (err) return next(err);
    console.log('saved');
    res.status(200).end();
  });
})