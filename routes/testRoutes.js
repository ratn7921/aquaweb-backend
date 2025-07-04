const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');

router.get('/me', protect, (req, res) => {
  console.log('✅ Authenticated user:', req.user);
  res.json({
    message: 'Auth success',
    userId: req.user._id,
    user: req.user
  });
});

module.exports = router;
