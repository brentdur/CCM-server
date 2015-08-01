'use strict';

/*
  Main authentication middleware
 */

var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../../config/config');
var jwt = require('jsonwebtoken');
var async = require('async');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = mongoose.model('User');
var Group = mongoose.model('Group');
var validateJwt = expressJwt({ secret: config.session });

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if(req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next) {
      User.findById(req.user._id, function (err, user) {
        if (err) return next(err);
        if (!user) return res.sendStatus(401);

        req.user = user;
        next();
      });
    });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
  if (!roleRequired) throw new Error('Required role needs to be set');

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
        next();
      }
      else {
        res.sendStatus(403);
      }
    });
}

function inGroup(groupReq) {
  if (!groupReq) throw new Error('Required group needs to be set');

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      Group.findOne({name: groupReq}, '_id', function(err, group){
        if (err) { return next(err); }
        if (!group) {throw new Error('No group by that name'); return next(err);}
        if (req.user.groups.indexOf(group._id) != -1){
          next();
        }
        else {
          res.sendStatus(403);
        }
      })
    });
}

function canWrite(type){
  if(!type) throw new Error('Required type needs to be set');

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      var forward = 'write'+type;
      var groups = req.user.groups;
      var good = false;
      async.forEachOf(groups, function(item, key, callback){
        if(!good){
          Group.findById({_id: item}, forward, function(err, group){
            if(group && group.toString().indexOf('true') > -1) {
              good = true;
            }
            else {
              console.log(group.toString());
              console.log(forward);
            }
            callback(err);
          });
        }
        else {
          callback(err);
        }
        
      }, function(err){
        if(err) return next(err);
        if(!good){
          res.sendStatus(403);
        }
        else {
          next();
        }
      });
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id, time) {
  return jwt.sign({ _id: id }, config.session, { expiresInMinutes: 60*time });
}

/**
 * Set token cookie directly for oAuth strategies
 */
function setTokenCookie(req, res) {
  if (!req.user) return res.json(404, { message: 'Something went wrong, please try again.'});
  var token = signToken(req.user._id, req.user.role);
  res.cookie('token', JSON.stringify(token));
  res.redirect('/');
}

exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.inGroup = inGroup;
exports.canWrite = canWrite;
exports.signToken = signToken;
exports.setTokenCookie = setTokenCookie;