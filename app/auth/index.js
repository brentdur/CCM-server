'use strict';

/*
	Index file loading all the different authentication strategies
	Currently only local is working
 */

var express = require('express');
var passport = require('passport');
var config = require('../../config/config');
var mongoose = require('mongoose');
var User = mongoose.model('User');

// Passport Configuration
require('./local/passport').setup(User, config);
require('./facebook/passport').setup(User, config);
require('./google/passport').setup(User, config);
require('./twitter/passport').setup(User, config);

var router = express.Router();

router.use('/local', require('./local'));
router.use('/facebook', require('./facebook'));
router.use('/twitter', require('./twitter'));
router.use('/google', require('./google'));

module.exports = router;