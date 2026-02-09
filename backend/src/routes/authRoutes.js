const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");

const router = express.Router();

/* REGISTER */
router.post("/register", async (req, res) => {
    try {
        console.log("Data received from Postman:", req.body);
        const { email, password, name } = req.body;
        
        // Manual hashing as done in class
        const hashPassword = await bcrypt.hash(password, 10);
        
        const user = await User.create({ 
            email, 
            password: hashPassword, 
            name 
        });
   
        res.status(201).send({
            success: true,
            message: "User created successfully.",
            user: { id: user._id, email: user.email, name: user.name }
        });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
});

/* LOGIN */
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "No user found!" });

    // Manual comparison as done in class
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_Secret, {
        expiresIn: "7d", 
    });

    res.status(200).send({
        success: true,
        message: "Logged in successfully!",
        token: "Bearer " + token,
        user: {
            id: user._id,
            name: user.name,
            preferences: user.preferences 
        }
    });
});

module.exports = router;