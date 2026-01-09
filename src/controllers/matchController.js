// backend/src/controllers/matchController.js

const RoommateMatch = require('../models/RoommateMatch');
const User = require('../models/User');

/**
 * GET /api/matches/:userId/top
 * Fetch top matches for a given user
 */
const getTopMatchesController = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch the user's matches
    const roommateMatch = await RoommateMatch.findOne({ user: userId })
      .populate('matches.roommate', 'name email lifestyle personality');

    if (!roommateMatch) {
      return res.status(404).json({ message: 'No matches found for this user' });
    }

    // Sort matches by compatibilityScore descending
    const topMatches = roommateMatch.matches
      .sort((a, b) => b.compatibilityScore - a.compatibilityScore)
      .slice(0, 5); // return top 5 matches

    res.status(200).json({ topMatches });
  } catch (error) {
    console.error('Error fetching top matches:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * GET /api/matches/:userId/simulation/:roommateId
 * Fetch one-day simulation timeline for a given roommate pair
 */
const getSimulationController = async (req, res) => {
  try {
    const { userId, roommateId } = req.params;

    const roommateMatch = await RoommateMatch.findOne({ user: userId });

    if (!roommateMatch) {
      return res.status(404).json({ message: 'No matches found for this user' });
    }

    const match = roommateMatch.matches.find(
      (m) => m.roommate.toString() === roommateId
    );

    if (!match) {
      return res.status(404).json({ message: 'This roommate match not found' });
    }

    res.status(200).json({ simulation: match.simulation || [] });
  } catch (error) {
    console.error('Error fetching simulation:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * POST /api/matches/:userId/compare
 * Compare two roommates side by side
 * Body: { roommate1Id, roommate2Id }
 */
const compareRoommatesController = async (req, res) => {
  try {
    const { userId } = req.params;
    const { roommate1Id, roommate2Id } = req.body;

    const roommateMatch = await RoommateMatch.findOne({ user: userId })
      .populate('matches.roommate', 'name lifestyle personality');

    if (!roommateMatch) {
      return res.status(404).json({ message: 'No matches found for this user' });
    }

    const match1 = roommateMatch.matches.find(
      (m) => m.roommate._id.toString() === roommate1Id
    );
    const match2 = roommateMatch.matches.find(
      (m) => m.roommate._id.toString() === roommate2Id
    );

    if (!match1 || !match2) {
      return res.status(404).json({ message: 'One or both roommates not found' });
    }

    res.status(200).json({
      comparison: {
        roommate1: match1,
        roommate2: match2,
      },
    });
  } catch (error) {
    console.error('Error comparing roommates:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getTopMatchesController,
  getSimulationController,
  compareRoommatesController,
};
