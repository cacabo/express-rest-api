'use strict';

var express = require('express');
var router = express.Router();

// GET /questions
// Return all of the questions
router.get('/', function(req, res) {
  res.json({
    response: "You sent a GET request."
  });
});

// GET /questions/:id
// Return the question with the passed in id
router.get('/:id', function(req, res) {
  res.json({
    response: "You sent a GET request for a specific question with ID: " + req.params.id
  });
});

// POST /questions
// Route for creating questions
router.post('/', function(req, res) {
  // Return all of the questions
  res.json({
    response: "You sent a POST request.",
    body: req.body
  });
});

module.exports = router;
