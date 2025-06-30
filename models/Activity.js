const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['sighting', 'incident', 'trip'], required: true },
  species: String, // for sightings
  incidentType: String, // for incidents
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }, // optional
  photoUrl: String,
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);
