// routes/tripRoutes.js
const express = require('express');
const router = express.Router();
const { getTrips, startTrip, endTrip, updateTripPath } = require('../controllers/tripController');
const protect = require('../middleware/auth');

router.get('/', protect, getTrips); // <-- Add this line
router.post('/start', protect, startTrip);
router.put('/end/:id', protect, endTrip);
router.put('/:id/path', protect, updateTripPath);

module.exports = router;