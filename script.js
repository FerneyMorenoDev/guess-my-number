'use strict';

const guess = document.querySelector('.guess');
const checkNumber = document.querySelector('.check');
const mainMessage = document.querySelector('.message');
const score = document.querySelector('.score');
const highscore = document.querySelector('.highscore');
const again = document.querySelector('.again');
const number = document.querySelector('.number');
const body = document.querySelector('body');

let attempts = 20;
const generateRamdomNumber = () => Math.floor(Math.random() * 20) + 1;
let ramdomNumber = generateRamdomNumber();

const displayMessage = message => {
  mainMessage.textContent = message;
};

const updateStyles = (bgColor, guessNumberSize = '15rem') => {
  body.style.backgroundColor = bgColor;
  number.style.width = guessNumberSize;
};

const resetGame = () => {
  number.textContent = '?';
  score.textContent = 20;
  guess.value = '';
  attempts = 20;
};

checkNumber.addEventListener('click', () => {
  const guessNumber = +guess.value;
  if (!guessNumber || guessNumber < 0) {
    displayMessage('⛔️ No Number...');
    return;
  }

  if (attempts === 0) {
    score.textContent = 0;
    displayMessage('💥 You lost the game!');
    updateStyles('#990610');
  } else {
    if (guessNumber === ramdomNumber) {
      highscore.textContent =
        +highscore.textContent === 0 || +highscore.textContent < attempts
          ? attempts
          : +highscore.textContent;
      number.textContent = guessNumber;
      displayMessage('🏆 Correct Number!');
      updateStyles('#60b347', '30rem');
    } else {
      displayMessage(
        guessNumber < ramdomNumber ? '📉 Too low!' : '📈 Too high!'
      );
      attempts--;
      score.textContent = attempts;
    }
  }
});

again.addEventListener('click', () => {
  ramdomNumber = generateRamdomNumber();
  resetGame();
  displayMessage('Start guessing...');
  updateStyles('#222222');
});
