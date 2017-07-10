'use strict';

var mongoose = require('mongoose');


// mongoose.connection.on('error', function(){
//   console.log('error connecting to db');
// });

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/sandbox');
// mongoose.connect(process.env.MONGODB_URI);

// var promise = mongoose.connect('mongodb://localhost:27017/sandbox', {
//   useMongoClient: true,
//   /* other options */
// });
//
// promise.then(function(db) {});



var db = mongoose.connection;

db.on('error', function(e) {
  console.error('Connection error:', e);
});

db.once('open', function() {
  console.log('db connection successful');
  // All datbase communication goes here

  var Schema = mongoose.Schema;
  var AnimalSchema = new Schema({
    type: String,
    size: String,
    color: String,
    mass: Number,
    name: String,
  });

  var Animal = mongoose.model('Animal', AnimalSchema);

  var elephant = new Animal({
    type: "elephant",
    size: "big",
    color: "gray",
    mass: 6000,
    name: "Lawrence",
  });

  elephant.save(function(e) {
    if (e) console.error("Save failed:", err);
    else console.log("Saved!");
    db.close(function() {
      console.log("DB connection closed");
    });
  });
});
