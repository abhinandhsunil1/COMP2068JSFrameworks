const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// Temporary in-memory users array
let users = [];

// Register page
router.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

// Handle registration
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.redirect('/users/login');
});

// Login page
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

// Handle login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.user = user.username;
    res.redirect('/resources');
  } else {
    res.render('login', { title: 'Login', error: 'Invalid username or password' });
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
