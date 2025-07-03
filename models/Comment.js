
// ----------------------------------------
// BACKEND: server/models/Comment.js
const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema({ report: mongoose.ObjectId, user: { type: mongoose.ObjectId, ref: 'User' }, text: String }, { timestamps: true });
module.exports = mongoose.model('Comment', CommentSchema);
