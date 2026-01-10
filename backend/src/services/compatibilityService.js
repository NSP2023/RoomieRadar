// backend/src/services/compatibilityService.js

/**
 * Calculate compatibility score between two users
 * Returns a number between 0 and 100
 * @param {Object} userAnswers - Lifestyle answers of user
 * @param {Object} otherAnswers - Lifestyle answers of other user
 */
const calculateCompatibility = (userAnswers, otherAnswers) => {
  let score = 0;
  const totalCategories = 3; // sleep, cleanliness, noiseTolerance

  // Sleep
  if (userAnswers.sleep === otherAnswers.sleep) score += 1;

  // Cleanliness
  if (userAnswers.cleanliness === otherAnswers.cleanliness) score += 1;

  // Noise tolerance
  if (userAnswers.noiseTolerance === otherAnswers.noiseTolerance) score += 1;

  return (score / totalCategories) * 100; // convert to 0-100 scale
};

/**
 * Generate a conflict forecast between two users
 * Returns an object like: { sleep: 'Low', cleanliness: 'Medium', noiseTolerance: 'High' }
 * @param {Object} userAnswers
 * @param {Object} otherAnswers
 */
const generateConflictForecast = (userAnswers, otherAnswers) => {
  const forecast = {};
  const categories = ['sleep', 'cleanliness', 'noiseTolerance'];

  categories.forEach((cat) => {
    if (userAnswers[cat] === otherAnswers[cat]) {
      forecast[cat] = 'Low';
    } else if (
      userAnswers[cat] === 'Flexible' ||
      otherAnswers[cat] === 'Flexible'
    ) {
      forecast[cat] = 'Medium';
    } else {
      forecast[cat] = 'High';
    }
  });

  return forecast;
};

/**
 * Generate a "Top Match" badge based on compatibility score
 * @param {Number} score - compatibility score 0-100
 */
const getBadge = (score) => {
  if (score >= 80) return ['Top Match'];
  if (score >= 60) return ['Good Match'];
  return [];
};

module.exports = {
  calculateCompatibility,
  generateConflictForecast,
  getBadge,
};
