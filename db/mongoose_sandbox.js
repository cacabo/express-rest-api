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
    size:  String,
    color: {type: String, default: "orange"},
    mass:  {type: Number, default: 5},
    name:  {type: String, default: "Marty"},
  });

  AnimalSchema.pre("save", function(next) {
    if (this.mass >= 100) {
      this.size = "big";
    } else if (this.mass >= 5 && this.mass < 100) {
      this.size = "medium";
    } else {
      this.size = "small";
    }
    next();
  });

  var Animal = mongoose.model('Animal', AnimalSchema);

  var elephant = new Animal({
    type: "elephant",
    color: "gray",
    mass: 6000,
    name: "Lawrence",
  });

  var whale = new Animal({
    type: "whale",
    color: "blue",
    mass: 19500,
    name: "Vinny",
  });

  var goldfish = new Animal({});

  var animalData = [
    {
      type: "mouse",
      color: "gray",
      mass: 1,
      name: "Marvin",
    },
    {
      type: "nutria",
      color: "brown",
      mass: 6.35,
      name: "Gretchen",
    },
    {
      type: "Wolf",
      color: "gray",
      mass: 6.35,
      name: "Iris",
    },
    elephant,
    whale,
    goldfish
  ];

  Animal.remove({}, function(e) {
    if (e) {
      console.error(e);
    }
    Animal.create(animalData, function(e, animals) {
      if (e) {
        console.error(e);
      }
      Animal.find({}, function(e, animals) {
        animals.forEach(function(animal) {
          console.log(animal.name + " the " + animal.color + " " + animal.type + " is a " + animal.size + "-sized animal.");
        });
        db.close(function() {
          console.log("db connection closed");
        });
      });
    });
  });
});
