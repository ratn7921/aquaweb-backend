// // server/models/Post.js
// const { Schema, model, Types } = require('mongoose');

// const PostSchema = new Schema({
//   author:    { type: Types.ObjectId, ref: 'User', required: true },
//   type:      { type: String, enum: ['sighting','incident','trip','custom'], required: true },
//   refId:     { type: Types.ObjectId, required: function(){ return this.type !== 'custom'; } },
//   text:      { type: String },
//   media:     [{ type: Types.ObjectId, ref: 'Media' }],
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = model('Post', PostSchema);


import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
  },
  media: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media',
    required: true,
  }],
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

export default mongoose.model('Post', postSchema);
