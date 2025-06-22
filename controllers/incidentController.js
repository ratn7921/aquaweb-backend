// controllers/incidentController.js
const Incident = require('../models/Incident');
exports.reportIncident = async (req, res) => {
  try {
    const incident = await Incident.create({ ...req.body, reporter: req.user._id });
    res.status(201).json(incident);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};