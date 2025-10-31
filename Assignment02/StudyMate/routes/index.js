var express = require('express');
var router = express.Router();

/* GET home page */
router.get('/', function(req, res) {
  res.render('index', { title: 'StudyMate', message: 'Welcome to StudyMate!' });
});

/* GET about page */
router.get('/about', function(req, res) {
  res.render('about', { title: 'About StudyMate', message: 'Learn more about us here.' });
});

/* GET contact page */
router.get('/contact', function(req, res) {
  res.render('contact', { title: 'Contact StudyMate', message: 'Reach out to us!' });
});

/* POST contact form */
router.post('/contact', function(req, res) {
  const { name, email, message } = req.body;
  console.log(`Contact form submitted: ${name}, ${email}, ${message}`);
  res.render('contact', { title: 'Contact StudyMate', message: 'Thanks! Your message has been sent.' });
});

module.exports = router;