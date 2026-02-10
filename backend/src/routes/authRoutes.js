const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");

const router = express.Router();

/* REGISTER */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, age, university, department, year, hall } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false,
        message: "Name, email, and password are required" 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: "Email already registered" 
      });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      age,
      university,
      department,
      year,
      hall,
    });

    // Generate token
    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      success: true,
      message: "User created successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        university: user.university,
        department: user.department,
        year: user.year,
        hall: user.hall,
        avatar: user.avatar,
        lifestyle: user.lifestyle,
        preferences: user.preferences,
      },
      token: "Bearer " + token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error during registration" 
    });
  }
});

/* LOGIN */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: "Email and password are required" 
      });
    }

    // Find user and include password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid credentials" 
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid credentials" 
      });
    }

    // Generate token
    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        university: user.university,
        department: user.department,
        year: user.year,
        hall: user.hall,
        bio: user.bio,
        avatar: user.avatar,
        whatsapp: user.whatsapp,
        lifestyle: user.lifestyle,
        preferences: user.preferences,
      },
      token: "Bearer " + token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error during login" 
    });
  }
});

/* GET PROFILE - Protected Route */
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        age: req.user.age,
        university: req.user.university,
        department: req.user.department,
        year: req.user.year,
        hall: req.user.hall,
        bio: req.user.bio,
        avatar: req.user.avatar,
        whatsapp: req.user.whatsapp,
        lifestyle: req.user.lifestyle,
        preferences: req.user.preferences,
      },
    });
  }
);

/* UPDATE PROFILE - Protected Route */
router.put(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const updates = req.body;
      const userId = req.user._id;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ 
          success: false,
          message: "User not found" 
        });
      }

      // Update lifestyle
      if (updates.lifestyle) {
        user.lifestyle = { ...user.lifestyle, ...updates.lifestyle };
      }

      // Update preferences
      if (updates.preferences) {
        user.preferences = { ...user.preferences, ...updates.preferences };
      }

      // Update profile fields
      const profileFields = [
        'name', 'bio', 'university', 'department', 
        'year', 'hall', 'age', 'whatsapp'
      ];
      
      profileFields.forEach((field) => {
        if (updates[field] !== undefined) {
          user[field] = updates[field];
        }
      });

      await user.save();

      res.status(200).json({
        success: true,
        message: "Profile updated successfully!",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          age: user.age,
          university: user.university,
          department: user.department,
          year: user.year,
          hall: user.hall,
          bio: user.bio,
          avatar: user.avatar,
          whatsapp: user.whatsapp,
          lifestyle: user.lifestyle,
          preferences: user.preferences,
        },
      });
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ 
        success: false,
        message: "Server error during update" 
      });
    }
  }
);

/* GET USER BY ID - Protected Route (for viewing other users) */
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      
      if (!user) {
        return res.status(404).json({ 
          success: false,
          message: "User not found" 
        });
      }

      // Return public profile (don't send email/password)
      res.status(200).json({
        success: true,
        _id: user._id,
        name: user.name,
        age: user.age,
        university: user.university,
        department: user.department,
        year: user.year,
        hall: user.hall,
        bio: user.bio,
        avatar: user.avatar,
        whatsapp: user.whatsapp,
        lifestyle: user.lifestyle,
      });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ 
        success: false,
        message: "Server error" 
      });
    }
  }
);

module.exports = router;