const express = require("express");
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");
const User = require("../models/User"); 
const { signup, login } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.VITE_JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
});

module.exports = router;
