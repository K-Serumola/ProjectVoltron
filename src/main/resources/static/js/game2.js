// Game levels and budget items data
const gameLevels = {
  1: {
    title: "🌱 Beginner Budget",
    description: "Start with basic income and expenses",
    items: [
      { id: 1, name: "💼 Part-time Job", amount: 1200, category: "income", type: "income" },
      { id: 2, name: "🏠 Rent", amount: 800, category: "expenses", type: "expense" },
      { id: 3, name: "🛒 Groceries", amount: 200, category: "expenses", type: "expense" },
      { id: 4, name: "📱 Phone Bill", amount: 50, category: "expenses", type: "expense" },
      { id: 5, name: "🎁 Birthday Money", amount: 100, category: "income", type: "income" },
      { id: 6, name: "🍕 Fast Food", amount: 80, category: "expenses", type: "expense" }
    ]
  },
  2: {
    title: "🏢 Working Professional",
    description: "Manage a full-time salary with more expenses",
    items: [
      { id: 7, name: "💼 Full-time Salary", amount: 3500, category: "income", type: "income" },
      { id: 8, name: "💰 Side Hustle", amount: 400, category: "income", type: "income" },
      { id: 9, name: "🏠 Mortgage", amount: 1400, category: "expenses", type: "expense" },
      { id: 10, name: "🛒 Groceries", amount: 350, category: "expenses", type: "expense" },
      { id: 11, name: "⚡ Utilities", amount: 180, category: "expenses", type: "expense" },
      { id: 12, name: "🚗 Car Payment", amount: 300, category: "expenses", type: "expense" },
      { id: 13, name: "⛽ Gas", amount: 200, category: "expenses", type: "expense" },
      { id: 14, name: "🏥 Insurance", amount: 250, category: "expenses", type: "expense" },
      { id: 15, name: "🎬 Entertainment", amount: 150, category: "expenses", type: "expense" }
    ]
  },
  3: {
    title: "👨‍👩‍👧‍👦 Family Budget Master",
    description: "Complex family budget with investments and savings",
    items: [
      { id: 16, name: "💼 Primary Income", amount: 4500, category: "income", type: "income" },
      { id: 17, name: "💼 Spouse Income", amount: 3200, category: "income", type: "income" },
      { id: 18, name: "📈 Investment Returns", amount: 300, category: "income", type: "income" },
      { id: 19, name: "💰 Rental Income", amount: 600, category: "income", type: "income" },
      { id: 20, name: "🏠 Mortgage", amount: 2200, category: "expenses", type: "expense" },
      { id: 21, name: "🛒 Groceries", amount: 600, category: "expenses", type: "expense" },
      { id: 22, name: "⚡ Utilities", amount: 250, category: "expenses", type: "expense" },
      { id: 23, name: "🚗 Car Payments", amount: 450, category: "expenses", type: "expense" },
      { id: 24, name: "👶 Childcare", amount: 800, category: "expenses", type: "expense" },
      { id: 25, name: "🏥 Health Insurance", amount: 400, category: "expenses", type: "expense" },
      { id: 26, name: "🎓 Student Loans", amount: 300, category: "expenses", type: "expense" },
      { id: 27, name: "💳 Credit Card", amount: 200, category: "expenses", type: "expense" },
      { id: 28, name: "🎯 Savings Goal", amount: 500, category: "expenses", type: "expense" },
      { id: 29, name: "🎬 Family Fun", amount: 200, category: "expenses", type: "expense" }
    ]
  }
};

// Game state
let currentLevel = 1;
let levelScores = { 1: null, 2: null, 3: null };
let placedItems = { income: [], expenses: [] };

// Initialize the game
function initGame(level = currentLevel) {
  currentLevel = level;
  const levelData = gameLevels[currentLevel];
  
  // Update header
  updateHeader();
  
  // Clear containers
  const itemsContainer = document.getElementById('items');
  itemsContainer.innerHTML = '';
  
  // Shuffle items for variety
  const shuffledItems = [...levelData.items].sort(() => Math.random() - 0.5);
  
  shuffledItems.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.className = 'item';
    itemElement.draggable = true;
    itemElement.id = `item-${item.id}`;
    itemElement.innerHTML = `${item.name}<br><span style="font-weight: bold;">$${item.amount}</span>`;
    itemElement.ondragstart = (e) => dragStart(e, item);
    
    itemsContainer.appendChild(itemElement);
  });
  
  // Reset placed items
  placedItems = { income: [], expenses: [] };
  
  // Clear result
  document.getElementById('result').innerHTML = '';
  
  // Clear dropped items from boxes
  document.getElementById('income').innerHTML = '<h3>💰 Income</h3>';
  document.getElementById('expenses').innerHTML = '<h3>💸 Expenses</h3>';
  
  // Update level navigation
  updateLevelNavigation();
}

// Update header with level information
function updateHeader() {
  const levelData = gameLevels[currentLevel];
  const headerHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      <h1>💰 Budget Buddy</h1>
      <h2 style="color: #60b5c2;">${levelData.title}</h2>
      <p style="font-style: italic; color: #666;">${levelData.description}</p>
      <p>Drag items into the correct budget category: Income or Expenses</p>
    </div>
  `;
  
  // Insert header before items container
  const existingHeader = document.getElementById('game-header');
  if (existingHeader) {
    existingHeader.innerHTML = headerHTML;
  } else {
    const header = document.createElement('div');
    header.id = 'game-header';
    header.innerHTML = headerHTML;
    document.body.insertBefore(header, document.getElementById('items'));
  }
}

// Update level navigation buttons
function updateLevelNavigation() {
  let navHTML = '<div style="text-align: center; margin: 20px 0;">';
  
  for (let level = 1; level <= 3; level++) {
    const isActive = level === currentLevel;
    const isCompleted = levelScores[level] !== null;
    const levelData = gameLevels[level];
    
    let buttonClass = 'btn btn-outline-primary';
    let buttonText = `Level ${level}`;
    
    if (isActive) {
      buttonClass = 'btn btn-primary';
    } else if (isCompleted) {
      buttonClass = 'btn btn-success';
      buttonText += ` ✅`;
    }
    
    navHTML += `<button class="${buttonClass}" onclick="initGame(${level})" style="margin: 0 5px;">
                  ${buttonText}
                </button>`;
  }
  
  navHTML += '</div>';
  
  // Insert navigation before items container
  const existingNav = document.getElementById('level-nav');
  if (existingNav) {
    existingNav.innerHTML = navHTML;
  } else {
    const nav = document.createElement('div');
    nav.id = 'level-nav';
    nav.innerHTML = navHTML;
    document.getElementById('items').parentNode.insertBefore(nav, document.getElementById('items'));
  }
}

// Drag start handler
function dragStart(event, item) {
  event.dataTransfer.setData('text/plain', JSON.stringify(item));
  event.target.style.opacity = '0.5';
}

// Allow drop handler
function allowDrop(event) {
  event.preventDefault();
  event.currentTarget.classList.add('highlight');
}

// Drag leave handler
function dragLeave(event) {
  event.currentTarget.classList.remove('highlight');
}

// Drop handler
function drop(event, category) {
  event.preventDefault();
  event.currentTarget.classList.remove('highlight');
  
  const itemData = JSON.parse(event.dataTransfer.getData('text/plain'));
  const draggedElement = document.getElementById(`item-${itemData.id}`);
  
  if (draggedElement) {
    // Remove from original container
    draggedElement.remove();
    
    // Create new element in the drop zone
    const newElement = document.createElement('div');
    newElement.className = 'item';
    newElement.innerHTML = `${itemData.name}<br><span style="font-weight: bold;">$${itemData.amount}</span>`;
    newElement.style.cursor = 'default';
    
    // Add to the appropriate box
    event.currentTarget.appendChild(newElement);
    
    // Track the placement
    placedItems[category].push(itemData);
    
    // Add visual feedback
    newElement.style.animation = 'fadeIn 0.3s ease-in';
    playDropSound();
  }
}

// Calculate budget function
function calculateBudget() {
  const levelData = gameLevels[currentLevel];
  const totalIncome = placedItems.income.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = placedItems.expenses.reduce((sum, item) => sum + item.amount, 0);
  const netBudget = totalIncome - totalExpenses;
  
  const resultDiv = document.getElementById('result');
  
  // Check if all items have been placed
  const totalPlaced = placedItems.income.length + placedItems.expenses.length;
  
  if (totalPlaced === 0) {
    resultDiv.innerHTML = '<p style="color: #ff6b6b;">Please drag some items into the categories first!</p>';
    return;
  }
  
  // Calculate accuracy
  const correctIncome = placedItems.income.filter(item => item.type === 'income').length;
  const correctExpenses = placedItems.expenses.filter(item => item.type === 'expense').length;
  const totalCorrect = correctIncome + correctExpenses;
  const accuracy = Math.round((totalCorrect / levelData.items.length) * 100);
  
  // Store level score
  levelScores[currentLevel] = accuracy;
  
  let resultHTML = `
    <div style="background: white; padding: 20px; border-radius: 10px; margin-top: 20px; border: 2px solid #60b5c2;">
      <h3>💰 Level ${currentLevel} Results</h3>
      <p><strong>Total Income:</strong> $${totalIncome.toLocaleString()}</p>
      <p><strong>Total Expenses:</strong> $${totalExpenses.toLocaleString()}</p>
      <hr>
  `;
  
  if (netBudget > 0) {
    resultHTML += `<p style="color: #28a745; font-size: 1.2em;"><strong>✅ Surplus: $${netBudget.toLocaleString()}</strong></p>
                   <p>Great job! You have money left over.</p>`;
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  } else if (netBudget < 0) {
    resultHTML += `<p style="color: #dc3545; font-size: 1.2em;"><strong>⚠️ Deficit: $${Math.abs(netBudget).toLocaleString()}</strong></p>
                   <p>You're spending more than you earn. Look for ways to reduce expenses!</p>`;
  } else {
    resultHTML += `<p style="color: #ffc107; font-size: 1.2em;"><strong>⚖️ Balanced: $0</strong></p>
                   <p>Perfect balance! Your income exactly matches your expenses.</p>`;
  }
  
  resultHTML += `<hr><p><strong>🎯 Accuracy:</strong> ${accuracy}%</p>`;
  
  if (accuracy === 100) {
    resultHTML += `<p style="color: #28a745;">🌟 Perfect categorization!</p>`;
    setTimeout(() => {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.4 }
      });
    }, 500);
  } else if (accuracy >= 80) {
    resultHTML += `<p style="color: #28a745;">👍 Great job!</p>`;
  } else if (accuracy >= 60) {
    resultHTML += `<p style="color: #ffc107;">👌 Good effort, keep practicing!</p>`;
  } else {
    resultHTML += `<p style="color: #dc3545;">💪 Keep trying, you'll get better!</p>`;
  }
  
  // Add level progression
  if (accuracy >= 70 && currentLevel < 3) {
    resultHTML += `
      <div style="margin-top: 15px; padding: 10px; background: #e8f5e8; border-radius: 5px;">
        <p style="color: #28a745; margin: 0;"><strong>🚀 Level Unlocked!</strong></p>
        <button onclick="initGame(${currentLevel + 1})" class="btn btn-success" style="margin-top: 10px;">
          Continue to Level ${currentLevel + 1} ➡️
        </button>
      </div>`;
  }
  
  resultHTML += `
    <div style="margin-top: 15px;">
      <button onclick="initGame(${currentLevel})" class="btn btn-primary">🔄 Try Again</button>
      ${currentLevel > 1 ? `<button onclick="initGame(${currentLevel - 1})" class="btn btn-outline-secondary">⬅️ Previous Level</button>` : ''}
    </div>
  `;
  
  // Show overall progress
  const completedLevels = Object.values(levelScores).filter(score => score !== null).length;
  if (completedLevels > 1) {
    const avgScore = Math.round(Object.values(levelScores).filter(s => s !== null).reduce((a, b) => a + b, 0) / completedLevels);
    resultHTML += `<hr><p><strong>📊 Overall Progress:</strong> ${completedLevels}/3 levels completed</p>
                   <p><strong>Average Score:</strong> ${avgScore}%</p>`;
  }
  
  resultHTML += '</div>';
  
  resultDiv.innerHTML = resultHTML;
  
  // Update navigation to show completion
  updateLevelNavigation();
}

// Sound effect function
function playDropSound() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (e) {
    // Silently fail if audio context is not available
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('income').addEventListener('dragleave', dragLeave);
  document.getElementById('expenses').addEventListener('dragleave', dragLeave);
  
  // Remove the old header elements from HTML
  const oldH1 = document.querySelector('h1');
  const oldP = document.querySelector('p');
  if (oldH1) oldH1.remove();
  if (oldP) oldP.remove();
  
  // Initialize the game
  initGame(1);
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
  }
  
  .item:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease;
  }
  
  .box.highlight {
    background-color: #f0f8ff;
    border-color: #007bff;
    transform: scale(1.02);
    transition: all 0.2s ease;
  }
  
  .btn {
    margin: 5px;
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.2s ease;
  }
  
  .btn-primary {
    background-color: #007bff;
    color: white;
  }
  
  .btn-outline-primary {
    background-color: transparent;
    color: #007bff;
    border: 2px solid #007bff;
  }
  
  .btn-success {
    background-color: #28a745;
    color: white;
  }
  
  .btn-outline-secondary {
    background-color: transparent;
    color: #6c757d;
    border: 2px solid #6c757d;
  }
  
  .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
`;
document.head.appendChild(style);
