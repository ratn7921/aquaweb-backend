// routes/tripRoutes.js
const express = require('express');
const router = express.Router();
const { startTrip, endTrip } = require('../controllers/tripController');
const protect = require('../middleware/auth');

router.post('/start', protect, startTrip);
router.put('/end/:id', protect, endTrip);

module.exports = router;