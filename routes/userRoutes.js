


const express = require('express');
const router = express.Router();
const { updateUserProfile, getUserProfile, registerUser, getUserActivity // ✅ Add this
} = require('../controllers/userController');
const upload = require('../middleware/upload'); // ✅ correct
const protect = require('../middleware/auth');

router.post('/register', registerUser);
router.get('/me', protect, getUserProfile);
// router.post('/me/update', protect, upload.single('avatar'), updateUserProfile);
router.post(
  '/me/update',
  protect,
  upload.single('avatar'), // <-- this is crucial
  (req, res, next) => {
    console.log('📦 Multer middleware triggered');
    next();
  },
  updateUserProfile
);

router.get('/activity', protect, getUserActivity);

module.exports = router;
