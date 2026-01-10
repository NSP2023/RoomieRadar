// backend/src/routes/compatibilityRoutes.js

const express = require('express');
const router = express.Router();

// Import controllers
const {
  calculateCompatibilityController,
  getCompatibilityController,
} = require('../controllers/compatibilityController');

/**
 * @route   POST /api/compatibility/calculate
 * @desc    Calculate compatibility scores for a user with all other users
 * @access  Public (can be made Protected if using authentication)
 * Body: { userId: string }
 */
router.post('/calculate', calculateCompatibilityController);

/**
 * @route   GET /api/compatibility/:userId
 * @desc    Retrieve saved compatibility matches for a user
 * @access  Public (can be made Protected if using authentication)
 * Params: userId - ID of the user
 */
router.get('/:userId', getCompatibilityController);

module.exports = router;
