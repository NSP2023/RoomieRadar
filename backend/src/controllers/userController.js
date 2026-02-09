// backend/src/controllers/userController.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');

/**
 * Generate JWT token
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

/**
 * POST /api/users/register
 * Register a new user
 * Body: { name, email, password }
 */
const registerUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create user
    const user = await User.create({ name, email, password });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        preferences: user.preferences,
        personality: user.personality,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * POST /api/users/login
 * Login user
 * Body: { email, password }
 */
const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    //compare password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        preferences: user.preferences,
        personality: user.personality,
        avatar: user.avatar,
        bio: user.bio,
        location: user.location,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * GET /api/users/:id
 * Get user details
 */
const getUserController = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({
      id: user._id,
        name: user.name,
        email: user.email,
        preferences: user.preferences,
        personality: user.personality,
        avatar: user.avatar,
        bio: user.bio,
        location: user.location,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * PUT /api/users/:id/lifestyle
 * Update lifestyle answers
 * Body: { lifestyle }
 */
const updateUserPreferencesController = async (req, res) => {
  try {
    
    const { preferences} = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    // Update lifestyle answers
    user.preferences = { ...user.preferences, ...preferences };
    
    await user.save();

    res.status(200).json({
      message: 'Preferences updated successfully',
      preferences: user.preferences,
    });
  } catch (error) {
    console.error('Error updating preferences:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerUserController,
  loginUserController,
  getUserController,
  updateUserPreferencesController,
};
