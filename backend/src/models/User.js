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

    avatar: { type: String, default: "" },
    bio: { type: String, default: "" },
    location: { type: String, default: "" },
    

    //personality label (calculated from answers)
    personality: {
      type: String,
      default: '',
    },

    
    preferences: {
      sleep: { 
        type: String, 
        enum: ['early', 'night', 'midnight'], 
        default: 'night' 
      },
      noise: { 
        type: String, 
        enum: ['sensitive', 'moderate', 'easy'], 
        default: 'moderate' 
      },
      cleanliness: { 
        type: String, 
        enum: ['meticulous', 'balanced', 'relaxed'], 
        default: 'balanced' 
      },
      temperature: { 
        type: String, 
        enum: ['cool', 'justRight', 'warm'], 
        default: 'justRight' 
      },
      social: { 
        type: String, 
        enum: ['introvert', 'balancedSocial', 'social'], 
        default: 'balancedSocial' 
      },
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
