// const express = require('express');
// const router = express.Router();
// const upload = require('../middleware/upload');

// router.post('/upload-test', upload, (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: 'No file uploaded!' });
//   }
//   return res.status(200).json({
//     message: 'File uploaded successfully!',
//     file: req.file,
//     body: req.body
//   });
// });

// module.exports = router;


// routes/uploadRoutes.js
// const express = require('express');
// const router = express.Router();
// const upload = require('../middleware/upload');

// router.post('/upload-test', upload.single('avatar'), (req, res) => {
//   console.log('✅ File:', req.file);
//   console.log('✅ Body:', req.body);
//   res.json({
//     message: 'Upload successful',
//     file: req.file,
//     body: req.body
//   });
// });

// module.exports = router; // ✅ This is crucial


const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

router.post('/upload-test', upload.single('avatar'), (req, res) => {
  console.log('✅ File:', req.file);    // ✅ Should already exist
  console.log('✅ Body:', req.body);    // ✅ Should already exist
  res.json({
    message: 'Upload successful',
    file: req.file,
    body: req.body
  });
});


module.exports = router;
