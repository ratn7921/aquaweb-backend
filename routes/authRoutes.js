


const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { register, login, getMe } = require('../controllers/authController');
const protect = require('../middleware/auth');

router.post('/register', upload.single('avatar'), register);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;
