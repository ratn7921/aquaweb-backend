//not part of main Application 

// ----------------------------------------
// BACKEND: server/controllers/likesController.js
const Like = require('../models/Like');
exports.toggle = async (req, res) => {
  const exists = await Like.findOne({ report: req.params.id, user: req.user._id });
  if (exists) { await exists.remove(); return res.json({ liked: false }); }
  await Like.create({ report: req.params.id, user: req.user._id });
  res.json({ liked: true });
};