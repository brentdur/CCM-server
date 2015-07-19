/*
  Groups Controller
 */

var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Group = mongoose.model('Group');
  var auth = require('../auth/auth.service');

module.exports = function (app) {
  app.use('/api/groups', router);
}

//gets all groups with populated members names
router.get('/', auth.inGroup('admin'), function (req, res, next) {
  Group.find({})
  .populate('members', '-hashedPassword -salt')
  .exec(function (err, groups) {
    if (err) return next(err);
    res.json(groups);
    });
  });

//creates a new, empty group
router.post('/', auth.inGroup('admin'), function(req, res, next){
  req.body.creator = req.user._id;
  var group = new Group(req.body).save(function(err){
    if (err) return next(err);
    console.log('saved');
    res.status(200).end();
  });
});