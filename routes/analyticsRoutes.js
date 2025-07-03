// ----------------------------------------
// BACKEND: server/routes/analyticsRoutes.js
const express = require('express');
const { trends, heatmap } = require('../controllers/analyticsController');
const protect = require('../middleware/auth');
const router = express.Router();
router.get('/trends', protect, trends);
router.get('/heatmap', protect, heatmap);
module.exports = router;
