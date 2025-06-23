const express = require('express');
const router = express.Router(); // ✅ This is what was missing

const db = require('../db');

// Register Route
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const sql = 'INSERT INTO users (name, password) VALUES (?, ?)';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).send('User already exists');
      }
      return res.status(500).send('Database error');
    }
    res.send('Registration successful');
  });
});

// Login Route
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE name = ? AND password = ?';
  db.query(sql, [username, password], (err, result) => {
    if (err) return res.status(500).send('Database error');
    if (result.length > 0) {
      res.send('Login successful');
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});

module.exports = router; // ✅ Export the router
