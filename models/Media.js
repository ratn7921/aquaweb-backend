//not part of main Application 


const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String, // 'image' or 'video'
    enum: ['image', 'video'],
    required: true,
  },
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

module.exports = mongoose.model('Media', mediaSchema);
