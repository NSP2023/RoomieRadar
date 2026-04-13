// src/utils/helpers.js

/**
 * Maps frontend numeric scores (1, 3, 4, 5) to backend-compatible Enum strings.
 * Score scale: 5 = highest/best, 4 = second, 3 = third, 1 = lowest
 *
 * @param {string} field - The lifestyle category (e.g., 'sleep', 'cleanliness')
 * @param {number} score - The numeric score from the frontend questionnaire (1, 3, 4, or 5)
 * @returns {string} The Enum value expected by the backend
 */
export const mapScoreToBackendEnum = (field, score) => {
  if (field === 'sleep') {
    // 5 = Early bird, 4 = Flexible, 3 = Night owl, 1 = Night owl (extreme)
    if (score >= 5) return 'Early';
    if (score === 4) return 'Flexible';
    return 'Late'; // scores 1 and 3
  }

  if (field === 'pets') {
    // 5 = loves pets (Yes), 4 = okay with them (Maybe), 3 = neutral (Flexible), 1 = no pets (No)
    if (score >= 5) return 'Yes';
    if (score === 4) return 'Maybe';
    if (score === 3) return 'Flexible';
    return 'No'; // score 1
  }

  if (field === 'conflict') {
    // 5 = talks right away (Immediate), 4 = waits then talks (Calm), 3 or 1 = avoids (Avoidant)
    if (score >= 5) return 'Immediate';
    if (score === 4) return 'Calm';
    return 'Avoidant'; // scores 1 and 3
  }

  if (field === 'guests') {
    // 5 = often, 4 or 3 = sometimes, 1 = rarely
    if (score >= 5) return 'Often';
    if (score >= 3) return 'Sometimes';
    return 'Rarely'; // score 1
  }

  if (field === 'sharing') {
    // 5 = fully shared, 4 or 3 = flexible, 1 = private
    if (score >= 5) return 'Shared';
    if (score >= 3) return 'Flexible';
    return 'Private'; // score 1
  }

  // Default for cleanliness and noiseTolerance:
  // 5 = High, 4 = Medium, 3 or 1 = Low
  if (score >= 5) return 'High';
  if (score === 4) return 'Medium';
  return 'Low'; // scores 1 and 3
};

/**
 * Calculate compatibility score between two users based on lifestyle answers
 * @param {Object} userA - User's lifestyle answers (e.g. from profile)
 * @param {Object} userB - Roommate's lifestyle answers
 * @returns {number} Compatibility score between 0–100
 */
export const calculateCompatibility = (userA, userB) => {
  if (!userA || !userB) return 0;

  let score = 0;
  let totalFactors = 0;

  // Sleep
  if (userA.sleep && userB.sleep) {
    score += userA.sleep === userB.sleep ? 25 : 5;
    totalFactors += 25;
  }

  // Cleanliness
  if (userA.cleanliness && userB.cleanliness) {
    score += userA.cleanliness === userB.cleanliness ? 25 : 5;
    totalFactors += 25;
  }

  // Noise Tolerance
  if (userA.noiseTolerance && userB.noiseTolerance) {
    score += userA.noiseTolerance === userB.noiseTolerance ? 20 : 5;
    totalFactors += 20;
  }

  // Pets
  if (userA.pets && userB.pets) {
    score += userA.pets === userB.pets
      ? 15
      : (userA.pets === 'Flexible' || userB.pets === 'Flexible' ? 10 : 3);
    totalFactors += 15;
  }

  // Smoking (if exists)
  if (userA.smoking && userB.smoking) {
    score += userA.smoking === userB.smoking
      ? 15
      : (userA.smoking === 'Flexible' || userB.smoking === 'Flexible' ? 10 : 3);
    totalFactors += 15;
  }

  if (totalFactors === 0) return 0;

  return Math.round((score / totalFactors) * 100);
};

/**
 * Format a number as percentage string (e.g. 92 → "92%")
 * @param {number} score
 * @returns {string}
 */
export const formatPercentage = (score) => {
  if (typeof score !== 'number' || isNaN(score)) return '—';
  return `${Math.round(score)}%`;
};

/**
 * Capitalize first letter of each word in a string
 * @param {string} str
 * @returns {string}
 */
export const capitalizeWords = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Format lifestyle value for display (backend enum → nice text)
 * @param {string} category - e.g. 'cleanliness', 'sleep', 'pets'
 * @param {string} value - backend enum value
 * @returns {string} human-readable text
 */
export const formatLifestyle = (category, value) => {
  if (!value) return 'Not specified';

  const mappings = {
    cleanliness: {
      Low: 'Quite relaxed about cleaning',
      Medium: 'Moderately clean',
      High: 'Very tidy & organized',
    },
    sleep: {
      Early: 'Early bird (sleeps early)',
      Late: 'Night owl',
      Flexible: 'Flexible sleep schedule',
    },
    noiseTolerance: {
      Low: 'Prefers quiet',
      Medium: 'Some noise is okay',
      High: "Noise doesn't bother me",
    },
    pets: {
      Yes: 'Has pets / wants pets',
      No: 'Prefers no pets',
      Maybe: 'Open to pets',
      Flexible: 'Flexible with pets',
    },
    smoking: {
      'Non-smoker': 'Non-smoker',
      Occasional: 'Occasional smoker',
      Regular: 'Regular smoker',
      Flexible: 'Flexible with smoking',
    },
  };

  return mappings[category]?.[value] || value;
};

/**
 * Returns label and class for conflict visualization
 */
export const getConflictStyle = (level) => {
  if (!level) return { label: 'Unknown', className: 'conflict-unknown' };

  const styles = {
    Low: { label: 'Low conflict', className: 'conflict-low' },
    Medium: { label: 'Moderate', className: 'conflict-medium' },
    High: { label: 'High conflict', className: 'conflict-high' },
  };

  return styles[level] || { label: level, className: 'conflict-unknown' };
};

/**
 * Simple delay helper (useful for animations / debounce)
 */
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generates a random pastel color HSL string
 */
export const getRandomPastelColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 85%)`;
};

/**
 * Truncates text with ellipses
 */
export const truncate = (text, maxLength = 120) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

// Default export containing all helpers
export default {
  mapScoreToBackendEnum,
  calculateCompatibility,
  formatPercentage,
  capitalizeWords,
  formatLifestyle,
  getConflictStyle,
  delay,
  getRandomPastelColor,
  truncate,
};