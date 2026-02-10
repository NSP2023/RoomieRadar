const RoommateMatch = require('../models/RoommateMatch');
const User = require('../models/User');

/**
 * GET /api/matches/top
 * Fetch top matches for the CURRENT authenticated user
 */
const getTopMatchesController = async (req, res) => {
  try {
    const userId = req.user._id;

    const roommateMatch = await RoommateMatch.findOne({ user: userId })
      .populate('matches.roommate', 'name email age university hall whatsapp avatar bio lifestyle');

    if (!roommateMatch || roommateMatch.matches.length === 0) {
      return res.status(200).json({
        success: true,
        topMatches: [],
        message: 'No matches found. Complete your lifestyle questionnaire to get matches!'
      });
    }

    const topMatches = roommateMatch.matches
      .sort((a, b) => b.compatibilityScore - a.compatibilityScore)
      .slice(0, 10)
      .map(match => ({
        roommate: match.roommate,
        compatibilityScore: match.compatibilityScore,
        conflictForecast: match.conflictForecast,
        badges: match.badges || [],
      }));

    res.status(200).json({
      success: true,
      topMatches
    });
  } catch (error) {
    console.error('Error fetching top matches:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
...
module.exports = {
  getTopMatchesController,
  getSimulationController,
  compareRoommatesController,
  getDiscoveryUsersController,
};
