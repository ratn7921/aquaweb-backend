// server/middleware/roleMiddleware.js
exports.requireExpert = (req, res, next) => {
  if (!req.user.roles || !req.user.roles.includes('expert')) {
    return res.status(403).json({ message: 'Expert role required' });
  }
  next();
};
