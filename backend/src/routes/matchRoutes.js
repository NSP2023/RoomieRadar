// backend/src/routes/matchRoutes.js

const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

const {
  getTopMatchesController,
  getSimulationController,
  compareRoommatesController,
  getDiscoveryUsersController,
  recordSwipeController,
} = require('../controllers/matchController');

/**
 * @route   GET /api/matches/top
 * @desc    Fetch top matches for authenticated user
 * @access  Protected
 */
router.get(
  '/top',
  passport.authenticate('jwt', { session: false }),
  getTopMatchesController
);

/**
 * @route   GET /api/matches/discover
 * @desc    Get users for swipe/discovery interface
 * @access  Protected
 */
router.get(
  '/discover',
  passport.authenticate('jwt', { session: false }),
  getDiscoveryUsersController
);

/**
 * @route   GET /api/matches/simulation/:roommateId
 * @desc    Get one-day simulation timeline
 * @access  Protected
 */
router.get(
  '/simulation/:roommateId',
  passport.authenticate('jwt', { session: false }),
  getSimulationController
);

/**
 * @route   POST /api/matches/compare
 * @desc    Compare current user with a roommate
 * @access  Protected
 * Body: { roommate1Id: string, roommate2Id: string }
 */
router.post(
  '/compare',
  passport.authenticate('jwt', { session: false }),
  compareRoommatesController
);

module.exports = router;