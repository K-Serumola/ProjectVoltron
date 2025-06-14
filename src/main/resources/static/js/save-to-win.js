let savings = 500;
let level = 1;
let goal = 1000;

const savingsEl = document.getElementById("savings");
const resultEl = document.getElementById("result");
const restartBtn = document.getElementById("restartBtn");

function updateDisplay() {
  savingsEl.textContent = `Level ${level} – Savings: ₱${savings} / ₱${goal}`;
}

function makeChoice(choice) {
  if (savings <= 0 || savings >= goal) return;

  let gain, loss;

  if (level === 1) {
    gain = randomBetween(100, 300);
    loss = randomBetween(100, 200);
  } else if (level === 2) {
    gain = randomBetween(150, 350);
    loss = randomBetween(200, 400);
  } else if (level === 3) {
    gain = randomBetween(200, 400);
    loss = randomBetween(250, 500);
  }

  if (choice === "save") {
    savings += gain;
    resultEl.textContent = `✅ Smart! You saved ₱${gain}.`;
  } else {
    savings -= loss;
    resultEl.textContent = `❌ Bad choice! You spent ₱${loss}.`;
  }

  if (savings < 0) savings = 0;

  updateDisplay();

  if (savings >= goal) {
    if (level < 3) {
      levelUp();
    } else {
      resultEl.textContent = "🎉 Final Goal Achieved! You're a Savings Pro!";
      restartBtn.style.display = "inline-block";
    }
  } else if (savings === 0) {
    resultEl.textContent = "💸 Oops! You're broke. Try again.";
    restartBtn.style.display = "inline-block";
  }
}

function levelUp() {
  level++;
  savings = 500;
  goal = level === 2 ? 2000 : 3000;
  resultEl.textContent = `🌟 Great! Welcome to Level ${level}!`;
  updateDisplay();
}

function restartGame() {
  level = 1;
  savings = 500;
  goal = 1000;
  resultEl.textContent = "";
  restartBtn.style.display = "none";
  updateDisplay();
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

updateDisplay();
