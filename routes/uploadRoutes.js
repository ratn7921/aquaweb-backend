
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
