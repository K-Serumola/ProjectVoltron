const terms = [
  { term: "Savings Account", definition: "A bank account that earns interest" },
  { term: "Loan", definition: "Money you borrow and must repay with interest" },
  { term: "Budget", definition: "A plan for how to spend and save your money" },
  { term: "Credit Score", definition: "A number that shows how trustworthy you are with credit" },
  { term: "ATM", definition: "A machine that lets you take out or deposit money" },
  { term: "Interest", definition: "Extra money paid on loans or earned on savings" }
];

let cards = [];
let firstCard = null;
let secondCard = null;
let matchedPairs = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function setupGame() {
  const board = document.getElementById("game-board");
  const result = document.getElementById("result");
  board.innerHTML = '';
  result.textContent = '';
  matchedPairs = 0;
  firstCard = secondCard = null;

  // Create card pairs
  cards = [];
  terms.forEach((item, index) => {
    cards.push({ id: index, type: "term", content: item.term });
    cards.push({ id: index, type: "definition", content: item.definition });
  });

  cards = shuffle(cards);

  cards.forEach((cardData, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.index = i;
    card.dataset.id = cardData.id;
    card.dataset.type = cardData.type;
    card.textContent = "❓";
    card.addEventListener("click", () => flipCard(card, cardData));
    board.appendChild(card);
  });
}

function flipCard(card, data) {
  if (card.classList.contains("flipped") || card.classList.contains("matched")) return;

  card.classList.add("flipped");
  card.textContent = data.content;

  if (!firstCard) {
    firstCard = { card, data };
  } else {
    secondCard = { card, data };

    if (
      firstCard.data.id === secondCard.data.id &&
      firstCard.data.type !== secondCard.data.type
    ) {
      // Match
      firstCard.card.classList.add("matched");
      secondCard.card.classList.add("matched");
      matchedPairs++;
      firstCard = secondCard = null;

      if (matchedPairs === terms.length) {
        document.getElementById("result").textContent = "🎉 You matched all terms!";
      }
    } else {
      // Not a match
      setTimeout(() => {
        firstCard.card.classList.remove("flipped");
        secondCard.card.classList.remove("flipped");
        firstCard.card.textContent = "❓";
        secondCard.card.textContent = "❓";
        firstCard = secondCard = null;
      }, 1000);
    }
  }
}

// Start the game
setupGame();
