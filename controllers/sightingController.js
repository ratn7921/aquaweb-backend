// controllers/sightingController.js
const Sighting = require('../models/Sighting');
exports.createSighting = async (req, res) => {
  const { species, count, behavior, location, photoUrl } = req.body;
  if (!species || !count || !behavior || !location) {
    return res.status(400).json({ message: 'All fields are required' });
  }
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
