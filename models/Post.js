
// import mongoose from 'mongoose';

// const postSchema = new mongoose.Schema({
//   caption: {
//     type: String,
//     required: true,
//   },
//   media: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Media',
//     required: true,
//   }],
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export default mongoose.model('Post', postSchema);
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
  },
  media: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Media',
      required: true,
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Post', postSchema);
