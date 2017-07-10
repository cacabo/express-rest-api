'use strict';

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/sandbox');

var db = mongoose.connection;

db.on('error', function(e) {
  console.error('Connection error:', e);
});

db.once('open', function() {
  console.log('db connection successful');
  // All database communication goes here

  var Schema = mongoose.Schema;
  var AnimalSchema = new Schema({
    type:  {type: String, default: "goldfish"},
    size:  {type: String, default: "small"},
    color: {type: String, default: "orange"},
    mass:  {type: Number, default: 5},
    name:  {type: String, default: "Marty"},
  });

  var Animal = mongoose.model('Animal', AnimalSchema);

  var elephant = new Animal({
    type: "elephant",
    size: "big",
    color: "gray",
    mass: 6000,
    name: "Lawrence",
  });

  var whale = new Animal({
    type: "whale",
    size: "big",
    color: "blue",
    mass: 19500,
    name: "Vinny",
  });

  var goldfish = new Animal({});

  Animal.remove({}, function(e) {
    if (e) {
      console.error(e);
    }
    elephant.save(function(e) {
      if (e) {
        console.error("Save failed:", e);
      }
      goldfish.save(function(e) {
        if (e) {
          console.error("Save failed:", e);
        }
        whale.save(function(e) {
          if (e) {
            console.error(e);
          }
          Animal.find({size: "big"}, function(e, animals) {
            animals.forEach(function(animal) {
              console.log(animal.name + " the " + animal.color + " " + animal.type);
            });
            db.close(function() {
              console.log("db connection closed");
            });
          });
        });
      });
    });
  });


});
