// models/User.js
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['tourist', 'expert', 'admin'], default: 'tourist' },
  description: { type: String, default: '' },
 // avatar: { type: String, default: 'avatar' }, // URL or path to image
 avatar: { type: String, default: '/default-avatar.png' }, 
 createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('User', UserSchema);