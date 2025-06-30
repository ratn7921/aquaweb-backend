// models/Incident.js
const mongoose = require('mongoose');
const IncidentSchema = new mongoose.Schema({
  type: { type: String, required: true },
  description: { type: String, required: true },
  photoUrl: String,
  location: {
    lat: Number,
    lng: Number
  },
  shipName: String,
  shipNumber: String,
  shipImageUrl: String,
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Added reporter field
});

// Prevent model overwrite upon hot-reload or repeated import
module.exports = mongoose.models.Incident || mongoose.model('Incident', IncidentSchema);