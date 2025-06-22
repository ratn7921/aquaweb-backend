// models/Sighting.js
const mongoose = require('mongoose');
const SightingSchema = new mongoose.Schema({
  species: String,
  count: Number,
  behavior: String,
  location: {
    lat: Number,
    lng: Number
  },
  photoUrl: String,
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Sighting', SightingSchema);