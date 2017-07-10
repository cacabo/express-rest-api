'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var sortAnswers = function(a, b) {
  // Return a negative number if a should appear before b
  if (a.votes === b.votes) {
    return b.updatedAt - a.updatedAt;
  }
  return b.votes - a.votes;
}

var AnswerSchema = new Schema({
  title: String,
  text: String;
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  votes: {type, Number, default: 0},
});


// Instance method for updating an answer
AnswerSchema.methods("update", function(updates, callback) {
  Object.assign(this, updates, {updatedAt: new Date()});
  this.parent().save(callback);
});

// Instance method for upvoting or downvoting an answer
AnswerSchema.methods("vote", function(vote, callback) {
  if (vote === "upvote") {
    this.votes += 1;
  } else {
    this.votes -= 1;
  }
  this.parent().save(callback);
});

var QuestionSchema = new Schema({
  title: String,
  text: String,
  createdAt: {type: Date, default: Date.now},
  answers: [AnswerSchema],
});

QuestionSchema.pre("save", function(next) {
  this.answers.sort(sortAnswers);
  next();
});

var Question = mongoose.model("Question", QuestionSchema);

module.exports.Question = Question;
