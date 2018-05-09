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
      ref: 'solarsystem'
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
      ref: 'Planet'
   },
   visitedPlanets: [{
      type: Schema.Types.ObjectId,
      ref: 'Planet'
   }]
})
var Visitor = mongoose.model("visitor", visitorSchema);








// Instances -----------------------------------
// Solar Systems
var milkyWay = new Solarsystem({
   Planets: [],
   starName: "Milky Way"
});
var outerMilkyWay = new Solarsystem({
   Planets: [],
   starName: "Outer Milky Way"
});

// Planets
var earth = new Planet({
   name: "Earth",
   system: milkyWay,
   visitors: []
});
var titan = new Planet({
   name: "Titan",
   system: outerMilkyWay,
   visitors: []
});
var asgard = new Planet({
   name: "Asgard",
   system: milkyWay,
   visitors: []
});

// Visitors
var halkEye = new Visitor({
   name: "Halk Eye",
   homePlanet: earth,
   visitedPlanets: []
});
var ironMan = new Visitor({
   name: "Iron Man",
   homePlanet: earth,
   visitedPlanets: [titan, asgard]
});
var thor = new Visitor({
   name: "Thor",
   homePlanet: asgard,
   visitedPlanets: [earth]
});




// Saving Instances -----------------------------------
// milkyWay.save();
// outerMilkyWay.save();
// earth.save();
// titan.save();
// asgard.save();

// // Pushing instance ids into other instances arrays
// halkEye.visitedPlanets.push(titan, asgard);
// halkEye.save();

// ironMan.visitedPlanets.push(earth, titan);
// ironMan.save();

// thor.visitedPlanets.push(earth, asgard);
// thor.save();


// asgard.visitors.push(halkEye, ironMan, thor);
// titan.visitors.push(halkEye, thor, ironMan);
// earth.visitors.push(halkEye, ironMan, thor);


// milkyWay.Planets.push(earth, asgard);
// outerMilkyWay.Planets.push(titan);

// Queries
Visitor.findOne({
   name: "Iron Man"
}).exec(function (err, homePlanet) {
   console.log(err)
   console.log('----------populated home planet------------')
   console.log(homePlanet);
   console.log('-------------------------------------------')

});