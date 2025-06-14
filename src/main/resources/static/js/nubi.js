const chatWindow = document.getElementById('chatWindow');
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');

// Add message to the chat window
function addMessage(text, sender = 'nubi') {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  if (sender === 'user') {
    messageDiv.classList.add('user-message');
    messageDiv.textContent = text;
  } else {
    messageDiv.classList.add('nubi-message');

    const avatar = document.createElement('div');
    avatar.classList.add('nubi-avatar');
    avatar.textContent = '🐘';

    const msgText = document.createElement('span');
    msgText.textContent = text;

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(msgText);
  }
  chatWindow.appendChild(messageDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Simulated Nubi response logic
function getNubiResponse(userText) {
  const text = userText.toLowerCase();
  if (text.includes("hello") || text.includes("hi")) {
    return "Hi there! How can I assist with your financial journey today?";
  } else if (text.includes("budget")) {
    return "Budgeting is a great start! Want help building one that fits your lifestyle?";
  } else if (text.includes("save")) {
    return "Saving up? Let’s set a goal and track your progress!";
  } else if (text.includes("investment")) {
    return "Investments can grow your wealth. Want to learn low-risk options?";
  } else if (text.includes("bye") || text.includes("thanks")) {
    return "You're welcome! Come back anytime. 💜";
  } else {
    return "Hmm, I’m still learning. Try asking about savings, budgets, or goals!";
  }
}

// Handle chat form submission
chatForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, 'user');
  userInput.value = '';

  setTimeout(() => {
    const reply = getNubiResponse(text);
    addMessage(reply, 'nubi');
  }, 600);
});

// Initial welcome message
addMessage("Hey! I’m Nubi, your money buddy 🐘💼. What do you need help with today?");
