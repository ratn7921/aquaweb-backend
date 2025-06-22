// routes/sightingRoutes.js
const express = require('express');
const router = express.Router();
const { createSighting, getAllSightings } = require('../controllers/sightingController');
const protect = require('../middleware/auth');

router.route('/').post(protect, createSighting).get(getAllSightings);

module.exports = router;