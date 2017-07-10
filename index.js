'use strict';

var express = require("express");
var app = express();
var welcomeRoutes = require('./routes/welcome');
var questionsRoutes = require('./routes/questions');
var jsonParser = require('body-parser').json;
var logger = require('morgan');

// Useful status codes for API responses
app.use(logger("dev"));
// JSON parser for express
app.use(jsonParser());

var mongoose = require('mongoose');

// databasevar mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/qa');

// var Question = require('./db/models');

var db = mongoose.connection;

db.on('error', function(e) {
  console.error('Connection error:', e);
});

db.once('open', function() {
  console.log('db connection successful');
});



// Configure general routes
app.use(welcomeRoutes);
// Configure question routes
app.use('/questions', questionsRoutes);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var e = new Error('Not found error (404)');
  e.status = 404;
  next(e);
});

// Error handler
app.use(function(e, req, res, next) {
  // Set the response status code
  // If the error has no code, set the code to 500 (internal server error)
  res.status(e.status || 500);
  res.json({
    error: {
      message: e.message,
    }
  });
});

// Find the proper port to listen on
var port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
