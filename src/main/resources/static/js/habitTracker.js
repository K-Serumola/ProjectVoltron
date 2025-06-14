// habitTracker.js - Simple and Interactive Financial Habit Tracker

const habits = [
  {
    id: 'habit1',
    title: 'Checked my budget today',
    frequency: 'daily',
    log: []
  },
  {
    id: 'habit2',
    title: 'Saved money this week',
    frequency: 'weekly',
    log: []
  },
  {
    id: 'habit3',
    title: 'Avoided impulse buying',
    frequency: 'daily',
    log: []
  }
];

function markHabitCompleted(habitId) {
  const habit = habits.find(h => h.id === habitId);
  if (!habit) return;

  const today = new Date().toISOString().split('T')[0];
  if (!habit.log.includes(today)) {
    habit.log.push(today);
  }

  updateHabitDisplay();
}

function updateHabitDisplay() {
  const container = document.getElementById('habitContainer');
  if (!container) return;

  container.innerHTML = '';

  habits.forEach(habit => {
    const habitDiv = document.createElement('div');
    habitDiv.classList.add('habit-item');

    const completedToday = habit.log.includes(new Date().toISOString().split('T')[0]);
    const streak = calculateStreak(habit);

    habitDiv.innerHTML = `
      <h3>${habit.title}</h3>
      <button onclick="markHabitCompleted('${habit.id}')" ${completedToday ? 'disabled' : ''}>
        ${completedToday ? 'Done Today' : 'Mark as Done'}
      </button>
      <p>Streak: ${streak} ${habit.frequency === 'daily' ? 'days' : 'weeks'}</p>
    `;

    container.appendChild(habitDiv);
  });
}

function calculateStreak(habit) {
  const logDates = habit.log.sort();
  if (logDates.length === 0) return 0;

  const today = new Date();
  let streak = 0;

  for (let i = logDates.length - 1; i >= 0; i--) {
    const logDate = new Date(logDates[i]);
    const diff = Math.floor((today - logDate) / (1000 * 60 * 60 * 24));
    
    if ((habit.frequency === 'daily' && diff === streak) ||
        (habit.frequency === 'weekly' && diff <= 7 * (streak + 1))) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

function resetAllHabits() {
  habits.forEach(h => h.log = []);
  updateHabitDisplay();
}

window.addEventListener('DOMContentLoaded', () => {
  updateHabitDisplay();

  const resetBtn = document.getElementById('resetHabits');
  if (resetBtn) resetBtn.addEventListener('click', resetAllHabits);
});
