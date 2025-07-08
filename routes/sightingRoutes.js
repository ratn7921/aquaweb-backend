

// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');

// const { reportSighting, getAllSightings } = require('../controllers/sightingController');
// const protect = require('../middleware/auth');

// // ✅ Configure Multer for photo uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, '../uploads'));
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + '-' + file.originalname.replace(/\s+/g, '_'));
//   }
// });
// const upload = multer({ storage });

// // ✅ POST /api/sightings — Report a sighting (with optional photo)
// router.post('/', protect, upload.single('photo'), reportSighting);

// // ✅ GET /api/sightings — Fetch all sightings
// router.get('/', getAllSightings);

// module.exports = router;



// ------------------ routes/sightingRoutes.js ------------------
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { reportSighting, getAllSightings } = require('../controllers/sightingController');
const protect = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname.replace(/\s+/g, '_'));
  }
});
const upload = multer({ storage });

router.post('/', protect, upload.single('photo'), reportSighting);
router.get('/', getAllSightings);

module.exports = router;