// // routes/sightingRoutes.js
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const { reportSighting, getAllSightings } = require('../controllers/sightingController');
// const protect = require('../middleware/auth');

// // Multer config for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, '../uploads'));
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + '-' + file.originalname);
//   }
// });
// const upload = multer({ storage: storage });

// // POST /api/sightings (with photo upload)
// router.post('/', protect, upload.single('photo'), reportSighting);

// // GET /api/sightings
// router.get('/', getAllSightings);

// module.exports = router;




const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const { reportSighting, getAllSightings } = require('../controllers/sightingController');
const protect = require('../middleware/auth');

// Multer config for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// POST /api/sightings (protected with image upload)
router.post('/', protect, upload.single('photo'), reportSighting);

// GET /api/sightings
router.get('/', getAllSightings);

module.exports = router;
