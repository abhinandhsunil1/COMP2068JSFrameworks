const express = require('express');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
  res.render('index', { title: 'StudyMate - Home' });
});

// About page
router.get('/about', (req, res) => {
  res.render('about', { title: 'About StudyMate' });
});

// Contact page
router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact' });
});

module.exports = router;
