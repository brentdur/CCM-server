var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'ccm'
    },
    port: 9000,
    seed: true,
    env: 'development',
    db: 'mongodb://localhost/ccm-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'ccm'
    },
    port: 9000,
    env: 'test',
    seed: true,
    db: 'mongodb://localhost/ccm-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'ccm'
    },
    port: 9010,
    env: 'production',
    seed: true,
    db: 'mongodb://localhost/ccm'
  }
};

module.exports = config[env];
