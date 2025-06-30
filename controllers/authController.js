// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

exports.register = async (req, res) => {
  console.log('📝 [register] req.headers.Content-Type:', req.headers['content-type']);
  console.log('📝 [register] req.body:', req.body);
  console.log('📝 [register] req.file:', req.file);
  
  const { name, email, password, role } = req.body;
 // if (!name || !email || !password || !role) {
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
//const user = await User.create({ name, email, password: hashedPassword, role });
    
 const avatarPath = req.file
     ? `/uploads/${req.file.filename}`
     : undefined;

   const user = await User.create({
     name,
     email,
     password: hashedPassword,
     role,
     ...(avatarPath && { avatar: avatarPath })
   });
    
    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      token: generateToken(user._id)
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Return user object and token
    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: generateToken(user._id)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMe = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Not authorized' });
  res.json(req.user);
};
