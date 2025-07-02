


const User = require('../models/User');
const Sighting = require('../models/Sighting');
const Incident = require('../models/Incident');
const Trip = require('../models/Trip');
const Activity = require('../models/Activity');

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('name email role description avatar createdAt');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};
//Cloudinary
// exports.updateUserProfile = async (req, res) => {
//   try {
//     console.log('🧾 req.body:', req.body);
//     console.log('🖼️ req.file:', req.file);

//     const updates = {
//       name: req.body.name,
//       description: req.body.description,
//     };

//     // Use Cloudinary secure URL if file uploaded
//     if (req.file && req.file.path) {
//       updates.avatar = req.file.path; // This will be a full Cloudinary URL
//     }

//     const user = await User.findByIdAndUpdate(
//       req.user._id,
//       { $set: updates },
//       { new: true, runValidators: true, select: 'name email role description avatar createdAt' }
//     );

//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.json(user);
//   } catch (err) {
//     console.error('❌ updateUserProfile error:', err);
//     res.status(500).json({ message: 'Server error: ' + err.message });
//   }
// };



exports.updateUserProfile = async (req, res) => {
  try {
    console.log('🧾 req.body:', req.body);
    console.log('🖼️ req.file:', req.file);

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // 1. Always update text fields
    if (req.body.name)        user.name        = req.body.name;
    if (req.body.description) user.description = req.body.description;

    // 2. Only update avatar if multer saw a real file
    if (req.file && req.file.path) {
      user.avatar = req.file.path; // Full Cloudinary URL
    }

    // 3. Save & return the cleaned object
    const updated = await user.save();
    return res.json({
      name:        updated.name,
      email:       updated.email,
      role:        updated.role,
      description: updated.description,
      avatar:      updated.avatar,
      createdAt:   updated.createdAt
    });
  } catch (err) {
    console.error('❌ updateUserProfile error:', err);
    return res.status(500).json({ message: 'Server error during profile update' });
  }
};

//mongodb
// exports.updateUserProfile = async (req, res) => {
//   try {
//     console.log('🧾 req.body:', req.body);
//     console.log('🖼️ req.file:', req.file);

//     const updates = {
//       name: req.body.name,
//       description: req.body.description,
//     };

//     if (req.file && req.file.path) {
//       updates.avatar = '/' + req.file.path.replace(/\\/g, '/').replace(/^.*\/uploads\//, 'uploads/');
//     }

//     const currentUser = await User.findById(req.user._id);
//     if (!updates.avatar && currentUser) {
//       updates.avatar = currentUser.avatar || '';
//     }

//     const user = await User.findByIdAndUpdate(
//       req.user._id,
//       { $set: updates },
//       { new: true, runValidators: true, select: 'name email role description avatar createdAt' }
//     );

//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.json(user);
//   } catch (err) {
//     console.error('❌ updateUserProfile error:', err);
//     res.status(500).json({ message: 'Server error: ' + err.message });
//   }
// };

exports.getUserActivity = async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.user._id }).sort({ createdAt: -1 });
    console.log('📊 User Activity:', activities);
    res.json(activities);
  } catch (err) {
    console.error('Error fetching activity:', err);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};

exports.registerUser = async (req, res) => {
  try {
    res.json({ message: 'Register user endpoint (placeholder)' });
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};
