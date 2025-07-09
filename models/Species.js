
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
  posts: [  // ✅ define this properly!
    {
      reporter: String,
      count: Number,
      behavior: String,
      location: {
        lat: Number,
        lng: Number
      },
      photoUrl: String,
      createdAt: Date
    }
  ]
});

module.exports = mongoose.model('Species', SpeciesSchema);
