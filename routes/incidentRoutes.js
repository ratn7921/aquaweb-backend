// routes/incidentRoutes.js
const express = require('express');
const router = express.Router();
const { reportIncident } = require('../controllers/incidentController');
const protect = require('../middleware/auth');

router.post('/', protect, reportIncident);

module.exports = router;