


// const User = require('../models/User');
// const Sighting = require('../models/Sighting');
// const Incident = require('../models/Incident');
// const Trip = require('../models/Trip');
// const Activity = require('../models/Activity');

// exports.getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select('name email role description avatar createdAt');
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error: ' + err.message });
//   }
// };

// exports.updateUserProfile = async (req, res) => {
//   console.log('🧾 req.body:', req.body);
// console.log('🖼️ req.file:', req.file); // <--- this should print file info

//   try {
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


// exports.getUserActivity = async (req, res) => {
//   try {
//     const activities = await Activity.find({ user: req.user._id })
//       .sort({ timestamp: -1 }) // sorted by user action time
//       .lean();

//     res.json(activities);
//   } catch (err) {
//     console.error('Error fetching activity:', err);
//     res.status(500).json({ message: 'Server error: ' + err.message });
//   }
// };





// exports.updateUserProfile = async (req, res) => {
//   try {
// console.log('✅ Uploaded file:', req.file);


//     const updates = {
//       name: req.body.name,
//       description: req.body.description,
      
//     };

//     // ✅ Fix path once and properly
//     if (req.file && req.file.path) {
//       updates.avatar = '/' + req.file.path.replace(/\\/g, '/').replace(/^.*\/uploads\//, 'uploads/');
//     }

//     // ✅ Retain existing avatar if new one is not uploaded
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
//     console.error('Error in updateUserProfile:', err);
//     res.status(500).json({ message: 'Server error: ' + err.message });
//   }
// };




// exports.getUserActivity = async (req, res) => {
//   try {
//     const activities = await Activity.find({ user: req.user._id }).sort({ createdAt: -1 });
//     console.log('User Activity:', activities); // 👈 Add this
//     res.json(activities);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };



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

exports.updateUserProfile = async (req, res) => {
  try {
    console.log('🧾 req.body:', req.body);
    console.log('🖼️ req.file:', req.file);

    const updates = {
      name: req.body.name,
      description: req.body.description,
    };

    if (req.file && req.file.path) {
      updates.avatar = '/' + req.file.path.replace(/\\/g, '/').replace(/^.*\/uploads\//, 'uploads/');
    }

    const currentUser = await User.findById(req.user._id);
    if (!updates.avatar && currentUser) {
      updates.avatar = currentUser.avatar || '';
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true, select: 'name email role description avatar createdAt' }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('❌ updateUserProfile error:', err);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};

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
