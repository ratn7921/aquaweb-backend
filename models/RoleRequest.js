// server/models/RoleRequest.js
const mongoose = require('mongoose');

const RoleRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  documents: [String],    // e.g. URLs to uploaded proof
  status: {
    type: String,
    enum: ['pending','approved','rejected'],
    default: 'pending'
  },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RoleRequest', RoleRequestSchema);
