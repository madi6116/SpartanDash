const express = require("express");
const router = express.Router();
const User = require("../models/User");

// SIGN UP
router.post("/signup", async (req, res) => {
  try {
    const { email, password, studentId } = req.body;

    if (!email || !password || !studentId)
      return res.status(400).json({ msg: "Missing fields" });

    // Check duplicate email
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ msg: "Email already registered" });

    await User.create({ email, password, studentId });

    return res.json({ msg: "Signup success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    if (user.password !== password)
      return res.status(400).json({ msg: "Incorrect password" });

    return res.json({ msg: "Login success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
