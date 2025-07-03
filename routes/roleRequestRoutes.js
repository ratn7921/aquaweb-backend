// server/routes/roleRequestRoutes.js
const express = require('express');
const { submitRequest, listRequests, updateStatus } = require('../controllers/roleRequestController');
const protect = require('../middleware/auth');
const { requireExpert } = require('../middleware/roleMiddleware');
const router = express.Router();

// any authenticated user can request
router.post('/me', protect, submitRequest);

// list & approve only for experts/admins
router.get('/', protect, requireExpert, listRequests);
router.patch('/:id', protect, requireExpert, updateStatus);

module.exports = router;
