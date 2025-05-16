const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Render Register form
router.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

// Register POST
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('register', { title: 'Register', error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, passwordHash: hashedPassword });
    await user.save();

    res.redirect('/api/auth/login');
  } catch (err) {
    res.render('register', { title: 'Register', error: 'Server error' });
  }
});

// Render Login form
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

// Login POST
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.render('login', { title: 'Login', error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.render('login', { title: 'Login', error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Vendos tokenin në cookie
    res.cookie('token', token, { httpOnly: true });

    res.redirect('/');
  } catch (err) {
    res.render('login', { title: 'Login', error: 'Server error' });
  }
});

module.exports = router;
