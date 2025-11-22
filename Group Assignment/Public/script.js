const socket = io();

// ask for username once
let username = '';
while (!username) {
  username = prompt('Enter your name for chat (classroom):')?.trim();
  if (!username) username = 'Anonymous';
}

// show username on top
document.addEventListener('DOMContentLoaded', () => {
  const userNode = document.getElementById('user-name');
  if (userNode) userNode.textContent = `You: ${username}`;
});

// announce join to server
socket.emit('join', username);

// elements
const messagesEl = document.getElementById('messages');
const form = document.getElementById('message-form');
const input = document.getElementById('msgInput');
const usersList = document.getElementById('users');

// helper to append messages
function appendMessage(contentEl) {
  messagesEl.appendChild(contentEl);
  messagesEl.scrollTop = messagesEl.scrollHeight; // auto-scroll
}

// display chat message
socket.on('chatMessage', (msg) => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('msg');

  const meta = document.createElement('div');
  meta.classList.add('meta');
  meta.innerText = `${msg.username} • ${msg.time}`;

  const text = document.createElement('div');
  text.classList.add('text');
  text.innerText = msg.text;

  const left = document.createElement('div');
  left.appendChild(meta);
  left.appendChild(text);

  wrapper.appendChild(left);
  appendMessage(wrapper);
});

// system messages (join/leave)
socket.on('systemMessage', (txt) => {
  const sys = document.createElement('div');
  sys.classList.add('system');
  sys.innerText = txt;
  appendMessage(sys);
});

// user list update
socket.on('userList', (list) => {
  usersList.innerHTML = '';
  list.forEach((u) => {
    const li = document.createElement('li');
    li.innerText = u;
    usersList.appendChild(li);
  });
});

// form submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (!message) return;
  socket.emit('sendMessage', message);
  input.value = '';
  input.focus();
});
