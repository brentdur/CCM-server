var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Group = mongoose.model('Group');
  var auth = require('../auth/auth.service');

module.exports = function (app) {
  app.use('/api/groups', router);
}

router.get('/', auth.inGroup('admin'), function (req, res, next) {
  Group.find({})
  .populate('members', '-hashedPassword -salt')
  .exec(function (err, groups) {
    if (err) return next(err);
    res.json(groups);
    });
  });

router.post('/', auth.inGroup('admin'), function(req, res, next){
  var group = new Group(req.body).save(function(err){
    if (err) return next(err);
    console.log('saved');
    res.status(200).end();
  });
});