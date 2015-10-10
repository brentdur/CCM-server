var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

var keys = require('../config/key');

var SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly', 'https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'drive-nodejs-quickstart.json';

var ret = {};

// Load client secrets from a local file.
ret.getSecrets = function(passObj, callback){
  var content = keys.authContent;
  // fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  //   if (err) {
  //     console.log('Error loading client secret file: ' + err);
  //     return;
  //   }
  //   // Authorize a client with the loaded credentials, then call the
  //   // Drive API.
  //   authorize(JSON.parse(content), passObj, callback);
  // });
  ret.authorize(JSON.parse(content), passObj, callback);
};

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
ret.authorize = function(credentials, passObj, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      ret.getNewToken(oauth2Client, passObj, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client, passObj);
    }
  });
};

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
 ret.getNewToken = function(oauth2Client, passObj, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      ret.storeToken(token);
      callback(oauth2Client, passObj);
    });
  });
};

ret.refresh = function(oauth2Client, passObj, callback){
  oauth2Client.refreshAccessToken(function(err, token) {
    if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
    ret.storeToken(token);
    callback(oauth2Client, passObj);
  });
};

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
ret.storeToken = function(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
};

module.exports = ret;

