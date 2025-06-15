let savings = 500;
const goal = 1000;
const savingsDisplay = document.getElementById('savings');
const resultDisplay = document.getElementById('result');
const restartBtn = document.getElementById('restartBtn');

function makeChoice(choice) {
  let change = 0;
  let eventMsg = '';

  if (choice === 'save') {
    change = Math.floor(Math.random() * 201) + 50; // ₱50–250
    eventMsg = "Smart move! You earned ₱" + change;
  } else {
    change = -Math.floor(Math.random() * 201) - 50; // -₱50–250
    const regret = ["Impulse buy!", "Yikes! Subscription trap!", "Late-night delivery regret!"];
    eventMsg = regret[Math.floor(Math.random() * regret.length)] + ` You lost ₱${-change}`;
  }

  savings += change;
  updateDisplay(eventMsg);
  checkGameStatus();
}

function updateDisplay(message) {
  savingsDisplay.innerText = `₱${savings}`;
  resultDisplay.innerText = message;
  resultDisplay.style.color = savings >= goal ? 'green' : (savings <= 0 ? 'red' : '#394063');
}

function checkGameStatus() {
  if (savings >= goal) {
    resultDisplay.innerText = "🎉 You reached your savings goal!";
    endGame();
  } else if (savings <= 0) {
    resultDisplay.innerText = "💸 You're broke! Try again.";
    endGame();
  }
}

function endGame() {
  document.querySelectorAll("button.save, button.spend").forEach(btn => btn.disabled = true);
  restartBtn.style.display = 'inline-block';
}

function restartGame() {
  savings = 500;
  savingsDisplay.innerText = "₱500";
  resultDisplay.innerText = "";
  document.querySelectorAll("button.save, button.spend").forEach(btn => btn.disabled = false);
  restartBtn.style.display = 'none';
}
