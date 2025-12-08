const express = require("express");
const router = express.Router();
const User = require("../models/User");

// new user registration
router.post("/signup", async (req, res) => {
  try {
    const { email, password, studentId } = req.body;

    // basic input check
    if (!email || !password || !studentId)
      return res.status(400).json({ msg: "Missing fields" });

    // see if email is already in the database
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ msg: "Email already registered" });
    await User.create({ email, password, studentId });

    // success: account created
    return res.json({ msg: "Signup success" });
  } catch (err) {
    // log the error
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// login: handles user authentication
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // find the user by email
    const user = await User.findOne({ email });
    if (!user) 
        return res.status(400).json({ msg: "User not found" });

    // basic password check (mismatched password)
    if (user.password !== password)
      return res.status(400).json({ msg: "Incorrect password" });

    // success, send a response to the frontend to set the session
    return res.json({ msg: "Login success" });
  } catch (err) {
    // Log the error
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;