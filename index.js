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
// Configure general routes
app.use(welcomeRoutes);
// Configure question routes
app.use('/questions', questionsRoutes);

// Middleware (this is just for experimentation)
app.use(function(req, res, next) {
  // Call the next middleware function
  next();
});

// Find the proper port to listen on
var port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
