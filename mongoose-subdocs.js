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


//--------------------------------------------------------------------------------
// Queries
//--------------------------------------------------------------------------------


// 3. Find all the visitors in a system (subdocuments!)





//--------------------------------------------------------------------------------
// 2. All visitors on a planet - 3 strigns (for looped)
// a. Planet Titan instance
// b. Populatating multiple properities - visitors array
// c. visitors.name
Planet.findOne({
   name: "Titan"
}).populate('visitors').exec(function (err, titan) {
   if (err) {
      console.error(err);
   } else {
      let visitorNum = 0;
      for (let index = 0; index < titan.visitors.length; index++) {
         visitorNum++;
         console.log("Titan visitor " + visitorNum + " is " + titan.visitors[index].name);
      }
   }
});


// 2.1. All visitors on a planet - array
Planet.findOne({
   name: "Titan"
}).populate('visitors').exec(function (err, titan) {
   if (err) {
      console.error(err);
   } else {
      console.log("Titan visitors are: " + titan.visitors.map(a => a.name + " "));
   }
});

// 2.1. Notes
// titan = {
//    key1: 1,
//    key2: 2,
//    visitors: []
// }
// var titanVisitors = titan.visitors.map(a => a.name);

// arr = [{
//    key1: 1,
//    bar: 2
// }, {
//    key1: 3,
//    bar: 4
// }, {
//    key1: 5,
//    bar: 6
// }];
// var result = arr.map(a => a.key1);



//--------------------------------------------------------------------------------
// 1.3. Halk Eye first visited planet - with partly sub populating
// Visitor.findOne({
//    name: "Halk Eye"
// }).populate({
//    path: 'visitedPlanets',
//    // populate: {
//    //   path: 'critic'
//    // }
//  }).exec(function (err, halkEye) {
//    if (err) {
//       console.error(err);
//    } else {
//       console.log("Halk Eye's first visited planet is: " + 
//       halkEye.visitedPlanets[0].name);
//    }
// });

// 1.2. Halk Eye first visited planet - no sub populating
// Visitor.findOne({
//    name: "Halk Eye"
// }).populate('visitedPlanets').exec(function (err, halkEye) {
//    if (err) {
//       console.error(err);
//    } else {
//       console.log("Halk Eye's first visited planet is: " + halkEye.visitedPlanets[0].name);
//    }
// });

// 1.1. Halk Eye home planet
// Visitor.findOne({
//    name: "Halk Eye"
// }).populate('homePlanet').exec(function (err, halkEye) {
//    if (err) {
//       console.error(err);
//    } else {
//       console.log("Halk Eye home planet is: " + halkEye.homePlanet.name);
//    }
// });








//--------------------------------------------------------------------------------
/* Saving Instances
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
*/