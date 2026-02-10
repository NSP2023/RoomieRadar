// src/utils/helpers.js

/**
 * Calculate compatibility score between two users based on lifestyle answers
 * This is a simplified frontend version — for production accuracy,
 * you should use the backend-computed score from /matches/top or /matches/compare
 *
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
    score += userA.sleep === userB.sleep ? 25 : 5; // exact match = high points
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

  // Pets (if exists)
  if (userA.pets && userB.pets) {
    score += userA.pets === userB.pets ? 15 : (userA.pets === 'Flexible' || userB.pets === 'Flexible' ? 10 : 3);
    totalFactors += 15;
  }

  // Smoking (if exists)
  if (userA.smoking && userB.smoking) {
    score += userA.smoking === userB.smoking ? 15 : (userA.smoking === 'Flexible' || userB.smoking === 'Flexible' ? 10 : 3);
    totalFactors += 15;
  }

  // If no factors were compared, return 0
  if (totalFactors === 0) return 0;

  // Normalize to 0–100
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
      High: 'Noise doesn’t bother me',
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
 * Get conflict level label & color class
 * @param {string} level - 'Low', 'Medium', 'High'
 * @returns {{ label: string, className: string }}
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
 * @param {number} ms
 * @returns {Promise<void>}
 */
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generate a random pastel color for avatars / backgrounds
 * @returns {string} hex color
 */
export const getRandomPastelColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 85%)`;
};

/**
 * Truncate text with ellipsis
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export const truncate = (text, maxLength = 120) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

export default {
  calculateCompatibility,
  formatPercentage,
  capitalizeWords,
  formatLifestyle,
  getConflictStyle,
  delay,
  getRandomPastelColor,
  truncate,
};