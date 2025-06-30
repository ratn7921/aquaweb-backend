// controllers/tripController.js
const Trip = require('../models/Trip');
exports.startTrip = async (req, res) => {
  try {
    const trip = await Trip.create({ user: req.user._id, startTime: new Date() });
    res.status(201).json(trip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.endTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(req.params.id, { endTime: new Date() }, { new: true });
    res.json(trip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.updateTripPath = async (req, res) => {
  try {
    const { path } = req.body; // path should be an array of {lat, lng, timestamp}
    const trip = await Trip.findByIdAndUpdate(
      req.params.id,
      { $set: { path } },
      { new: true }
    );
    res.json(trip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getTrips = async (req, res) => {
  try {
    // Find all trips for the authenticated user, populate sightings if needed
    const trips = await Trip.find({ user: req.user._id })
      .populate('sightings')
      .sort({ startTime: -1 });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
