const express = require('express');
const router = express.Router();

const User = require('../models/User');

// Register Route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    // Create and save new user
    const newUser = new User({ username, password });
    await newUser.save();
    res.send('Registration successful');
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).send('Database error');
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user with matching credentials
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }

    res.send('Login successful');
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).send('Database error');
  }
});

module.exports = router;
