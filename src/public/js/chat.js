const socket = io();

const container = document.querySelector('.container');
const usernameForm = document.getElementById('username-form');
const username = document.getElementById('username');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messages = document.getElementById('messages');

function createMessage(user, text) {
  const item = document.createElement('li');
  item.textContent = `${user}: ${text}`;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
}

usernameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  container.classList.remove('active');
  socket.emit('client:set-user', { username: username.value }, (payload) => {
    const { user } = payload;
    document.querySelector('h1').innerText += ` | hi ${user} 😀`;
    messageInput.focus();
  });
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (messageInput.value) {
    const text = messageInput.value;
    socket.emit('client:new-message', { text }, (payload) => {
      messageInput.value = '';
      const { user, text } = payload;
      createMessage(user, text);
    });
  }
});

socket.on('client:new-message', (payload) => {
  messageInput.value = '';
  const { user, text } = payload;
  createMessage(user, text);
});
