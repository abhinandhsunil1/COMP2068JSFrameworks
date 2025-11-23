const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

// Serve static frontend files first
app.use(express.static(path.join(__dirname, 'public')));

// Root route - serves index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;

let users = {}; // socketId -> username

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join', (username) => {
    users[socket.id] = username || 'Anonymous';
    io.emit('systemMessage', `${users[socket.id]} joined the chat`);
    io.emit('userList', Object.values(users));
  });

  socket.on('sendMessage', (msg) => {
    const username = users[socket.id] || 'Anonymous';
    const payload = {
      username,
      text: msg,
      time: new Date().toLocaleTimeString()
    };
    io.emit('chatMessage', payload);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    const username = users[socket.id];
    if (username) {
      io.emit('systemMessage', `${username} left the chat`);
      delete users[socket.id];
      io.emit('userList', Object.values(users));
    }
  });
});

http.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
