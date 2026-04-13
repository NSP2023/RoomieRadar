// backend/src/controllers/matchController.js

const RoommateMatch = require('../models/RoommateMatch');
const User = require('../models/User');
const { generateTips } = require('../services/tipsService'); // ✅ only new import

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

/**
 * GET /api/matches/simulation/:roommateId
 * Returns the stored one-day simulation for a specific roommate match
 */
const getSimulationController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { roommateId } = req.params;

    const roommateMatch = await RoommateMatch.findOne({ user: userId });
    if (!roommateMatch) {
      return res.status(404).json({ success: false, message: 'No matches found for this user' });
    }

    const match = roommateMatch.matches.find(
      (m) => m.roommate.toString() === roommateId
    );
    if (!match) {
      return res.status(404).json({ success: false, message: 'Match not found' });
    }

    // Fetch both users' lifestyle to generate tips live
    const [currentUser, roommateUser] = await Promise.all([
      User.findById(userId).select('lifestyle'),
      User.findById(roommateId).select('lifestyle'),
    ]);

    const conflictForecast = match.conflictForecast
      ? Object.fromEntries(match.conflictForecast)
      : {};

    const tips = generateTips(
      conflictForecast,
      currentUser?.lifestyle || {},
      roommateUser?.lifestyle || {}
    );

    res.status(200).json({
      success: true,
      simulation: match.simulation || [],
      compatibilityScore: match.compatibilityScore || 0,
      conflictForecast,
      tips,
    });
  } catch (error) {
    console.error('Error fetching simulation:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

/**
 * POST /api/matches/compare
 * Returns profile + lifestyle data for a roommate to display in CompareView
 */
const compareRoommatesController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { roommate1Id } = req.body;

    if (!roommate1Id) {
      return res.status(400).json({ success: false, message: 'roommate1Id is required' });
    }

    const roommate = await User.findById(roommate1Id).select(
      'name age university hall whatsapp avatar bio lifestyle'
    );

    if (!roommate) {
      return res.status(404).json({ success: false, message: 'Roommate not found' });
    }

    const roommateMatch = await RoommateMatch.findOne({ user: userId });
    let compatibilityScore = 0;
    if (roommateMatch) {
      const match = roommateMatch.matches.find(
        (m) => m.roommate.toString() === roommate1Id
      );
      compatibilityScore = match?.compatibilityScore || 0;
    }

    res.status(200).json({
      success: true,
      comparison: {
        roommate1: {
          _id: roommate._id,
          name: roommate.name,
          age: roommate.age,
          university: roommate.university,
          hall: roommate.hall,
          whatsapp: roommate.whatsapp,
          avatar: roommate.avatar,
          bio: roommate.bio,
          lifestyle: roommate.lifestyle,
          compatibilityScore,
        },
      },
    });
  } catch (error) {
    console.error('Error comparing roommates:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

/**
 * GET /api/matches/discover
 */
const getDiscoveryUsersController = async (req, res) => {
  try {
    const userId = req.user._id;

    const users = await User.find({ _id: { $ne: userId } })
      .select('name age university hall avatar bio lifestyle')
      .limit(20);

    const roommateMatch = await RoommateMatch.findOne({ user: userId });

    const profiles = users.map((u) => {
      let compatibilityScore = 0;
      if (roommateMatch) {
        const match = roommateMatch.matches.find(
          (m) => m.roommate.toString() === u._id.toString()
        );
        compatibilityScore = match?.compatibilityScore || 0;
      }
      return {
        _id: u._id,
        name: u.name,
        age: u.age,
        university: u.university,
        hall: u.hall,
        avatar: u.avatar,
        bio: u.bio,
        compatibilityScore,
      };
    });

    res.status(200).json({ success: true, users: profiles });
  } catch (error) {
    console.error('Error fetching discovery users:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = {
  getTopMatchesController,
  getSimulationController,
  compareRoommatesController,
  getDiscoveryUsersController,
};