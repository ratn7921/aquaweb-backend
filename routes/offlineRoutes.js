
// ----------------------------------------
// BACKEND: server/routes/offlineRoutes.js
const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { syncReports } = require('../middleware/offlineSync');
router.post('/sync', protect, syncReports);
module.exports = router;
