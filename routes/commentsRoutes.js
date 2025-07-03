// ----------------------------------------
// BACKEND: server/routes/commentsRoutes.js
const express = require('express');
const { list, create } = require('../controllers/commentsController');
const protect = require('../middleware/auth');
const router = express.Router();
router.get('/:id', protect, list);
router.post('/:id', protect, create);
module.exports = router;
