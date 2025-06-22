
// models/User.js
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['tourist', 'expert', 'admin'], default: 'tourist' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('User', UserSchema);