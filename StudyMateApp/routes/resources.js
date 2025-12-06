const express = require('express');
const router = express.Router();

function checkAuth(req, res, next) {
  if (req.session.user) {
    next(); // user is logged in, continue
  } else {
    res.redirect('/users/login'); // redirect to login if not
  }
}

// Apply to all routes in this file
router.use(checkAuth);

let resources = []; // temporary DB

// Show all resources
router.get('/', (req, res) => {
  res.render('resources', { title: 'Resources', resources });
});

// Add resource (POST)
router.post('/add', (req, res) => {
  const { title, link } = req.body;
  resources.push({ title, link });
  res.redirect('/resources');
});

// Delete resource
router.post('/delete', (req, res) => {
  const { title } = req.body;
  resources = resources.filter(r => r.title !== title);
  res.redirect('/resources');
});

module.exports = router;
