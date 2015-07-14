var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Message = mongoose.model('Message');
  var auth = require('../auth/auth.service');

module.exports = function (app) {
  app.use('/api/messages', router);
}

router.get('/', auth.isAuthenticated(), function (req, res, next) {
  Message.find(function (err, messages) {
    if (err) return next(err);
    res.json(messages);
    });
  });

router.post('/', auth.inGroup('admin'), function(req, res, next){
  var message = new Message(req.body).save(function(err) {
    if (err) return next(err);
    console.log('saved');
    res.status(200).end();
  });
})