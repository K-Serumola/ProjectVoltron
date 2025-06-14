// reflectionJournal.js - MindBank Reflection Journal Logic

let journalEntries = [];

function saveReflection() {
  const reflectionInput = document.getElementById('reflectionInput');
  const entryText = reflectionInput.value.trim();
  if (entryText === '') return;

  const entry = {
    text: entryText,
    date: new Date().toLocaleString()
  };
  
  journalEntries.push(entry);
  updateJournalDisplay();
  reflectionInput.value = '';
}

function updateJournalDisplay() {
  const journalContainer = document.getElementById('journalEntries');
  journalContainer.innerHTML = '';

  journalEntries.forEach(entry => {
    const entryDiv = document.createElement('div');
    entryDiv.classList.add('journal-entry');
    entryDiv.innerHTML = `
      <p class="journal-text">${entry.text}</p>
      <span class="journal-date">${entry.date}</span>
    `;
    journalContainer.appendChild(entryDiv);
  });
}

function exportJournal() {
  const content = journalEntries.map(e => `${e.date}\n${e.text}`).join('\n\n');
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'MindBank_Reflection_Journal.txt';
  link.click();
  URL.revokeObjectURL(url);
}

window.addEventListener('DOMContentLoaded', () => {
  const saveBtn = document.getElementById('saveReflection');
  const exportBtn = document.getElementById('exportJournal');

  if (saveBtn) saveBtn.addEventListener('click', saveReflection);
  if (exportBtn) exportBtn.addEventListener('click', exportJournal);
});
