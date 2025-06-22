// controllers/sightingController.js
const Sighting = require('../models/Sighting');
exports.createSighting = async (req, res) => {
  try {
    const sighting = await Sighting.create({ ...req.body, reporter: req.user._id });
    res.status(201).json(sighting);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getAllSightings = async (req, res) => {
  try {
    const sightings = await Sighting.find().populate('reporter', 'name');
    res.json(sightings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
