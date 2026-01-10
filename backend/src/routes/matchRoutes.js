// backend/src/routes/matchRoutes.js

const express = require('express');
const router = express.Router();

// Import controllers
const {
  getTopMatchesController,
  getSimulationController,
  compareRoommatesController,
} = require('../controllers/matchController');

/**
 * @route   GET /api/matches/:userId/top
 * @desc    Fetch top matches for a specific user
 * @access  Public (can be protected later with authentication)
 * Params: userId - ID of the user
 */
router.get('/:userId/top', getTopMatchesController);

/**
 * @route   GET /api/matches/:userId/simulation/:roommateId
 * @desc    Get one-day simulation timeline for a given roommate match
 * @access  Public (can be protected later with authentication)
 * Params:
 *  - userId: ID of the user
 *  - roommateId: ID of the roommate
 */
router.get('/:userId/simulation/:roommateId', getSimulationController);

/**
 * @route   POST /api/matches/:userId/compare
 * @desc    Compare two roommates side by side
 * @access  Public (can be protected later with authentication)
 * Body: { roommate1Id: string, roommate2Id: string }
 */
router.post('/:userId/compare', compareRoommatesController);

module.exports = router;
