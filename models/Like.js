// ----------------------------------------
// BACKEND: server/models/Like.js
const mongoose = require('mongoose');
const LikeSchema = new mongoose.Schema({ report: mongoose.ObjectId, user: { type: mongoose.ObjectId, ref: 'User' } }, { timestamps: true });
module.exports = mongoose.model('Like', LikeSchema);
