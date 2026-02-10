// backend/src/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // for password hashing

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: { type: String, required: [true, 'Email is required'], unique: true },
    password: { type: String, required: true, minlength: 6 },

    // Profile info 
    age: { type: Number ,min: [17, 'You must be at least 17 years old'],},
    university: { type: String },
    department: { type: String }, 
    year: { type: String },       
    hall: { type: String },       
    bio: { type: String },
    avatar: { type: String ,
      default: function () {
        return `https://api.dicebear.com/9.x/avataaars/svg?seed=${this._id || this.name || 'user'}&backgroundColor=ffdfbf`;
      },
    },

    //  Lifestyle 
    lifestyle: {
      cleanliness: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
      sleep: { type: String, enum: ['Early', 'Late', 'Flexible'], default: 'Flexible' },
      noiseTolerance: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
      
      
      guests: { type: String, enum: ['Rarely', 'Sometimes', 'Often'], default: 'Sometimes' },
      sharing: { type: String, enum: ['Private', 'Flexible', 'Shared'], default: 'Flexible' },
      conflict: { type: String, enum: ['Avoidant', 'Calm', 'Immediate'], default: 'Calm' },
      
      pets: { type: String, enum: ['Yes', 'No', 'Maybe', 'Flexible'], default: 'Flexible' },
    },

    // Preferences (What they want in a roomie) 
    
    preferences: {
      cleanliness: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
      sleep: { type: String, enum: ['Early', 'Late', 'Flexible'], default: 'Flexible' },
      noiseTolerance: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
      guests: { type: String, enum: ['Rarely', 'Sometimes', 'Often'], default: 'Sometimes' },
      sharing: { type: String, enum: ['Private', 'Flexible', 'Shared'], default: 'Flexible' },
      conflict: { type: String, enum: ['Avoidant', 'Calm', 'Immediate'], default: 'Calm' },
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('User', UserSchema);