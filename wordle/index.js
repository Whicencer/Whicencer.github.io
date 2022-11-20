const grid = document.querySelector('.grid');
const possibleWords = document.querySelector('.possible-words');

const alphabetKeys = 'abcdefghijklmnopqrstuvwxyz'.split('');
const words = [
  'piano',
  'plane',
  'jumps',
  'plays',
  'ghost',
  'phone',
  'speak',
  'shirt',
  'jeans',
  'light',
  'paper',
  'place',
  'clear'
];

let currentAttempt = '';
let currentWord = getRandomWord();
let currentRow = 0;

function getRandomWord () {
  const wordId = Math.floor(Math.random()*words.length);
  return words[wordId];
}

function buildGrid () {
  for (let i = 0; i < 5; i++) {
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.id = `row_${i}`;
    for (let j = 0; j < 5; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.id = `row_${i}_cell_${j}`;
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }
}

function updateGrid (cell, letter) {
  const cellElement = document.getElementById(`row_${currentRow}_cell_${cell}`);
  cellElement.innerText = letter;
}

function displayPossibleWords () {
  words.forEach(word => {
    const possible = document.createElement('li');
    possible.innerHTML = word;

    possibleWords.appendChild(possible);
  });
}

function getBgColor () {
  for (let i = 0; i < 5; i++) {
    const currentCellEl = document.getElementById(`row_${currentRow}_cell_${i}`);
    let correctLetter = currentWord[i];
    let attemptLetter = currentAttempt[i];
    if (!currentWord.split('').includes(attemptLetter)) {
      currentCellEl.style.backgroundColor = '#404040';
    } else {
      currentCellEl.style.backgroundColor = '#cdcc1d';
    }
    if (correctLetter === attemptLetter) {
      currentCellEl.style.backgroundColor = '#4dc72a';
    }
  }
}

function keyPressHandler (event) {
  currentAttempt = currentAttempt.substring(0, 5);
  if (alphabetKeys.includes(event.key)) {
    currentAttempt += event.key.toLowerCase();
    
    if (currentAttempt.length > 5) return;
    updateGrid(currentAttempt.length-1, currentAttempt[currentAttempt.length-1]);
  }

  if (event.key === 'Backspace') {
    currentAttempt = currentAttempt.substring(0, currentAttempt.length-1);
    updateGrid(currentAttempt.length, '');
  }

  if (event.key === 'Enter') {
    if (currentAttempt.length < 5) alert('Not enough letters');
    if (currentAttempt === currentWord) {
      gameEnd(true);
    }
    if (!words.includes(currentAttempt)) {
      alert('This word does not exist in the dictionary');
      currentRow = currentRow;
    } else {
      if (currentRow >= 4) {
        gameEnd(false);
      } else {
        getBgColor();
        currentRow += 1;
      }

      currentAttempt = '';
    };
  }
}

function gameEnd (status) {
  getBgColor();
  status ? alert('You won') : alert('Game Over');
  document.removeEventListener('keyup', keyPressHandler);
}

displayPossibleWords();
buildGrid();
document.addEventListener('keyup', keyPressHandler);