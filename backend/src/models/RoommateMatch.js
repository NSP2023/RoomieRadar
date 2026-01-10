// backend/src/models/RoommateMatch.js

const mongoose = require('mongoose');

const RoommateMatchSchema = new mongoose.Schema(
  {
    // The user for whom these matches are stored
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // Array of potential matches
    matches: [
      {
        // The matched roommate user
        roommate: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },

        // Compatibility score between 0 and 100
        compatibilityScore: {
          type: Number,
          required: true,
          min: 0,
          max: 100,
        },

        // Conflict forecast (e.g., {"sleep": "low", "cleanliness": "medium"})
        conflictForecast: {
          type: Map,
          of: String,
        },

        // Optional one-day simulation timeline
        simulation: [
          {
            time: { type: String }, // e.g., "08:00 AM"
            activity: { type: String }, // e.g., "Breakfast"
            potentialConflict: { type: String }, // e.g., "Low", "High"
          },
        ],

        // Optional badges or labels like "Top Match"
        badges: [
          {
            type: String,
          },
        ],
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('RoommateMatch', RoommateMatchSchema);
