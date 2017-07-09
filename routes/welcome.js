'use strict';

var express = require('express');
var router = express.Router();

// GET /
router.get('/', function(req, res) {
  res.json({
    response: "Express is running."
  });
});

module.exports = router;
