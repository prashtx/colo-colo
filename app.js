/*jslint node: true */
'use strict';

var growler = require('growler');
var io = require('socket.io-client');

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

var app = new growler.GrowlApplication('Colo Colo');
app.setNotifications({
  'GitHub Commit': {}
});
app.register(function (success, err) {
  if (err) {
    console.log(err.message);
    return;
  }

  //var socket = io.connect('http://flying-chicken.herokuapp.com');
  var socket = io.connect('http://localhost:3000');
  socket
  .on('connect', function () {
    // socket connected
    log('connected');
  })
  .on('disconnect', function () {
    log('disconnected');
    // socket disconnected
  })
  .on('newcommit', function (data) {
    log('New Commit');
    log('Author: ' + data.commit.author.name);
    log('Repo: ' + data.repository.name);
    log(data.commit.message);
    log('');
    app.sendNotification('GitHub Commit', {
      title: 'Commit to ' + data.repository.name,
      text: 'by ' + data.commit.author.name + '\n' + data.commit.message
    });
  });
});
