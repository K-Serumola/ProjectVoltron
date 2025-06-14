// truthDrop.js - Enhanced version with refresh and tracking

const truthDrops = [
  {
    fact: "Using forex or gambling apps can hurt your credit profile.",
    category: "credit health"
  },
  {
    fact: "Not all debt is bad — knowing how to manage debt can improve your financial growth.",
    category: "debt management"
  },
  {
    fact: "Using more than 30% of your credit card limit can lower your credit score.",
    category: "credit health"
  },
  {
    fact: "Defaulting on a loan stays on your record even after it's paid off.",
    category: "debt consequences"
  },
  {
    fact: "Your debit card doesn't build credit. Only credit products do.",
    category: "credit basics"
  },
  {
    fact: "A savings account with no purpose often gets emptied. Set goals.",
    category: "saving habits"
  },
  {
    fact: "Impulse spending gives temporary joy but long-term regret.",
    category: "spending behavior"
  },
  {
    fact: "Checking your credit score regularly does NOT lower it.",
    category: "credit myths"
  },
  {
    fact: "Short-term sacrifices can lead to long-term wealth.",
    category: "wealth building"
  },
  {
    fact: "Many banks offer tools — but it's up to you to use them wisely.",
    category: "financial tools"
  }
];

let viewedDrops = new Set();

function loadRandomTruthDrop() {
  // Reset if all facts have been shown
  if (viewedDrops.size === truthDrops.length) {
    viewedDrops.clear();
  }

  let drop;
  do {
    drop = truthDrops[Math.floor(Math.random() * truthDrops.length)];
  } while (viewedDrops.has(drop.fact));

  viewedDrops.add(drop.fact);

  const display = document.getElementById('truthDrop');
  if (display) {
    display.textContent = drop.fact;
    display.setAttribute('data-category', drop.category);
  }
}

// Optionally support a manual refresh
function setupTruthDropButton(buttonId) {
  const button = document.getElementById(buttonId);
  if (button) {
    button.addEventListener('click', loadRandomTruthDrop);
  }
}

// Initialize on page load
window.onload = () => {
  loadRandomTruthDrop();
  setupTruthDropButton('refreshTruthDrop');
};
