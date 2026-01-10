// backend/src/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // for password hashing

const UserSchema = new mongoose.Schema(
  {
    // Basic info
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },

    // Lifestyle questionnaire answers
    lifestyle: {
      sleep: { type: String, enum: ['Early', 'Late', 'Flexible'], default: 'Flexible' },
      cleanliness: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
      noiseTolerance: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
      // You can add more categories here
    },

    // Optional: personality label (calculated from answers)
    personality: {
      type: String,
      default: '',
    },

    // Optional: user preferences for roommate matching
    preferences: {
      sleep: { type: String, enum: ['Early', 'Late', 'Flexible'], default: 'Flexible' },
      cleanliness: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
      noiseTolerance: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    },
  },
  {
    timestamps: true, // Adds createdAt & updatedAt
  }
);

// Pre-save hook: hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords for login
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
