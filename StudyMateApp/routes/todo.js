const express = require('express');
const router = express.Router();

// In-memory store for user tasks
let todos = {};

// Middleware to check login
function checkAuth(req, res, next) {
  if (!req.session.user) return res.redirect('/users/login');
  next();
}

// Display user's todo list
router.get('/', checkAuth, (req, res) => {
  const userTodos = todos[req.session.user] || [];
  res.render('todo', { title: 'My To-Do List', todos: userTodos });
});

// Add a task
router.post('/add', checkAuth, (req, res) => {
  const task = req.body.task;
  if (!todos[req.session.user]) todos[req.session.user] = [];
  todos[req.session.user].push(task);
  res.redirect('/todo');
});

// Delete a task
router.post('/delete', checkAuth, (req, res) => {
  const task = req.body.task;
  todos[req.session.user] = todos[req.session.user].filter(t => t !== task);
  res.redirect('/todo');
});

module.exports = router;
