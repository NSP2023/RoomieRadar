// backend/src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const {
  updateUserPreferencesController,
  registerUserController,
  loginUserController,
  getUserController,
} = require('../controllers/userController');


// Helper to make the code cleaner
// Source: Industry Standard Middleware Wrapper
const protect = passport.authenticate('jwt', { session: false });

router.post('/register', registerUserController);
router.post('/login', loginUserController);
router.get('/profile', protect, getUserController);
router.put('/profile', protect, updateUserPreferencesController);
module.exports = router;
