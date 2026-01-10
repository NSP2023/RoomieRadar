// backend/src/services/tipsService.js

/**
 * Generate practical tips based on conflict forecast
 * @param {Object} conflictForecast - { sleep: 'Low', cleanliness: 'High', noiseTolerance: 'Medium' }
 * @returns {Array} tips - Array of strings with practical advice
 */
const generateTips = (conflictForecast) => {
  const tips = [];

  // Sleep tips
  if (conflictForecast.sleep === 'High') {
    tips.push(
      "Consider adjusting your sleep schedule or using earplugs/eye masks to reduce sleep conflicts."
    );
  } else if (conflictForecast.sleep === 'Medium') {
    tips.push(
      "Your sleep schedules are somewhat compatible. Minor adjustments could improve harmony."
    );
  } else {
    tips.push("Your sleep schedules align well. Keep it up!");
  }

  // Cleanliness tips
  if (conflictForecast.cleanliness === 'High') {
    tips.push(
      "Discuss cleaning responsibilities and create a chore schedule to avoid conflicts."
    );
  } else if (conflictForecast.cleanliness === 'Medium') {
    tips.push(
      "Your cleanliness habits are fairly compatible. A few minor agreements can help."
    );
  } else {
    tips.push("You both have similar cleanliness habits. Great match!");
  }

  // Noise tolerance tips
  if (conflictForecast.noiseTolerance === 'High') {
    tips.push(
      "Try setting quiet hours or using headphones to reduce noise-related friction."
    );
  } else if (conflictForecast.noiseTolerance === 'Medium') {
    tips.push(
      "Your noise preferences are moderately compatible. Small compromises may help."
    );
  } else {
    tips.push("Your noise preferences align well. No major issues expected!");
  }

  return tips;
};

module.exports = {
  generateTips,
};
