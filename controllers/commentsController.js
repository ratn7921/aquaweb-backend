// ----------------------------------------
// BACKEND: server/controllers/commentsController.js
const Comment = require('../models/Comment');
exports.list = (req, res) => Comment.find({ report: req.params.id }).populate('user','name').then(r=>res.json(r));
exports.create = (req, res) => Comment.create({ report: req.params.id, user: req.user._id, text: req.body.text }).then(r=>res.json(r));
