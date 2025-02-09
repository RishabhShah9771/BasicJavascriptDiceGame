// 'use strict';
// //getElementById is faster then querySelecter

// //Selecting Elements
// const scorePlayer0 = document.getElementById('score--0');
// const scorePlayer1 = document.getElementById('score--1');
// const diceElement = document.querySelector('.dice');
// const currentElement0 = document.getElementById('current--0');
// const currentElement1 = document.getElementById('current--1');
// const player00El = document.querySelector('.player--0');
// const player01El = document.querySelector('.player--1');

// const btnNew = document.querySelector('.btn--new');
// const btnRoll = document.querySelector('.btn--roll');
// const btnHold = document.querySelector('.btn--hold');

// scorePlayer0.textContent = 0;
// scorePlayer1.textContent = 0;
// diceElement.classList.add('hidden');
// const scores = [0, 0];
// let currentScore = 0;
// let activePlayer = 0;

// //rolling dice functionality
// btnRoll.addEventListener('click', function () {
//   //Generating random number
//   const dice = Math.trunc(Math.random() * 6) + 1;
//   //Display Dice
//   diceElement.classList.remove('hidden');
//   diceElement.src = `dice-${dice}.png`;

//   //Check for rolled 1: true change player
//   if (dice !== 1) {
//     //Add the dice to curren score
//     currentScore += dice;
//     document.getElementById(`current--${activePlayer}`).textContent =
//       currentScore;
//   } else {
//     //Switch to next player
//     document.getElementById(`current--${activePlayer}`).textContent = 0;
//     currentScore = 0;
//     activePlayer = activePlayer === 0 ? 1 : 0;
//     player00El.classList.toggle('player--active');
//     player01El.classList.toggle('player--active');
//   }
// });
// btnHold.addEventListener('click', function () {
//   // Add current score to active player's score
//   scores[activePlayer] += currentScore;
//   document.getElementById(`score--${activePlayer}`).textContent =
//     scores[activePlayer];

//   // Check if player's score is >= 100
//   if (scores[activePlayer] >= 100) {
//     // Finish the game
//     document
//       .querySelector(`.player--${activePlayer}`)
//       .classList.add('player--winner');
//     document
//       .querySelector(`.player--${activePlayer}`)
//       .classList.remove('player--active');
//     diceElement.classList.add('hidden');
//   } else {
//     // Switch to the next player
//     document.getElementById(`current--${activePlayer}`).textContent = 0;
//     currentScore = 0;
//     activePlayer = activePlayer === 0 ? 1 : 0;
//     player00El.classList.toggle('player--active');
//     player01El.classList.toggle('player--active');
//   }
// });
// btnNew.addEventListener('click', function () {
//   // Reset scores and current score
//   scores[0] = 0;
//   scores[1] = 0;
//   currentScore = 0;
//   activePlayer = 0;

//   // Reset UI
//   scorePlayer0.textContent = 0;
//   scorePlayer1.textContent = 0;
//   currentElement0.textContent = 0;
//   currentElement1.textContent = 0;
//   diceElement.classList.add('hidden');
//   player00El.classList.remove('player--winner');
//   player01El.classList.remove('player--winner');
//   player00El.classList.add('player--active');
//   player01El.classList.remove('player--active');
// });

'use strict';

// Selecting Elements
const scorePlayer0 = document.getElementById('score--0');
const scorePlayer1 = document.getElementById('score--1');
const diceElement = document.querySelector('.dice');
const currentElement0 = document.getElementById('current--0');
const currentElement1 = document.getElementById('current--1');
const player00El = document.querySelector('.player--0');
const player01El = document.querySelector('.player--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Initializing game state
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scorePlayer0.textContent = 0;
  scorePlayer1.textContent = 0;
  currentElement0.textContent = 0;
  currentElement1.textContent = 0;

  diceElement.classList.add('hidden');
  player00El.classList.remove('player--winner');
  player01El.classList.remove('player--winner');
  player00El.classList.add('player--active');
  player01El.classList.remove('player--active');
};
init();

// Switch player function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player00El.classList.toggle('player--active');
  player01El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Hold score functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

// Reset game functionality
btnNew.addEventListener('click', init);
