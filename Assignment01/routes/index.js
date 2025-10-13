var express = require('express');
var router = express.Router();

/* Home */
router.get('/', (req, res) => {
  res.render('index', { title: 'Home | Abhinandh Portfolio' });
});

/* About */
router.get('/about', (req, res) => {
  res.render('about', { title: 'About Me | Abhinandh Portfolio' });
});

/* Projects */
router.get('/projects', (req, res) => {
  res.render('projects', { title: 'Projects | Abhinandh Portfolio' });
});

/* Contact */
router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact | Abhinandh Portfolio' });
});

module.exports = router;