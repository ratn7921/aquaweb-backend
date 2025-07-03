// ----------------------------------------
// BACKEND: server/routes/mediaRoutes.js
const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { upload: uploadCtrl, list } = require('../controllers/mediaController');
router.post('/', protect, upload.single('media'), uploadCtrl);
router.get('/', protect, list);
module.exports = router;