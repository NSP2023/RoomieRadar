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

        // Compatibility score  0 - 100
        compatibilityScore: {
          type: Number,
          required: true,
          min: 0,
          max: 100,
        },

        // Conflict forecast-"sleep": "low", "cleanliness": "medium"
        conflictForecast: {
          type: Map,
          of: String,
        },

        // one-day simulation
        simulation: [
          {
            time: { type: String }, // "08:00 AM"
            activity: { type: String }, // "Breakfast"
            potentialConflict: { type: String }, // "Low", "High"
          },
        ],

        //"Top Match"
        badges: [
          {
            type: String,
          },
        ],
      },
    ],
  },
  {
    timestamps: true,                        //createAt-UpdatedAt
  }
);

module.exports = mongoose.model('RoommateMatch', RoommateMatchSchema);

//proshop_mern-https://github.com/bradtraversy/proshop_mern.git
