// import express from 'express';
// import {
//   updateUserProfile,
//   getUserProfile,
// } from '../controllers/userController.js';
// import { protect } from '../middleware/auth.js'; // Assuming you have auth middleware
// import upload from '../middleware/upload.js';

// const router = express.Router();

// // GET /api/users/me - Get user profile
// router.get('/me', protect, getUserProfile);

// // POST /api/users/me/update - Update user profile (including avatar)
// router.post('/me/update', protect, upload.single('avatar'), updateUserProfile);

// export default router;



const express = require('express');
const router = express.Router();
const { updateUserProfile, getUserProfile, registerUser, getUserActivity // ✅ Add this
} = require('../controllers/userController');
const upload = require('../middleware/upload'); // ✅ correct
const protect = require('../middleware/auth');

router.post('/register', registerUser);
router.get('/me', protect, getUserProfile);
router.post('/me/update', protect, upload.single('avatar'), updateUserProfile);
router.get('/activity', protect, getUserActivity);

module.exports = router;
