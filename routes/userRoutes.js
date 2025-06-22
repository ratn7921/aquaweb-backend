// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getProfile } = require('../controllers/userController');
const protect = require('../middleware/auth');

router.get('/me', protect, getProfile);

module.exports = router;