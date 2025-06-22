// controllers/userController.js
exports.getProfile = (req, res) => {
  res.json(req.user);
};