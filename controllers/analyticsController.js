// ----------------------------------------
// BACKEND: server/controllers/analyticsController.js
const Sighting = require('../models/Sighting');
exports.trends = async (req, res) => {
  const data = await Sighting.aggregate([{ $group: { _id: '$species', count: { $sum: 1 } } }]);
  res.json(data);
};
exports.heatmap = async (req, res) => {
  const data = await Sighting.find().select('location');
  res.json(data);
};
