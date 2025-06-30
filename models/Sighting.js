const mongoose = require('mongoose');

const SightingSchema = new mongoose.Schema({
  species: { type: String, required: true },
  count: { type: Number, required: true },
  behavior: String,
  photoUrl: String,
  location: {
    lat: Number,
    lng: Number
  },
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true }); // <-- Add this line

module.exports = mongoose.model('Sighting', SightingSchema);
