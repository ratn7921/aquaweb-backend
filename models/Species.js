// //old models/Species.js
// const mongoose = require('mongoose');
// const SpeciesSchema = new mongoose.Schema({
//   name: String,
//   scientificName: String,
//   description: String,
//   imageUrl: String,
//   facts: [String]
// });
// module.exports = mongoose.model('Species', SpeciesSchema);


// new models/Species.js
const mongoose = require('mongoose');

const SpeciesSchema = new mongoose.Schema({
  name: String,
  scientificName: String,
  imageUrl: String,
  description: String,
  rank: String,
  habitat: String,
  facts: [String],
  _source: String,
  sightings: [
    {
      reporterName: String,
      location: {
        lat: Number,
        lng: Number
      },
      createdAt: Date
    }
  ]
});

module.exports = mongoose.model('Species', SpeciesSchema);
// This schema defines the structure of the Species documents in MongoDB.
// It includes fields for the species name, scientific name, image URL, description,  
// rank, habitat, facts, source, and an array of sightings.
// Each sighting includes the reporter's name, location (latitude and longitude), and the date of the sighting.
// The schema is then exported as a Mongoose model named 'Species' for use in the application.
// This allows for easy interaction with the MongoDB database, enabling operations like creating, reading, updating, and deleting species records.
// The Species model can be used to interact with the species collection in the MongoDB database.
// The Species model can be used to interact with the species collection in the MongoDB database.
// The Species model can be used to interact with the species collection in the MongoDB database.
// The Species model can be used to interact with the species collection in the MongoDB database.
// The Species model can be used to interact with the species collection in the MongoDB database.
// The Species model can be used to interact with the species collection in the MongoDB database.