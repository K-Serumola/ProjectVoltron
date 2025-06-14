const allLevels = [
  // Level 1: 5 questions
  [
    { name: "Toothpaste", type: "need" },
    { name: "Netflix Subscription", type: "want" },
    { name: "Groceries", type: "need" },
    { name: "Designer Shoes", type: "want" },
    { name: "Electricity Bill", type: "need" }
  ],
  // Level 2: 10 questions
  [
    { name: "Concert Ticket", type: "want" },
    { name: "School Fees", type: "need" },
    { name: "Ice Cream", type: "want" },
    { name: "Rent", type: "need" },
    { name: "Gaming Console", type: "want" },
    { name: "Medicine", type: "need" },
    { name: "Fast Food", type: "want" },
    { name: "Public Transport Fare", type: "need" },
    { name: "Smartphone Upgrade", type: "want" },
    { name: "Internet Plan", type: "need" }
  ],
  // Level 3: 15 questions
  [
    { name: "Movie Night", type: "want" },
    { name: "Winter Jacket", type: "need" },
    { name: "Nail Salon Visit", type: "want" },
    { name: "Data Bundle", type: "need" },
    { name: "Vacation Trip", type: "want" },
    { name: "Basic Phone Plan", type: "need" },
    { name: "Bubble Tea", type: "want" },
    { name: "Water Bill", type: "need" },
    { name: "Gym Membership", type: "want" },
    { name: "Childcare Expenses", type: "need" },
    { name: "Fashion Accessories", type: "want" },
    { name: "Cleaning Supplies", type: "need" },
    { name: "Streaming Upgrade", type: "want" },
    { name: "Pet Food", type: "need" },
    { name: "Luxury Watch", type: "want" }
  ]
];

let currentLevel = 0;
let userAnswers = {};

function renderLevel() {
  const gameDiv = document.getElementById("game");
  const levelHeader = document.getElementById("level-header");
  const resultDiv = document.getElementById("result");
  const nextBtn = document.getElementById("next-btn");

  userAnswers = {};
  gameDiv.innerHTML = "";
  resultDiv.textContent = "";
  nextBtn.style.display = "none";

  levelHeader.innerHTML = `<h2>Level ${currentLevel + 1} of ${allLevels.length}</h2>`;

  const items = allLevels[currentLevel];

  items.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "item";
    div.id = `item-${index}`;
    div.innerHTML = `
      <strong>${item.name}</strong><br>
      <button onclick="select('${index}', 'need')">Need</button>
      <button onclick="select('${index}', 'want')">Want</button>
    `;
    gameDiv.appendChild(div);
  });
}

function select(index, choice) {
  userAnswers[index] = choice;
  const div = document.getElementById(`item-${index}`);
  div.style.border = choice === "need" ? "2px solid green" : "2px solid blue";
}

function submitAnswers() {
  const items = allLevels[currentLevel];
  let correct = 0;

  items.forEach((item, index) => {
    const div = document.getElementById(`item-${index}`);
    const userAnswer = userAnswers[index];

    if (userAnswer === item.type) {
      div.classList.add("correct");
      correct++;
    } else {
      div.classList.add("wrong");
    }
  });

  const resultDiv = document.getElementById("result");
  resultDiv.textContent = `✅ You got ${correct} out of ${items.length} correct.`;

  if (correct > items.length / 2) {
    launchConfetti();
    document.getElementById("next-btn").style.display = currentLevel < allLevels.length - 1 ? "inline-block" : "none";
  } else {
    resultDiv.textContent += " Try again!";
  }
}

function nextLevel() {
  if (currentLevel < allLevels.length - 1) {
    currentLevel++;
    renderLevel();
  } else {
    document.getElementById("game").innerHTML = "<h2>🎉 You completed all levels! Great budgeting!</h2>";
    document.getElementById("result").textContent = "";
    document.getElementById("next-btn").style.display = "none";
  }
}

function launchConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  const confetti = canvas.confetti || (canvas.confetti = window.confetti.create(canvas, { resize: true }));
  confetti({
    particleCount: 120,
    spread: 70,
    origin: { y: 0.6 }
  });
}

// Initialize level 1
renderLevel();
