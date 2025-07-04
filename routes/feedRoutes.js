// // server/routes/feedRoutes.js
// const express               = require('express');
// const { getFeed, createPost, getPostById } = require('../controllers/feedController');
// const auth                  = require('../middleware/auth');
// const multer                = require('multer');
// const upload                = multer({ dest: './uploads/' });

// const router = express.Router();

// // GET paginated feed
// router.get('/',      auth, getFeed);

// // GET single post
// router.get('/:id',   auth, getPostById);

// // POST new post (with up to 5 media files)
// router.post('/',     auth, upload.array('media', 5), createPost);

// module.exports = router;



// server/routes/feedRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getFeed, createPost, getPostById } = require('../controllers/feedController');
const multer = require('multer');
const path = require('path');

// configure where to store uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename:    (req, file, cb) => {
    // unique filename: timestamp + original
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// GET paginated feed
router.get('/', auth, getFeed);

// POST new post with optional multiple media files
// uses `media` field on form
router.post(
  '/',
  auth,
  upload.array('media', 5),     // up to 5 files
  createPost
);

// Optional single post fetch
router.get('/:id', auth, getPostById);

module.exports = router;
