
// //testing version
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // Ensure upload directory exists
// const uploadDir = path.join(__dirname, '..', 'uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     const base = path.basename(file.originalname, ext).replace(/\s+/g, '-');
//     cb(null, `${Date.now()}-${base}${ext}`);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|gif/;
//   cb(null, allowedTypes.test(file.mimetype));
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 } // 5 MB
// });

// module.exports = upload;


// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'avatars',
//     allowed_formats: ['jpg', 'jpeg', 'png'],
//     transformation: [{ width: 300, height: 300, crop: 'fill' }],
//   },
// });

// const upload = multer({ storage });

// module.exports = upload;

// server/middleware/upload.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'avatars',
    allowed_formats: ['jpg','jpeg','png'],
    transformation: [{ width: 300, height: 300, crop: 'fill' }],
  },
});

const upload = multer({ storage });
module.exports = upload;
