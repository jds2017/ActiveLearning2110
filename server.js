/* jshint node: true */

"use strict";

var app_api_v2 = require('./app_api_v2'),
    app_client = require('./app_client'),
    app_support = require('./app_support'),
    bodyparser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    config = require('./config'),
    winston = require('winston'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    session = require('client-sessions');


require('./app_socket/lectures')(io, winston);

/**
Must have MongoDB installed and run mongod
*/
mongoose.Promise = global.Promise;
mongoose.connect(config.database);

winston.configure({
    transports: [
      new(winston.transports.File)({
            filename: config.log_file,
            maxsize: 1000000
        })
    ]
});

app.use(express.static(path.join(__dirname, '/app_client')));

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(cookieParser());

app.use(bodyparser.json({
    limit: '50mb'
}));

app.use(session({
  cookieName: 'session',
  secret: 'todo-makeasecret',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

app_client(app);
app_api_v2(app);
app_support(app);

app.set('port', process.env.PORT || 8081);

server.listen(app.get('port'), function() {
    console.log('listening on port 8081');
});
