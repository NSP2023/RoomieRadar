// src/data/questionnaireQuestions.js

export const questionnaireQuestions = [
  {
    id: 1,
    question: "🧹 How clean do you like your shared spaces to be?",
    field: "cleanliness",
    options: [
      { text: "I need everything super tidy!", score: 5 },
      { text: "Moderately clean is perfect", score: 4 },
      { text: "A little mess is cozy", score: 3 },
      { text: "Chaos is my comfort zone 😅", score: 1 },
    ],
  },
  {
    id: 2,
    question: "💤 What's your ideal sleep schedule?",
    field: "sleep",
    options: [
      { text: "Early bird ~ 10pm to 6am", score: 5 },
      { text: "Pretty flexible!", score: 4 },
      { text: "Night owl ~ midnight or later", score: 3 },
      { text: "Sleep? What's that? 😴", score: 1 },
    ],
  },
  {
    id: 3,
    question: "🎧 How much noise can you handle while relaxing/studying?",
    field: "noise",
    options: [
      { text: "I need almost complete silence", score: 5 },
      { text: "Some background noise is okay", score: 4 },
      { text: "Noise doesn't really bother me", score: 3 },
      { text: "I love lively & noisy vibes!", score: 1 },
    ],
  },
  {
    id: 4,
    question: "👥 How often do you have friends over?",
    field: "guests",
    options: [
      { text: "Almost every week — my place is the hangout spot!", score: 5 },
      { text: "A few times a month is perfect", score: 4 },
      { text: "Rarely — maybe once every 1–2 months", score: 3 },
      { text: "Almost never — I like my space private", score: 1 },
    ],
  },
  {
    id: 5,
    question: "🍕 Sharing food & stuff — your vibe?",
    field: "sharing",
    options: [
      { text: "What's mine is yours! Community fridge energy ♡", score: 5 },
      { text: "We can share sometimes, but let's talk first", score: 4 },
      { text: "I prefer keeping my things separate", score: 3 },
      { text: "My food is my food. No sharing, please.", score: 1 },
    ],
  },
  {
    id: 6,
    question: "💬 When there's a disagreement, how do you handle it?",
    field: "conflict",
    options: [
      { text: "I talk about it right away — clear the air fast!", score: 5 },
      { text: "I wait a bit, then bring it up calmly", score: 4 },
      { text: "I avoid conflict if possible... maybe drop hints", score: 3 },
      { text: "I just keep it inside until I explode or leave", score: 1 },
    ],
  },
  {
    id: 7,
    question: "🐶 How do you feel about living with pets?",
    field: "petsAttitude",
    options: [
      { text: "I LOVE pets! The more the merrier ♡", score: 5 },
      { text: "I'm okay with pets if they're well-behaved", score: 4 },
      { text: "I'm neutral — I don't mind but also don't need them", score: 3 },
      { text: "I'd rather live without pets (allergies / preference)", score: 1 },
    ],
  },
  {
    id: 8,
    question: "🐾 If there's a pet in the house, how do you feel about helping out?",
    field: "petsResponsibility",
    options: [
      { text: "I'm happy to walk/feed/clean after them — team player!", score: 5 },
      { text: "I can help sometimes, but prefer the owner does most", score: 4 },
      { text: "I'll do the bare minimum if I have to", score: 3 },
      { text: "Pet care is 100% the owner's responsibility — not mine", score: 1 },
    ],
  },
];