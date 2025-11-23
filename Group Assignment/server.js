const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Serve static frontend files from /public
app.use(express.static('public'));

const port = process.env.PORT || 3000;

let users = {}; // socketId -> username

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // user announces their name after connecting
  socket.on('join', (username) => {
    users[socket.id] = username || 'Anonymous';
    // notify everyone that a user joined
    io.emit('systemMessage', `${users[socket.id]} joined the chat`);
    // optional: send updated user list
    io.emit('userList', Object.values(users));
  });

  // when a message is sent from a client
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
  console.log(`Server listening on http://localhost:${port}`);
});
