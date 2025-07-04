// // ----------------------------------------
// // BACKEND: server/models/Media.js
// const mongoose = require('mongoose');
// const MediaSchema = new mongoose.Schema({ user: { type: mongoose.ObjectId, ref: 'User' }, url: String, type: String }, { timestamps: true });
// module.exports = mongoose.model('Media', MediaSchema);
// // ----------------------------------------
// // BACKEND: server/models/Media.js
// // This file defines the Media model for storing media files in MongoDB.
// // It uses Mongoose to create a schema with fields for user reference, media URL, and type.
// // The model includes timestamps for creation and updates.'
// // The Media model is exported for use in other parts of the application, such as controllers or services.



const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    type: {
      type: String, // e.g., "image", "video"
      required: true,
      enum: ['image', 'video', 'other'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Media', mediaSchema);
