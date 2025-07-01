// // routes/authRoutes.js
// const express = require('express');
// const router = express.Router();
// const { register, login } = require('../controllers/authController');
// const protect = require('../middleware/auth');
// const upload = require('../middleware/upload');

// //router.post('/register', register);
//  router.post('/register', upload.single('avatar'), register);

// router.post('/login', login);
// router.get('/me', protect, require('../controllers/authController').getMe);

// module.exports = router;



// // middleware/upload.js
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // Ensure the uploads directory exists
// const uploadDir = path.join(__dirname, '..', 'uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     const base = path.basename(file.originalname, ext).replace(/\s+/g, '-');
//     cb(null, `${Date.now()}-${base}${ext}`);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|gif/;
//   cb(null, allowedTypes.test(file.mimetype));
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
// });

// module.exports = upload; // ✅ Export raw Multer instance





const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { register, login, getMe } = require('../controllers/authController');
const protect = require('../middleware/auth');

router.post('/register', upload.single('avatar'), register);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;
