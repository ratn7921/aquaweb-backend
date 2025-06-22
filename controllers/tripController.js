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
