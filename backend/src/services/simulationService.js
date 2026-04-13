// backend/src/services/simulationService.js

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
  const n = Number(v);
  return isNaN(n) ? 3 : Math.min(5, Math.max(1, n));
};

const diff = (a, b) => Math.abs(a - b);

const generateSimulation = (u, r) => {
  // Pull all scores
  const uSleep     = toScore('sleep',     u?.sleep);
  const rSleep     = toScore('sleep',     r?.sleep);
  const uClean     = toScore('cleanliness', u?.cleanliness);
  const rClean     = toScore('cleanliness', r?.cleanliness);
  const uNoise     = toScore('noiseTolerance', u?.noiseTolerance);
  const rNoise     = toScore('noiseTolerance', r?.noiseTolerance);
  const uGuests    = toScore('guests',    u?.guests);
  const rGuests    = toScore('guests',    r?.guests);
  const uSharing   = toScore('sharing',   u?.sharing);
  const rSharing   = toScore('sharing',   r?.sharing);
  const uConflict  = toScore('conflict',  u?.conflict);
  const rConflict  = toScore('conflict',  r?.conflict);
  const uPets      = toScore('pets',      u?.pets);
  const rPets      = toScore('pets',      r?.pets);

  const conflict = (d) => d === 0 ? 'smooth' : d === 1 ? 'minor' : 'tension';

  // Helper: pick a message based on two scores
  const sleepMsg = () => {
    if (diff(uSleep, rSleep) === 0) return { emoji: '😁', text: 'You both naturally wake up at the same time — no awkward alarm battles this morning!', vibe: 'smooth' };
    if (uSleep >= 4 && rSleep <= 2) return { emoji: '😬', text: 'You\'re up and chirpy while your roomie is still deep in dreamland. Tiptoeing around the kitchen it is...', vibe: 'tension' };
    if (uSleep <= 2 && rSleep >= 4) return { emoji: '😴', text: 'Your roomie bounces out of bed while you\'re still hitting snooze. They\'re already making breakfast — the smell is helping though 🍳', vibe: 'minor' };
    return { emoji: '🌅', text: 'Slightly different wake-up times, but nothing a quick "good morning!" text from the kitchen can\'t fix.', vibe: 'minor' };
  };

  const breakfastMsg = () => {
    if (diff(uSharing, rSharing) === 0 && uSharing >= 4) return { emoji: '🥞', text: 'You both whip out ingredients and spontaneously make pancakes together. This is the dream.', vibe: 'smooth' };
    if (uSharing >= 4 && rSharing <= 2) return { emoji: '🤔', text: 'You offer to share your toast but your roomie prefers to keep their food separate. You respect it — labeled shelves from now on!', vibe: 'minor' };
    if (uSharing <= 2 && rSharing >= 4) return { emoji: '🧇', text: 'Your roomie generously offers their leftovers. Sweet — but you prefer your own stash. A gentle "thanks, I\'m good!" does the trick.', vibe: 'minor' };
    return { emoji: '🍳', text: 'You each make your own breakfast, exchange a sleepy smile, and head off to your corners. Peaceful enough.', vibe: 'smooth' };
  };

  const morningStudyMsg = () => {
    if (diff(uNoise, rNoise) === 0 && uNoise >= 4) return { emoji: '📚', text: 'You both plug in headphones and study in your own bubbles — zero noise drama. The silence is golden ✨', vibe: 'smooth' };
    if (uNoise >= 4 && rNoise <= 2) return { emoji: '🎵', text: 'You need quiet to focus, but your roomie has a playlist going. A polite "could you use headphones?" works better than silent suffering.', vibe: 'tension' };
    if (uNoise <= 2 && rNoise >= 4) return { emoji: '🤫', text: 'You have music on low while studying — your roomie quietly puts on noise-cancelling headphones. No words needed.', vibe: 'minor' };
    return { emoji: '💻', text: 'You both find your study groove, navigating the noise level with small nods and hand signals. Teammates.', vibe: 'smooth' };
  };

  const lunchMsg = () => {
    if (diff(uClean, rClean) === 0 && uClean >= 4) return { emoji: '🍱', text: 'Lunch is eaten, dishes are washed immediately. The kitchen is spotless. You both beam with pride 😌', vibe: 'smooth' };
    if (uClean >= 4 && rClean <= 2) return { emoji: '🍽️', text: 'Your roomie leaves their lunch dishes "to soak." You silently wash them. A future chat about kitchen habits is probably overdue...', vibe: 'tension' };
    if (uClean <= 2 && rClean >= 4) return { emoji: '🧹', text: 'You left a few crumbs. Your roomie sweeps up without making a scene — but you notice. Maybe clean up a little more next time 😅', vibe: 'minor' };
    return { emoji: '🥗', text: 'Lunch is a relaxed affair. Dishes happen... eventually. No one\'s keeping score today.', vibe: 'smooth' };
  };

  const afternoonMsg = () => {
    if (diff(uNoise, rNoise) <= 1) return { emoji: '🎧', text: 'Afternoon study session is surprisingly productive — you\'ve found a shared rhythm with background lo-fi music. ☕', vibe: 'smooth' };
    if (uNoise >= 4 && rNoise <= 2) return { emoji: '😤', text: 'Your roomie takes a video call in the living room — loudly. You send a gentle knock from your room. They get the hint.', vibe: 'tension' };
    return { emoji: '📖', text: 'You each retreat to your own spaces for the afternoon. A little independent time never hurt anyone.', vibe: 'minor' };
  };

  const eveningGuestsMsg = () => {
    if (diff(uGuests, rGuests) === 0 && uGuests >= 4) return { emoji: '🎉', text: 'Your roomie\'s friends come over and you genuinely enjoy hanging out with them. Bonus friend group unlocked!', vibe: 'smooth' };
    if (uGuests <= 2 && rGuests >= 4) return { emoji: '😅', text: 'Three of your roomie\'s friends show up unannounced. You smile, say hi, then retreat to your room with headphones and snacks.', vibe: 'tension' };
    if (uGuests >= 4 && rGuests <= 2) return { emoji: '🏠', text: 'You invite a friend over. Your roomie is polite but clearly prefers a quiet evening. You keep it short.', vibe: 'minor' };
    return { emoji: '🛋️', text: 'A quiet evening in — no guests tonight. You both wind down in your own ways. Peaceful.', vibe: 'smooth' };
  };

  const dinnerMsg = () => {
    if (diff(uSharing, rSharing) === 0 && uSharing >= 4) return { emoji: '🍜', text: 'You cook together! One chops, one stirs, someone burns the garlic — but it\'s delicious anyway 😂❤️', vibe: 'smooth' };
    if (diff(uClean, rClean) >= 2 && uClean >= 4) return { emoji: '🍴', text: 'Dinner is fine, but the cooking mess lingers. You do a quiet cleanup sweep after. It becomes your thing.', vibe: 'minor' };
    if (diff(uClean, rClean) >= 2 && rClean >= 4) return { emoji: '🧽', text: 'Your roomie cooks something amazing but leaves behind a war zone of pots. The smell is worth it. Barely.', vibe: 'tension' };
    return { emoji: '🍛', text: 'You each make your own dinner, share a small taste of each other\'s food, and call it a win.', vibe: 'smooth' };
  };

  const relaxMsg = () => {
    if (diff(uNoise, rNoise) === 0 && uNoise <= 2) return { emoji: '📺', text: 'Netflix time! You both agree on a show immediately — no 20-minute scroll battle. This is rare. This is precious.', vibe: 'smooth' };
    if (uNoise >= 4 && rNoise <= 2) return { emoji: '🎮', text: 'You want to watch something loud and fun. Your roomie is reading quietly. Headphones save the day — again.', vibe: 'minor' };
    if (diff(uConflict, rConflict) >= 2) return { emoji: '💬', text: 'A small earlier tension bubbles up. One of you is direct about it, the other needs more time. You talk it through — slowly, but it works.', vibe: 'tension' };
    return { emoji: '🌙', text: 'Evening winds down gently. Someone makes tea and offers a cup. The day ends on a warm note ☕', vibe: 'smooth' };
  };

  const petsMsg = () => {
    if (diff(uPets, rPets) === 0 && uPets >= 4) return { emoji: '🐾', text: 'The house pet (or a neighbour\'s cat that sneaked in) gets showered with attention from both of you. Instant bond.', vibe: 'smooth' };
    if (uPets >= 4 && rPets <= 2) return { emoji: '🙅', text: 'You spot a stray cat near the door and want to let it in. Your roomie politely but firmly says no. Fair enough.', vibe: 'minor' };
    if (uPets <= 2 && rPets >= 4) return { emoji: '🐱', text: 'Your roomie found a kitten. Your roomie is already naming it. You remind them about the no-pets rule... they\'re not listening.', vibe: 'tension' };
    return { emoji: '🌿', text: 'No pets today — just some quiet coexistence and a plant you both forget to water.', vibe: 'smooth' };
  };

  const bedtimeMsg = () => {
    if (diff(uSleep, rSleep) === 0) return { emoji: '🌛', text: 'Lights out at the same time. You both mutter "goodnight" through the walls. Perfect sync.', vibe: 'smooth' };
    if (uSleep >= 4 && rSleep <= 2) return { emoji: '💡', text: 'You\'re ready for bed but your roomie is still up, light on under their door. You fall asleep to the faint glow. Not ideal, but manageable.', vibe: 'minor' };
    if (uSleep <= 2 && rSleep >= 4) return { emoji: '🌙', text: 'You\'re up scrolling at midnight while your roomie is already deep asleep. You try (kind of) to be quiet 😬', vibe: 'tension' };
    return { emoji: '😪', text: 'Different wind-down times, but you\'ve both learned to respect each other\'s sleep space. Progress ✨', vibe: 'smooth' };
  };

  // Build the full timeline
  const events = [
    { time: '7:00 AM',  title: 'Morning Wake-Up',       ...sleepMsg() },
    { time: '8:00 AM',  title: 'Breakfast',              ...breakfastMsg() },
    { time: '9:30 AM',  title: 'Study / Work Time',      ...morningStudyMsg() },
    { time: '12:30 PM', title: 'Lunch Break',            ...lunchMsg() },
    { time: '2:00 PM',  title: 'Afternoon Session',      ...afternoonMsg() },
    { time: '5:00 PM',  title: 'Evening & Guests',       ...eveningGuestsMsg() },
    { time: '7:00 PM',  title: 'Dinner Time',            ...dinnerMsg() },
    { time: '8:30 PM',  title: 'Relax & Unwind',         ...relaxMsg() },
    { time: '9:30 PM',  title: 'Pet Moment 🐾',          ...petsMsg() },
    { time: '11:00 PM', title: 'Lights Out',             ...bedtimeMsg() },
  ];

  // Count vibes for summary
  const vibes = events.reduce((acc, e) => {
    acc[e.vibe] = (acc[e.vibe] || 0) + 1;
    return acc;
  }, {});

  const overallVibe =
    vibes.tension >= 4 ? 'rocky' :
    vibes.tension >= 2 ? 'mixed' :
    vibes.minor  >= 4 ? 'decent' : 'great';

  return events.map((e) => ({
    time:             e.time,
    activity:         e.title,
    emoji:            e.emoji,
    text:             e.text,
    potentialConflict: e.vibe,   // smooth,minor,tension
    overallVibe,
  }));
};

module.exports = { generateSimulation };