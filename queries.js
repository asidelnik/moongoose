//Requiring & Connecting mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/solarSystemDB');
var Schema = mongoose.Schema;


Visitor.findOne({
   name: "Iron Man"
}).populate('homePlanet').exec(function (err, planet) {
   console.log(homePlanet);
});