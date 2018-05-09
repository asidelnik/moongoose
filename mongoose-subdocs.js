// Ex. Final - Books -----------------------------------
//Requiring & Connecting mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/solarSystemDB');
var Schema = mongoose.Schema;



// Solarsystem schema
var solarsystemSchema = new mongoose.Schema({
   Planets: [{
      type: Schema.Types.ObjectId,
      ref: 'Planet'
   }],
   starName: String
})
var Solarsystem = mongoose.model("solarsystem", solarsystemSchema);



var PlanetSchema = new mongoose.Schema({
   name: String,
   system: {
      type: Schema.Types.ObjectId,
      ref: 'system'
   },
   visitors: [{
      type: Schema.Types.ObjectId,
      ref: 'visitor'
   }]
})
var Planet = mongoose.model("Planet", PlanetSchema);


var visitorSchema = new mongoose.Schema({
   name: String,
   homePlanet: {
      type: Schema.Types.ObjectId,
      ref: 'homePlanet'
   },
   visitedPlanets: [{
      type: Schema.Types.ObjectId,
      ref: 'visitedPlanets'
   }]
})
var Visitor = mongoose.model("visitor", visitorSchema);



// Instances
var milkyWay = new Solarsystem({
   Planets: [earth, asgard],
   starName: "Milky Way"
});
var outerMilkyWay = new Solarsystem({
   Planets: [titan],
   starName: "Outer Milky Way"
});


var earth = new Planet({
   name: "Earth",
   system: milkyWay,
   visitors: ironMan
});
var titan = new Planet({
   name: "Titan",
   system: outerMilkyWay,
   visitors: ironMan
});
var asgard = new Planet({
   name: "Asgard",
   system: milkyWay,
   visitors: ironMan
});



var ironMan = new Visitor({
   name: "Iron Man",
   homePlanet: earth,
   visitedPlanets: [titan, asgard]
});
var thanos = new Visitor({
   name: "Thanos",
   homePlanet: titan,
   visitedPlanets: []
});
var thor = new Visitor({
   name: "Thor",
   homePlanet: asgard,
   visitedPlanets: [earth]
});
var halkEye = new Visitor({
   name: "Halk Eye",
   homePlanet: earth,
   visitedPlanets: []
});


milkyWay.save();  outerMilkyWay.save();
earth.save();  titan.save();  asgard.save();
ironMan.save();  thanos.save();  thor.save();  

halkEye.visitedPlanets.push(titan, asgard);
// halkEye.visitedPlanets.push(titan, asgard);
// halkEye.visitedPlanets.push(titan, asgard);
halkEye.save();

Solarsystem.reviews.push(Planet);

// Visitor.save();
// Solarsystem.save();