// models/Sighting.js
const mongoose = require('mongoose');
const SightingSchema = new mongoose.Schema({
  species: { type: String, required: true },
  count: { type: Number, required: true },
  behavior: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  photoUrl: String,
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Sighting', SightingSchema);