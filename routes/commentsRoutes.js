

// // server/routes/commentRoutes.js
// import express from 'express';
// import { list, create } from '../controllers/commentsController.js';
// import protect from '../middleware/auth.js';

// const router = express.Router();

// router.get('/:postId', protect, list);
// router.post('/:postId', protect, create);

// export default router;


const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');
const protect = require('../middleware/auth');

router.get('/:id', protect, commentsController.list);    // GET /api/comments/:id
router.post('/', protect, commentsController.create);    // POST /api/comments

module.exports = router;
