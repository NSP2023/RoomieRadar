// backend/src/services/tipsService.js

const generateTips = (conflictForecast, userAnswers, roommateAnswers) => {
  const tips = [];

  const toScore = (category, value) => {
    if (!value) return 3;
    const v = value.toString().trim();
    if (category === 'sleep') {
      if (v === 'Early') return 5; if (v === 'Flexible') return 4;
      if (v === 'Late') return 3; return 1;
    }
    if (category === 'guests') {
      if (v === 'Often') return 5; if (v === 'Sometimes') return 4;
      if (v === 'Rarely') return 3; return 1;
    }
    if (category === 'sharing') {
      if (v === 'Shared') return 5; if (v === 'Flexible') return 4;
      if (v === 'Private') return 3; return 1;
    }
    if (category === 'conflict') {
      if (v === 'Immediate') return 5; if (v === 'Calm') return 4;
      if (v === 'Avoidant') return 3; return 1;
    }
    if (category === 'pets') {
      if (v === 'Yes') return 5; if (v === 'Flexible') return 4;
      if (v === 'Maybe') return 3; if (v === 'No') return 1;
    }
    if (v === 'High') return 5; if (v === 'Medium') return 4; if (v === 'Low') return 3;
    const n = Number(v); return isNaN(n) ? 3 : n;
  };

  const forecast = conflictForecast || {};

  // ── Sleep ──────────────────────────────────────────────
  const uSleep = toScore('sleep', userAnswers?.sleep);
  const rSleep = toScore('sleep', roommateAnswers?.sleep);

  if (forecast.sleep === 'High') {
    if (uSleep >= 4 && rSleep <= 2)
      tips.push({ category: 'sleep', level: 'High', emoji: '🌙', tip: 'You\'re an early bird, they\'re a night owl. Agree on quiet hours after 10pm so late-night activity doesn\'t bleed into your mornings.' });
    else if (uSleep <= 2 && rSleep >= 4)
      tips.push({ category: 'sleep', level: 'High', emoji: '🌙', tip: 'You tend to stay up late while they sleep early. Keep lights low and noise minimal after their bedtime — it goes a long way.' });
    else
      tips.push({ category: 'sleep', level: 'High', emoji: '🌙', tip: 'Your sleep schedules clash. Set a shared "quiet zone" time and use a white noise app if one of you is a light sleeper.' });
  } else if (forecast.sleep === 'Medium') {
    tips.push({ category: 'sleep', level: 'Medium', emoji: '⚠️', tip: 'Slight difference in sleep times. A quick heads-up before sleeping or waking early can prevent unnecessary disruptions.' });
  } else {
    tips.push({ category: 'sleep', level: 'Low', emoji: '✅', tip: 'Sleep schedules align well! You\'re unlikely to disturb each other\'s rest.' });
  }

  // ── Cleanliness ────────────────────────────────────────
  const uClean = toScore('cleanliness', userAnswers?.cleanliness);
  const rClean = toScore('cleanliness', roommateAnswers?.cleanliness);

  if (forecast.cleanliness === 'High') {
    if (uClean > rClean)
      tips.push({ category: 'cleanliness', level: 'High', emoji: '🧹', tip: 'You have higher cleanliness standards than them. Set up a simple chore schedule in week one — clearly assigned tasks prevent most kitchen and bathroom tension.' });
    else
      tips.push({ category: 'cleanliness', level: 'High', emoji: '🧹', tip: 'They\'re tidier than you. Try cleaning up after yourself right away rather than leaving it "for later" — it\'s the #1 roommate complaint.' });
  } else if (forecast.cleanliness === 'Medium') {
    tips.push({ category: 'cleanliness', level: 'Medium', emoji: '🫧', tip: 'Slightly different cleanliness habits. Agree on a basic shared space standard — dishes done within a day, floors swept weekly.' });
  } else {
    tips.push({ category: 'cleanliness', level: 'Low', emoji: '✅', tip: 'You have similar cleanliness habits — shared spaces should stay comfortable for both of you.' });
  }

  // ── Noise ──────────────────────────────────────────────
  const uNoise = toScore('noiseTolerance', userAnswers?.noiseTolerance);
  const rNoise = toScore('noiseTolerance', roommateAnswers?.noiseTolerance);

  if (forecast.noiseTolerance === 'High') {
    if (uNoise > rNoise)
      tips.push({ category: 'noise', level: 'High', emoji: '🎧', tip: 'You can handle noise better than them. Use headphones for music, keep calls in your room, and check in before hosting loud hangouts.' });
    else
      tips.push({ category: 'noise', level: 'High', emoji: '🎧', tip: 'They\'re more noise-tolerant than you. Noise-cancelling headphones will be your best investment. Also establish "quiet study hours" together.' });
  } else if (forecast.noiseTolerance === 'Medium') {
    tips.push({ category: 'noise', level: 'Medium', emoji: '🔉', tip: 'Minor noise preferences differ. Headphones during study time and a heads-up before video calls or music sessions keeps things smooth.' });
  } else {
    tips.push({ category: 'noise', level: 'Low', emoji: '✅', tip: 'You both have similar noise tolerances — no major friction expected here.' });
  }

  // ── Guests ─────────────────────────────────────────────
  const uGuests = toScore('guests', userAnswers?.guests);
  const rGuests = toScore('guests', roommateAnswers?.guests);

  if (forecast.guests === 'High') {
    if (uGuests > rGuests)
      tips.push({ category: 'guests', level: 'High', emoji: '👥', tip: 'You enjoy having people over more than they do. Always give at least a day\'s notice before having guests — especially for groups or overnight stays.' });
    else
      tips.push({ category: 'guests', level: 'High', emoji: '👥', tip: 'They\'re more social than you at home. Set clear boundaries early — it\'s okay to say you need certain evenings to be guest-free.' });
  } else if (forecast.guests === 'Medium') {
    tips.push({ category: 'guests', level: 'Medium', emoji: '🏠', tip: 'Slightly different guest preferences. A simple "heads-up" text before anyone comes over is all it takes to keep the peace.' });
  } else {
    tips.push({ category: 'guests', level: 'Low', emoji: '✅', tip: 'You both have similar preferences for having people over. No surprises here.' });
  }

  // ── Sharing ────────────────────────────────────────────
  const uShare = toScore('sharing', userAnswers?.sharing);
  const rShare = toScore('sharing', roommateAnswers?.sharing);

  if (forecast.sharing === 'High') {
    if (uShare > rShare)
      tips.push({ category: 'sharing', level: 'High', emoji: '🍕', tip: 'You\'re more open to sharing than they are. Don\'t assume shared food is fair game — label your items and ask before using anything.' });
    else
      tips.push({ category: 'sharing', level: 'High', emoji: '🍕', tip: 'They like to share more than you do. Be upfront early — a friendly "I prefer to keep my food separate" prevents hurt feelings later.' });
  } else if (forecast.sharing === 'Medium') {
    tips.push({ category: 'sharing', level: 'Medium', emoji: '🛒', tip: 'Slightly different sharing styles. Decide early what\'s communal (cooking oil, spices?) and what\'s personal — saves a lot of awkwardness.' });
  } else {
    tips.push({ category: 'sharing', level: 'Low', emoji: '✅', tip: 'You both have similar sharing preferences. Fridge harmony incoming!' });
  }

  // ── Conflict Resolution ────────────────────────────────
  const uConflict = toScore('conflict', userAnswers?.conflict);
  const rConflict = toScore('conflict', roommateAnswers?.conflict);

  if (forecast.conflict === 'High' || forecast.conflict === 'Very High') {
    if (uConflict >= 4 && rConflict <= 2)
      tips.push({ category: 'conflict', level: 'High', emoji: '💬', tip: 'You address issues directly but they tend to avoid confrontation. Give them space to process before expecting a conversation — don\'t push for an immediate response.' });
    else if (uConflict <= 2 && rConflict >= 4)
      tips.push({ category: 'conflict', level: 'High', emoji: '💬', tip: 'They\'re direct communicators and you tend to avoid conflict. Try to speak up early when something bothers you — small issues fester fast in shared spaces.' });
    else
      tips.push({ category: 'conflict', level: 'High', emoji: '💬', tip: 'Very different conflict styles. Agree upfront: "if something bothers either of us, we say it within 24 hours." A simple rule prevents weeks of passive tension.' });
  } else if (forecast.conflict === 'Medium') {
    tips.push({ category: 'conflict', level: 'Medium', emoji: '🤝', tip: 'Slightly different ways of handling disagreements. A monthly 5-minute "roomie check-in" chat helps surface small issues before they become big ones.' });
  } else {
    tips.push({ category: 'conflict', level: 'Low', emoji: '✅', tip: 'You handle disagreements in similar ways — communication should feel natural between you two.' });
  }

  // ── Pets ───────────────────────────────────────────────
  if (forecast.pets === 'High') {
    const uPets = toScore('pets', userAnswers?.pets);
    const rPets = toScore('pets', roommateAnswers?.pets);
    if (uPets > rPets)
      tips.push({ category: 'pets', level: 'High', emoji: '🐾', tip: 'You love pets but they\'re less comfortable. Be upfront about any pets you have or plan to get — springing it on them later will cause serious friction.' });
    else
      tips.push({ category: 'pets', level: 'High', emoji: '🐾', tip: 'They\'re more pet-friendly than you. If they have a pet, clarify boundaries around pet-free zones in your shared spaces.' });
  } else if (forecast.pets === 'Medium') {
    tips.push({ category: 'pets', level: 'Medium', emoji: '🐱', tip: 'Slightly different feelings about pets. If a pet is involved, agree on which areas are off-limits and who handles cleaning.' });
  }
  // No tip for Low pets conflict — not worth mentioning

  // ── Sort: High conflicts first ─────────────────────────
  const order = { High: 0, 'Very High': 0, Medium: 1, Low: 2 };
  tips.sort((a, b) => (order[a.level] ?? 2) - (order[b.level] ?? 2));

  return tips;
};

module.exports = { generateTips };