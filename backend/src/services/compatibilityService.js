// backend/src/services/compatibilityService.js

const calculateCompatibility = (userAnswers, roommateAnswers) => {
  const weights = {
    cleanliness: 0.25,
    sleep:       0.22,
    noiseTolerance: 0.20,
    guests:      0.12,
    sharing:     0.10,
    conflict:    0.06,
    pets:        0.05,
  };

  // Convert backend enum strings → 1–5 scores
  const toScore = (category, value) => {
    if (!value) return 3; // neutral default

    const v = value.toString().trim();

    if (category === 'sleep') {
      if (v === 'Early')    return 5;
      if (v === 'Flexible') return 4;
      if (v === 'Late')     return 3;
      return 1;
    }

    if (category === 'guests') {
      if (v === 'Often')     return 5;
      if (v === 'Sometimes') return 4;
      if (v === 'Rarely')    return 3;
      return 1;
    }

    if (category === 'sharing') {
      if (v === 'Shared')   return 5;
      if (v === 'Flexible') return 4;
      if (v === 'Private')  return 3;
      return 1;
    }

    if (category === 'conflict') {
      if (v === 'Immediate') return 5;
      if (v === 'Calm')      return 4;
      if (v === 'Avoidant')  return 3;
      return 1;
    }

    if (category === 'pets') {
      if (v === 'Yes')      return 5;
      if (v === 'Flexible') return 4;
      if (v === 'Maybe')    return 3;
      if (v === 'No')       return 1;
    }

    // cleanliness, noiseTolerance: Low / Medium / High
    if (v === 'High')   return 5;
    if (v === 'Medium') return 4;
    if (v === 'Low')    return 3;

    // Already a number
    const n = Number(v);
    return isNaN(n) ? 3 : Math.min(5, Math.max(1, n));
  };

  let totalScore = 0;
  let totalWeight = 0;

  Object.keys(weights).forEach((category) => {
    const userVal     = toScore(category, userAnswers?.[category]);
    const roommateVal = toScore(category, roommateAnswers?.[category]);

    // Max difference on 1–5 scale is 4
    const difference = Math.abs(userVal - roommateVal);
    const categoryScore = Math.max(0, 100 - difference * 25); // 0 diff=100, 4 diff=0

    totalScore  += categoryScore * weights[category];
    totalWeight += weights[category];
  });

  const finalScore = Math.round(totalScore / totalWeight);
  return Math.min(100, Math.max(0, finalScore));
};

const generateConflictForecast = (userAnswers, roommateAnswers) => {
  const categories = ['cleanliness', 'sleep', 'noiseTolerance', 'guests', 'sharing', 'conflict', 'pets'];

  const toScore = (category, value) => {
    if (!value) return 3;
    const v = value.toString().trim();

    if (category === 'sleep') {
      if (v === 'Early') return 5; if (v === 'Flexible') return 4; if (v === 'Late') return 3; return 1;
    }
    if (category === 'guests') {
      if (v === 'Often') return 5; if (v === 'Sometimes') return 4; if (v === 'Rarely') return 3; return 1;
    }
    if (category === 'sharing') {
      if (v === 'Shared') return 5; if (v === 'Flexible') return 4; if (v === 'Private') return 3; return 1;
    }
    if (category === 'conflict') {
      if (v === 'Immediate') return 5; if (v === 'Calm') return 4; if (v === 'Avoidant') return 3; return 1;
    }
    if (category === 'pets') {
      if (v === 'Yes') return 5; if (v === 'Flexible') return 4; if (v === 'Maybe') return 3; if (v === 'No') return 1;
    }
    if (v === 'High') return 5; if (v === 'Medium') return 4; if (v === 'Low') return 3;
    const n = Number(v);
    return isNaN(n) ? 3 : Math.min(5, Math.max(1, n));
  };

  const forecast = {};
  categories.forEach((cat) => {
    const diff = Math.abs(toScore(cat, userAnswers?.[cat]) - toScore(cat, roommateAnswers?.[cat]));
    if (diff === 0)      forecast[cat] = 'Low';
    else if (diff <= 1)  forecast[cat] = 'Medium';
    else                 forecast[cat] = 'High';
  });

  return forecast;
};

const getBadge = (score) => {
  if (score >= 90) return ['Soulmate Match 💖', 'Top Match'];
  if (score >= 82) return ['Excellent Match ✨', 'Top Match'];
  if (score >= 75) return ['Great Match'];
  if (score >= 65) return ['Good Match'];
  if (score >= 50) return ['Potential Roomie'];
  return ['Challenging Match ⚠️'];
};

module.exports = { calculateCompatibility, generateConflictForecast, getBadge };