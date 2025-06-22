// models/Species.js
const mongoose = require('mongoose');
const SpeciesSchema = new mongoose.Schema({
  name: String,
  scientificName: String,
  description: String,
  imageUrl: String,
  facts: [String]
});
module.exports = mongoose.model('Species', SpeciesSchema);