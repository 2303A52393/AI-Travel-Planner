const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    // Validate Gmail
    if (!email.endsWith('@gmail.com')) {
      return res.status(400).json({ message: 'Only Gmail addresses are allowed' });
    }

    // Validate phone
    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({ message: 'Phone must be 10 digits' });
    }

    // Check existing user
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({ username, email, phone, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;
    console.log(`📡 Login attempt for: ${identifier}`);

    // Lowercase identifier if it looks like an email to ensure match with DB
    const processedIdentifier = identifier.includes('@') ? identifier.toLowerCase() : identifier;

    const user = await User.findOne({
      $or: [{ email: processedIdentifier }, { username: identifier }]
    });

    if (!user) {
      console.log(`❌ User not found: ${processedIdentifier}`);
      return res.status(400).json({ message: 'Account not found with this email/username' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`❌ Password mismatch for: ${user.email}`);
      return res.status(400).json({ message: 'Incorrect password. Please try again.' });
    }

    console.log(`✅ Login successful: ${user.email}`);
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (err) {
    console.error(`💥 Login Error: ${err.message}`);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
