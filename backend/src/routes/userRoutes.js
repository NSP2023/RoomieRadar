// backend/src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// =======================
// Middleware to protect routes using JWT
// =======================
const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Format: "Bearer <token>"
  if (!token) return res.status(401).json({ message: 'Not authorized, no token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // Attach user ID to request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token invalid' });
  }
};

// =======================
// POST /api/users/signup
// Register a new user
// =======================
router.post('/signup', async (req, res) => {
  const { name, email, password, lifestyle } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ name, email, password, lifestyle });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email, lifestyle: user.lifestyle },
      token,
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// =======================
// POST /api/users/login
// Authenticate user & return JWT
// =======================
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      user: { id: user._id, name: user.name, email: user.email, lifestyle: user.lifestyle },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// =======================
// GET /api/users/profile
// Get logged-in user's profile
// =======================
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// =======================
// PUT /api/users/profile
// Update logged-in user's lifestyle answers or name
// =======================
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { lifestyle, name } = req.body;

    if (lifestyle) user.lifestyle = { ...user.lifestyle, ...lifestyle };
    if (name) user.name = name;

    await user.save();

    res.status(200).json({
      user: { id: user._id, name: user.name, email: user.email, lifestyle: user.lifestyle },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
