// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const protect = require('../middleware/auth');
const upload = require('../middleware/upload');

//router.post('/register', register);
 router.post('/register', upload.single('avatar'), register);

router.post('/login', login);
router.get('/me', protect, require('../controllers/authController').getMe);

module.exports = router;