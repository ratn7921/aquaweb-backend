

const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');
const protect = require('../middleware/auth');

router.get('/:id', protect, commentsController.list);    // GET /api/comments/:id
router.post('/', protect, commentsController.create);    // POST /api/comments

module.exports = router;
