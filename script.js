'use strict';

// Selecting Elements
const scorePlayer0 = document.getElementById('score--0'); // Player 0's total score
const scorePlayer1 = document.getElementById('score--1'); // Player 1's total score
const diceElement = document.querySelector('.dice'); // Dice image element
const currentElement0 = document.getElementById('current--0'); // Player 0's current score
const currentElement1 = document.getElementById('current--1'); // Player 1's current score
const player00El = document.querySelector('.player--0'); // Player 0's panel
const player01El = document.querySelector('.player--1'); // Player 1's panel
const btnNew = document.querySelector('.btn--new'); // New game button
const btnRoll = document.querySelector('.btn--roll'); // Roll dice button
const btnHold = document.querySelector('.btn--hold'); // Hold score button

// Initializing game state variables
let scores, currentScore, activePlayer, playing;

// Function to initialize/reset the game
const init = function () {
  scores = [0, 0]; // Total scores for both players
  currentScore = 0; // Current score for the active player
  activePlayer = 0; // Active player (0 or 1)
  playing = true; // Game state (playing or not)

  // Resetting UI elements
  scorePlayer0.textContent = 0;
  scorePlayer1.textContent = 0;
  currentElement0.textContent = 0;
  currentElement1.textContent = 0;

  diceElement.classList.add('hidden'); // Hide the dice initially
  player00El.classList.remove('player--winner'); // Remove winner class from player 0
  player01El.classList.remove('player--winner'); // Remove winner class from player 1
  player00El.classList.add('player--active'); // Set player 0 as active
  player01El.classList.remove('player--active'); // Ensure player 1 is not active
};
init(); // Call the init function to start the game

// Function to switch the active player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; // Reset current score display
  currentScore = 0; // Reset current score
  activePlayer = activePlayer === 0 ? 1 : 0; // Switch active player
  player00El.classList.toggle('player--active'); // Toggle active class for player 0
  player01El.classList.toggle('player--active'); // Toggle active class for player 1
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generate a random dice roll (1-6)
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display the dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;

    // Check if the rolled dice is not 1
    if (dice !== 1) {
      // Add dice value to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

// Hold score functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to active player's total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if active player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // End the game
      playing = false;
      diceElement.classList.add('hidden'); // Hide the dice
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner'); // Add winner class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active'); // Remove active class
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

// Reset game functionality
btnNew.addEventListener('click', init); // Reset the game when the new game button is clicked
