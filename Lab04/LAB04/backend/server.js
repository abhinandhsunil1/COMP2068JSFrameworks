const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

let projects = [
  { _id: 1, name: 'Project 1', dueDate: '2025-12-01', course: 'COMP2068' },
  { _id: 2, name: 'Project 2', dueDate: '2025-12-10', course: 'COMP2068' }
];

app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.post('/api/projects', (req, res) => {
  const newProject = { ...req.body, _id: Date.now() };
  projects.push(newProject);
  res.status(201).json(newProject);
});

app.delete('/api/projects/:id', (req, res) => {
  const id = parseInt(req.params.id);
  projects = projects.filter(p => p._id !== id);
  res.sendStatus(204);
});

app.put('/api/projects/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = projects.findIndex(p => p._id === id);
  if (index !== -1) {
    projects[index] = { ...projects[index], ...req.body };
    res.status(202).json(projects[index]);
  } else {
    res.sendStatus(400);
  }
});

app.listen(3001, () => console.log('Backend running on port 3001'));