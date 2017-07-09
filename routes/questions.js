'use strict';

var express = require('express');
var router = express.Router();

// QUESTIONS

// GET /questions
// Return all questions
router.get('/', function(req, res) {
  res.json({
    response: "You sent a GET request for /questions.",
  });
});

// GET /questions/:qID
// Return the question with the passed in id
router.get('/:qID', function(req, res) {
  res.json({
    response: "You sent a GET request for a specific question with ID: " + req.params.qID,
    qID: req.params.qId,
  });
});

// POST /questions
// Route for creating questions
router.post('/', function(req, res) {
  // Return all of the questions
  res.json({
    response: "You sent a POST request.",
    body: req.body,
  });
});

// ANSWERS

// POST /questions/:qID/answers
// Create an answer to a question
router.post('/:qID/answers', function(req, res) {
  res.json({
    response: "You sent a POST request to /answers",
    questionID: req.params.qID,
    body: req.body
  });
});

// PUT /questions/:qID/answers/:aID
// Edit an answer to a question
router.put('/:qID/answers/:aID', function(req, res) {
  res.json({
    response: "You sent a PUT request to /answers",
    answerID: req.params.aID,
    questionID: req.params.qID,
    body: req.body,
  });
});

// DELETE /questions/:qID/answers/:aID
// Delete an answer to a question
router.delete('/:qID/answers/:aID', function(req, res) {
  res.json({
    response: "You sent a DELETE request to /amswers",
    answerID: req.params.aID,
    questionID: req.params.qID,
  });
});

module.exports = router;
