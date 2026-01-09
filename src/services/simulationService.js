// backend/src/services/simulationService.js

/**
 * Generate a simple one-day simulation timeline for a roommate pair
 * @param {Object} userAnswers - Lifestyle answers of the user
 * @param {Object} roommateAnswers - Lifestyle answers of the roommate
 * @returns {Array} simulation - Array of timeline objects
 */
const generateSimulation = (userAnswers, roommateAnswers) => {
  // Define a base daily schedule
  const schedule = [
    { time: '07:00 AM', activity: 'Wake Up', category: 'sleep' },
    { time: '08:00 AM', activity: 'Breakfast', category: 'cleanliness' },
    { time: '09:00 AM', activity: 'Work/Study', category: 'noiseTolerance' },
    { time: '12:00 PM', activity: 'Lunch', category: 'cleanliness' },
    { time: '01:00 PM', activity: 'Work/Study', category: 'noiseTolerance' },
    { time: '06:00 PM', activity: 'Dinner', category: 'cleanliness' },
    { time: '07:00 PM', activity: 'Relax/Leisure', category: 'noiseTolerance' },
    { time: '10:00 PM', activity: 'Sleep', category: 'sleep' },
  ];

  // Helper to determine conflict level for a category
  const getConflictLevel = (category) => {
    const userValue = userAnswers[category];
    const roommateValue = roommateAnswers[category];

    if (userValue === roommateValue) return 'Low';
    if (userValue === 'Flexible' || roommateValue === 'Flexible') return 'Medium';
    return 'High';
  };

  // Generate simulation timeline with conflict levels
  const simulation = schedule.map((slot) => ({
    time: slot.time,
    activity: slot.activity,
    potentialConflict: getConflictLevel(slot.category),
  }));

  return simulation;
};

module.exports = {
  generateSimulation,
};
