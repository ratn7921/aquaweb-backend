// server/controllers/roleRequestController.js
const RoleRequest = require('../models/RoleRequest');
const User = require('../models/User');

exports.submitRequest = async (req, res, next) => {
  const { documents } = req.body;
  const existing = await RoleRequest.findOne({ user: req.user.id, status: 'pending' });
  if (existing) return res.status(400).json({ message: 'You already have a pending request.' });

  const reqDoc = await RoleRequest.create({
    user: req.user.id,
    documents
  });
  res.status(201).json(reqDoc);
};

exports.listRequests = async (req, res, next) => {
  // Admin / expert-only
  const all = await RoleRequest.find().populate('user','name email');
  res.json(all);
};

exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'approved' or 'rejected'
  const roleReq = await RoleRequest.findByIdAndUpdate(id, { status }, { new: true });
  
  if (status === 'approved') {
    await User.findByIdAndUpdate(roleReq.user, { $addToSet: { roles: 'expert' } });
  }
  res.json(roleReq);
};
