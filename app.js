/*jslint node: true */
'use strict';

var growler = require('growler');
var io = require('socket.io-client');

var server = 'http://flyingchicken.herokuapp.com';

if (process.env.REMOTE !== undefined) {
  server = process.env.REMOTE;
}

var DEBUG = false;
if (process.env.DEBUG === '1') {
  DEBUG = true;
}

var log = function () {};
if (DEBUG) {
  log = function (str) {
    console.log(str);
  };
}

log('Using server: ' + server);

var app = new growler.GrowlApplication('Colo Colo');
app.setNotifications({
  'GitHub Commit': {}
});
app.register(function (success, err) {
  if (err) {
    console.log(err.message);
    return;
  }

  var socket = io.connect(server);
  socket
  .on('connect', function () {
    // socket connected
    log('connected');
  })
  .on('disconnect', function () {
    log('disconnected');
    // socket disconnected
  })
  .on('error', function (err) {
    if (err.message) {
      console.log(err.message);
    } else {
      console.log(err);
    }
  })
  .on('connect_failed', function () {
    log('connect failed');
  })
  .on('welcome', function (data) {
    log('welcome: ' + data.time);
  })
  .on('close', function (code, message) {
    log('close. code: ' + code + ' message: ' + message);
  })
  .on('newcommit', function (data) {
    log('New Commit');
    log('Author: ' + data.head_commit.author.name);
    log('Repo: ' + data.repository.name);
    log(data.head_commit.message);
    log('');
    data.commits.forEach(function (commit) {
      app.sendNotification('GitHub Commit', {
        title: 'Commit to ' + data.repository.name,
        text: 'by ' + commit.author.name + '\n' + commit.message
      });
    });
  });
});
