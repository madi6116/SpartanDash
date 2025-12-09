const express = require("express");
const router = express.Router();
const User = require("../models/User");

// New user registration
router.post("/signup", async (req, res) => {
    try {
        const { email, password, studentId } = req.body;

        // --- Input Check ---
        if (!email || !password || !studentId)
            return res.status(400).json({ msg: "Missing fields" });

        // --- Duplicate Email ---
        const existing = await User.findOne({ email });
        if (existing)
            return res.status(409).json({ msg: "Email already registered" });

        const userData = {
            email,
            password,
            studentId,
            name: 'New User',
            isProtected: false,
            role: 'customer', // Default role for new users
        };

        // Create the user
        await User.create(userData);

        // Account created
        return res.status(201).json({ msg: "Signup successful" });

    } catch (err) {
        // Log the error
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
});

// Login: handles user authentication
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // --- Find the user ---
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ msg: "User not found" });

        // --- Basic password check ---
        if (user.password !== password)
            return res.status(400).json({ msg: "Incorrect password" });

        // --- Success, send profile data to the frontend ---
        // Send back the necessary profile details (name, role, etc.)
        return res.json({
            msg: "Login successful",
            profile: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });

    } catch (err) {
        // Log the error
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;