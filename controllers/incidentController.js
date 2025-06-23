// controllers/incidentController.js
const Incident = require('../models/Incident');
exports.reportIncident = async (req, res) => {
  const { type, description, location } = req.body;
  if (!type || !description || !location) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const incident = await Incident.create({ ...req.body, reporter: req.user._id });
    res.status(201).json(incident);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};