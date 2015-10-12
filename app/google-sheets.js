var https = require('https');
var urlParse = require('url');
var parseString = require('xml2js').parseString;
var googleAuth = require('./google-auth');

//TODO: use ret like in google-auth
//
var ret = {};

ret.setupSheet = function(name, cb) {
  var obj = {
    name: name,
    feed: '',
    callback: cb
  };

  googleAuth.getSecrets(obj, ret.createSpreadsheet);
};

ret.updateSheet = function(date, name, email, link) {
  var obj = {
    date: date,
    name: name,
    email: email,
    link: link
  }

  googleAuth.getSecrets(obj, ret.addRow);
};

ret.createSpreadsheet = function(auth, obj) {
  var name = obj.name;

  var options = {
    hostname: 'www.googleapis.com',
    port: 443,
    path: '/drive/v2/files',
    method: 'POST',
    headers: {
      'Authorization':'Bearer ' + auth.credentials.access_token,
      'Content-Type': 'application/json'
    }
  };

  var body = '{' +
                '"title":"' + name + '",' +
                '"mimeType":"application/vnd.google-apps.spreadsheet"'+
                '}';


  var req = https.request(options, function(res) {
    if(res.statusCode == 401){
      googleAuth.refresh(auth, obj, ret.createSpreadsheet);
      return;
    }
    res.setEncoding('utf8');
    var xml = '';
    res.on('data', function(d) {
      xml += d;
    });

    res.on('end', function(){
      if (res.statusCode != 200) {
        return;
      }
      console.log('Created Spreadsheet');
      ret.getSpreadsheets(auth, obj);
      return;
    });
  });

  req.on('error', function(e) {
    console.error(e);
  });

  req.write(body);
  req.end();
};


ret.getSpreadsheets = function(auth, obj) {
  var term = "?title=" + obj.name;

  var options = {
    hostname: 'spreadsheets.google.com',
    port: 443,
    path: '/feeds/spreadsheets/private/full',
    method: 'GET',
    headers: {
      'Authorization':'Bearer ' + auth.credentials.access_token
    }
  };


  var req = https.request(options, function(res) {
    res.setEncoding('utf8');
    var xml = '';
    res.on('data', function(d) {
      xml += d;
    });

    res.on('end', function(){
      if (res.statusCode != 200) {
        return;
      }

      parseString(xml, function (err, result) {
          obj.feed = result.feed.entry[0].link[0].$.href;
          ret.getWorksheets(auth, obj);
          return;
      });
    });
  });
  req.end();

  req.on('error', function(e) {
    console.error(e);
  });
};

ret.getWorksheets = function(auth, obj){
  var feed = obj.feed;

  if(!feed){
    console.log("Get Worksheet Failed");
    return;
  }

  var url = urlParse.parse(feed);

  var options = {
    hostname: url.host,
    port: 443,
    path: url.path,
    method: 'GET',
    headers: {
      'Authorization':'Bearer ' + auth.credentials.access_token
    }
  };


  var req = https.request(options, function(res) {
    res.setEncoding('utf8');
    var xml = '';
    res.on('data', function(d) {
      xml += d;
    });

    res.on('end', function(){
      parseString(xml, function (err, result) {
          ret.addHeaderCells(auth, result.feed.entry[0].link[1].$.href + '/R1C1/0', 1, 1, function(){
            obj.callback(result.feed.entry[0].link[0].$.href);
            return;
          });

      });
    });
  });
  req.end();

  req.on('error', function(e) {
    console.error(e);
  });
};

ret.addHeaderCells = function(auth, link, row, col, cb){
  if(!link){
    console.log('Add header failed');
    return;
  }
  var url = urlParse.parse(link);
  var values = ['Time', 'Name', 'Email'];
  var value = values[col-1];

  var options = {
    hostname: url.host,
    port: 443,
    path: url.path,
    method: 'PUT',
    headers: {
      'Authorization':'Bearer ' + auth.credentials.access_token,
      'Content-Type': 'application/atom+xml'
    }
  };

  var cleanId = link.slice(0, link.lastIndexOf('/'));
  var body = '<entry xmlns="http://www.w3.org/2005/Atom" xmlns:gs="http://schemas.google.com/spreadsheets/2006"> ' +
              '<id>' + cleanId + '</id> ' +
              '<link rel="edit" type="application/atom+xml" ' +
              'href="' + cleanId + '"/>' +
              '<gs:cell row="' + row + '" col="' + col + '" inputValue="' + value + '"/> ' +
              '</entry>';

  var req = https.request(options, function(res) {
    res.setEncoding('utf8');
    var xml = '';
    res.on('data', function(d) {
      xml += d;
    });

    res.on('end', function(){
      parseString(xml, function (err, result) {
          if (res.statusCode == 409){
            ret.addHeaderCells(auth, result.entry.link[1].$.href, row, col, cb)
            return;
          }
          if (res.statusCode = 200) {
            if (col < 3) {
              var newLink = result.entry.link[0].$.href.slice(0, result.entry.link[0].$.href.lastIndexOf('/'));
              ret.addHeaderCells(auth, newLink + '/R' + row + 'C' + (col+1) + '/0', row, col+1, cb);
            }
            else {
              cb();
            }
            return;
          }

      });
    });
  });

  req.on('error', function(e) {
    console.error(e);
  });

  req.write(body);
  req.end();
};

ret.addRow = function(auth, obj) {
  var link = obj.link;

  if(!link){
    console.log('Add row failed');
    return;
  }
  var url = urlParse.parse(link);

  var options = {
    hostname: url.host,
    port: 443,
    path: url.path,
    method: 'POST',
    headers: {
      'Authorization':'Bearer ' + auth.credentials.access_token,
      'Content-Type': 'application/atom+xml',
      'Accept': 'application/atom+xml'
    }
  };

  var body =  '<entry xmlns="http://www.w3.org/2005/Atom" '+
              'xmlns:gsx="http://schemas.google.com/spreadsheets/2006/extended"> '+
              '<gsx:time>'+ obj.date +'</gsx:time> '+
              '<gsx:name>'+ obj.name +'</gsx:name> '+
              '<gsx:email>'+ obj.email +'</gsx:email> '+
              '</entry>';

  var req = https.request(options, function(res) {
    res.setEncoding('utf8');
    var xml = '';

    if (res.statusCode > 200 && res.statusCode < 299) {
        return;
      }
  });

  req.on('error', function(e) {
    console.error(e);
  });

  req.write(body);
  req.end();
};

module.exports = ret;

