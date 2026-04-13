// Questions Data
export const questions = [
  {
    id: 1,
    question: "When do you usually go to bed?",
    options: [
      { id: 'early', label: "Early Bird", description: "Before 10 PM", icon: "🌅" },
      { id: 'night', label: "Night Owl", description: "10 PM - 12 AM", icon: "🦉" },
      { id: 'midnight', label: "Midnight Riser", description: "After 1 AM", icon: "🌙" }
    ],
    category: "sleep"
  },
  {
    id: 2,
    question: "How do you feel about noise?",
    options: [
      { id: 'sensitive', label: "Sensitive", description: "I prefer quiet spaces", icon: "🔇" },
      { id: 'moderate', label: "Moderate", description: "Some noise is okay", icon: "🔉" },
      { id: 'easy', label: "Easy-going", description: "Noise doesn't bother me", icon: "🔊" }
    ],
    category: "noise"
  },
  {
    id: 3,
    question: "How would you describe your cleanliness?",
    options: [
      { id: 'meticulous', label: "Meticulous", description: "Everything has its place", icon: "✨" },
      { id: 'balanced', label: "Balanced", description: "Clean but lived-in", icon: "🏠" },
      { id: 'relaxed', label: "Relaxed", description: "Organized chaos works for me", icon: "😌" }
    ],
    category: "cleanliness"
  },
  {
    id: 4,
    question: "What's your ideal room temperature?",
    options: [
      { id: 'cool', label: "Cool & Fresh", description: "60-68°F", icon: "❄️" },
      { id: 'justRight', label: "Just Right", description: "68-72°F", icon: "🌡️" },
      { id: 'warm', label: "Warm & Cozy", description: "72-78°F", icon: "🔥" }
    ],
    category: "temperature"
  },
  {
    id: 5,
    question: "How social are you at home?",
    options: [
      { id: 'introvert', label: "Homebody", description: "Enjoy quiet evenings", icon: "📚" },
      { id: 'balancedSocial', label: "Balanced", description: "Mix of alone & social time", icon: "⚖️" },
      { id: 'social', label: "Social Butterfly", description: "Often have friends over", icon: "🦋" }
    ],
    category: "social"
  }
];

// Matches Data
export const matches = [
  {
    id: 1,
    name: "Riley Johnson",
    age: 27,
    location: "306 Metals",
    personality: "Morning Socialite",
    bio: "Fitness instructor with an active and social lifestyle",
    compatibility: 90,
    image: null, // You can add image URLs later
    preferences: {
      sleep: "early",
      noise: "moderate",
      cleanliness: "balanced",
      temperature: "cool",
      social: "social"
    }
  },
  {
    id: 2,
    name: "Casey Park",
    age: 24,
    location: "Artist Loft",
    personality: "Easy-going Friend",
    bio: "Artist who enjoys a relaxed and creative environment",
    compatibility: 85,
    image: null,
    preferences: {
      sleep: "night",
      noise: "easy",
      cleanliness: "relaxed",
      temperature: "justRight",
      social: "balancedSocial"
    }
  },
  {
    id: 3,
    name: "Sam Rivera",
    age: 25,
    location: "Music District",
    personality: "Social Butterfly",
    bio: "Music teacher who loves jam sessions and creative projects",
    compatibility: 85,
    image: null,
    preferences: {
      sleep: "night",
      noise: "easy",
      cleanliness: "balanced",
      temperature: "warm",
      social: "social"
    }
  },
  {
    id: 4,
    name: "Alex Chen",
    age: 26,
    location: "Tech Hub",
    personality: "Neat Freak",
    bio: "Software engineer who values organization and quiet time",
    compatibility: 75,
    image: null,
    preferences: {
      sleep: "early",
      noise: "sensitive",
      cleanliness: "meticulous",
      temperature: "cool",
      social: "introvert"
    }
  },
  {
    id: 5,
    name: "Jordan Miller",
    age: 28,
    location: "Green Valley",
    personality: "Chill Companion",
    bio: "Environmental scientist who loves plants and calm spaces",
    compatibility: 80,
    image: null,
    preferences: {
      sleep: "midnight",
      noise: "moderate",
      cleanliness: "balanced",
      temperature: "justRight",
      social: "balancedSocial"
    }
  }
];

// Personality Types
export const personalityTypes = {
  morningSocialite: {
    name: "Morning Socialite",
    description: "Early riser who enjoys social activities and staying active",
    icon: "🌅🦋"
  },
  easyGoingFriend: {
    name: "Easy-going Friend",
    description: "Relaxed and adaptable, enjoys creative and calm environments",
    icon: "😌🎨"
  },
  socialButterfly: {
    name: "Social Butterfly",
    description: "Loves hosting, music, and always up for social gatherings",
    icon: "🦋🎵"
  },
  neatFreak: {
    name: "Neat Freak",
    description: "Values organization, quiet time, and structured routines",
    icon: "✨📊"
  },
  chillCompanion: {
    name: "Chill Companion",
    description: "Easy-going, loves nature, and maintains a balanced lifestyle",
    icon: "🌿⚖️"
  }
};

// User Preferences (Default)
export const defaultUserPreferences = {
  sleep: "",
  noise: "",
  cleanliness: "",
  temperature: "",
  social: ""
};