/*
  Main Configuration file
 */

var key = require('./key');

var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'ccm'
    },
    key: key,
    port: 9000,
    seed: true,
    env: 'development',
    session: 'session',
    domain: 'http://localhost:9000/',
    userRoles: ['guest', 'user', 'admin'],
    db: 'mongodb://localhost/ccm-development',
    facebook: {
      clientID:     process.env.FACEBOOK_ID || 'id',
      clientSecret: process.env.FACEBOOK_SECRET || 'secret',
      callbackURL:  (process.env.DOMAIN || '') + '/auth/facebook/callback'
    },

    twitter: {
      clientID:     process.env.TWITTER_ID || 'id',
      clientSecret: process.env.TWITTER_SECRET || 'secret',
      callbackURL:  (process.env.DOMAIN || '') + '/auth/twitter/callback'
    },

    google: {
      clientID:     process.env.GOOGLE_ID || 'id',
      clientSecret: process.env.GOOGLE_SECRET || 'secret',
      callbackURL:  (process.env.DOMAIN || '') + '/auth/google/callback'
    }
  },

  test: {
    root: rootPath,
    app: {
      name: 'ccm'
    },
    port: 9000,
    env: 'test',
    seed: true,
    session: 'session',
    domain: 'http://localhost:9000/',
    userRoles: ['guest', 'user', 'admin'],
    db: 'mongodb://localhost/ccm-test',
    facebook: {
      clientID:     process.env.FACEBOOK_ID || 'id',
      clientSecret: process.env.FACEBOOK_SECRET || 'secret',
      callbackURL:  (process.env.DOMAIN || '') + '/auth/facebook/callback'
    },

    twitter: {
      clientID:     process.env.TWITTER_ID || 'id',
      clientSecret: process.env.TWITTER_SECRET || 'secret',
      callbackURL:  (process.env.DOMAIN || '') + '/auth/twitter/callback'
    },

    google: {
      clientID:     process.env.GOOGLE_ID || 'id',
      clientSecret: process.env.GOOGLE_SECRET || 'secret',
      callbackURL:  (process.env.DOMAIN || '') + '/auth/google/callback'
    }
  },

  production: {
    root: rootPath,
    app: {
      name: 'ccm'
    },
    port: 9015,
    env: 'production',
    seed: false,
    session: 'session',
    domain: 'http://ccm.brentondurkee.com/',
    userRoles: ['guest', 'user', 'admin'],
    db: 'mongodb://localhost/ccm',
    key: key,
    facebook: {
      clientID:     process.env.FACEBOOK_ID || 'id',
      clientSecret: process.env.FACEBOOK_SECRET || 'secret',
      callbackURL:  (process.env.DOMAIN || '') + '/auth/facebook/callback'
    },

    twitter: {
      clientID:     process.env.TWITTER_ID || 'id',
      clientSecret: process.env.TWITTER_SECRET || 'secret',
      callbackURL:  (process.env.DOMAIN || '') + '/auth/twitter/callback'
    },

    google: {
      clientID:     process.env.GOOGLE_ID || 'id',
      clientSecret: process.env.GOOGLE_SECRET || 'secret',
      callbackURL:  (process.env.DOMAIN || '') + '/auth/google/callback'
    }
  }
};

module.exports = config[env];
