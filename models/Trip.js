// models/Trip.js
const mongoose = require('mongoose');
const TripSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  path: [{ lat: Number, lng: Number, timestamp: Date }],
  sightings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sighting' }],
  startTime: Date,
  endTime: Date,
  totalDistance: Number
});
module.exports = mongoose.model('Trip', TripSchema);