// ----------------------------------------
// BACKEND: server/controllers/mediaController.js
const Media = require('../models/Media');
const cloudinary = require('../config/cloudinary');
exports.upload = async (req, res) => {
  const file = req.file.path;
  const result = await cloudinary.uploader.upload(file, { resource_type: 'auto' });
  const media = await Media.create({ user: req.user._id, url: result.secure_url, type: result.resource_type });
  res.json(media);
};
exports.list = (req, res) => Media.find().sort('-createdAt').then(r=>res.json(r));
