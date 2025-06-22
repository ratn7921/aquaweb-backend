// controllers/speciesController.js
const Species = require('../models/Species');
exports.getAllSpecies = async (req, res) => {
  try {
    const species = await Species.find();
    res.json(species);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};