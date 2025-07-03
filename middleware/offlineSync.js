// ----------------------------------------
// BACKEND: server/middleware/offlineSync.js
exports.syncReports = async (req, res) => {
  const reports = req.body;
  // assume same structure as /report-sighting
  const Sighting = require('../models/Sighting');
  const created = await Sighting.insertMany(reports.map(r=>({ ...r, user: req.user._id })));
  res.json(created);
};