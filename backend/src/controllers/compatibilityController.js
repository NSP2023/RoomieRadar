// backend/src/controllers/compatibilityController.js

const User = require('../models/User');
const RoommateMatch = require('../models/RoommateMatch');

/**
 * Helper function to calculate compatibility score between two users
 * Returns a number from 0 to 100
 */
const calculateCompatibility = (userAnswers, otherAnswers) => {
  let score = 0;
  const totalCategories = 5; // sleep, cleanliness, noiseTolerance,temperature,social

  // Sleep compatibility
  if (userAnswers.sleep === otherAnswers.sleep) score += 1;
  // Cleanliness
  if (userAnswers.cleanliness === otherAnswers.cleanliness) score += 1;
  // Noise tolerance
  if (userAnswers.noiseTolerance === otherAnswers.noiseTolerance) score += 1;
  // Temperature 
  if (userAnswers.temperature === otherAnswers.temperature) score += 1;
  // Social 
  if (userAnswers.social === otherAnswers.social) score += 1;

  return (score / totalCategories) * 100; // convert to 0-100 scale
};

/**
 * Helper function to generate a simple conflict forecast
 */
const generateConflictForecast = (userAnswers, otherAnswers) => {
  const forecast = {};
  const categories = ['sleep', 'cleanliness', 'noiseTolerance','temperature','social'];

  categories.forEach((cat) => {
    if (userAnswers[cat] === otherAnswers[cat]) {
      forecast[cat] = 'Low';
    } else if (
      (userAnswers[cat] === 'Flexible' || otherAnswers[cat] === 'Flexible') ||
      Math.abs(userAnswers[cat].length - otherAnswers[cat].length) <= 2
    ) {
      forecast[cat] = 'Medium';
    } else {
      forecast[cat] = 'High';
    }
  });

  return forecast;
};

/**
 * POST /api/compatibility/calculate
 * Body: { userId }
 * Calculates compatibility scores with all other users
 */
const calculateCompatibilityController = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Fetch all other users to compare
    const otherUsers = await User.find({ _id: { $ne: userId } });

    const matches = otherUsers.map((other) => {
      const compatibilityScore = calculateCompatibility(user.lifestyle, other.lifestyle);
      const conflictForecast = generateConflictForecast(user.lifestyle, other.lifestyle);

      return {
        roommate: other._id,
        compatibilityScore,
        conflictForecast,
        badges: compatibilityScore >= 80 ? ['Top Match'] : [],
      };
    });

    // Save matches in RoommateMatch collection
    let roommateMatch = await RoommateMatch.findOne({ user: userId });
    if (!roommateMatch) {
      roommateMatch = new RoommateMatch({ user: userId, matches });
    } else {
      roommateMatch.matches = matches;
    }

    await roommateMatch.save();

    res.status(200).json({
      message: 'Compatibility calculated successfully',
      matches,
    });
  } catch (error) {
    console.error('Error calculating compatibility:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * GET /api/compatibility/:userId
 * Returns saved compatibility matches for a user
 */
const getCompatibilityController = async (req, res) => {
  try {
    const { userId } = req.params;

    const roommateMatch = await RoommateMatch.findOne({ user: userId })
      .populate('matches.roommate', 'name email lifestyle personality'); // populate basic info

    if (!roommateMatch) {
      return res.status(404).json({ message: 'No matches found for this user' });
    }

    res.status(200).json({ matches: roommateMatch.matches });
  } catch (error) {
    console.error('Error fetching compatibility matches:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  calculateCompatibilityController,
  getCompatibilityController,
};
