'use strict';

var express = require('express');
var router = express.Router();
var Question = require("../db/models").Question;

router.param("qID", function(req, res, next, id) {
    Question.findById(id, function(e, question) {
        if (e) return next(e);
        if (!question) {
            e = new Error("Not found (404)");
            e.status = 404;
            return next(e);
        }
        req.question = question;
        return next();
    });
});

router.param("aID", function(req, res, next, id) {
    req.answer = req.question.answers.id(id);
    if (!req.answer) {
        e = new Error("Not found (404)");
        e.status = 404;
        return next(e);
    }
    next();
});

// QUESTIONS

// GET /questions
// Return all questions
router.get('/', function(req, res, next) {
    Question.find({})
        .sort({createdAt: -1})
        .exec(function(err, questions){
          if(err) return next(err);
          res.json(questions);
        });
});

// POST /questions
// Route for creating questions
router.post('/', function(req, res, next) {
    var question = new Question(req.body);
    question.save(function(e, question) {
        if (e) return next(e);
        res.status(201);
        res.json(question);
    });
});

// GET /questions/:qID
// Return the question with the passed in id
router.get('/:qID', function(req, res) {
    res.json(req.question);
});

// ANSWERS

// POST /questions/:qID/answers
// Create an answer to a question
router.post('/:qID/answers', function(req, res, next) {
    req.question.answers.push(req.body);
    req.question.save(function(e, question) {
        if (e) return next(e);
        res.status(201);
        res.json(question);
    });
});

// PUT /questions/:qID/answers/:aID
// Edit an answer to a question
router.put('/:qID/answers/:aID', function(req, res) {
    req.answer.update(req.body, function(e, result) {
        if (e) return next(e);
        res.json(result);
    });
});

// DELETE /questions/:qID/answers/:aID
// Delete an answer to a question
router.delete('/:qID/answers/:aID', function(req, res) {
    req.answer.remove(function(e) {
        req.question.save(function(e, question) {
            if (e) return next(e);
            res.json(question);
        });
    });
});

// UPVOTE AND DOWNVOTE

// POST /questions/:qID/answers/:aID/upvote
// POST /questinos/:qID/answerrs/:aID/downvote
router.post("/:qID/answers/:aID/:dir",
function(req, res, next) {
    if (req.params.dir.search(/^(upvote|downvote)$/) === -1) {
        var e = new Error("Not found error (404)");
        e.status = 404;
        next(e);
    } else {
        req.vote = req.params.dir;
        next();
    }
},
function(req, res, next) {
    req.answer.vote(req.vote, function(e, question) {
        if (e) return next(e);
        res.json(question);
    });
});

module.exports = router;
