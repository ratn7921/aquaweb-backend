
// import mongoose from 'mongoose';

// const commentSchema = new mongoose.Schema({
//   content: {
//     type: String,
//     required: true,
//   },
//   report: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Report', // make sure 'Report' is the correct model name
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
// });

// export default mongoose.model('Comment', commentSchema);


const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);
