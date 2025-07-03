// ----------------------------------------
// BACKEND: server/routes/likesRoutes.js
const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { toggle } = require('../controllers/likesController');
router.post('/:id', protect, toggle);
module.exports = router;
