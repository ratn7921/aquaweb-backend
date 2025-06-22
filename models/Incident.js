// models/Incident.js
const mongoose = require('mongoose');
const IncidentSchema = new mongoose.Schema({
  type: { type: String, enum: ['pollution', 'injured_animal', 'dead_animal'] },
  description: String,
  photoUrl: String,
  location: {
    lat: Number,
    lng: Number
  },
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Incident', IncidentSchema);