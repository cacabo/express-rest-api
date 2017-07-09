'use strict';

var express = require("express");
var app = express();
var jsonParser = require('body-parser').json;

app.use(jsonParser());

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
