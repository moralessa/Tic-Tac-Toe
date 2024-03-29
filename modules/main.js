/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
/* eslint-disable default-case */
/* eslint-disable no-plusplus */
/* eslint linebreak-style: ["error", "windows"] */
import { bootUpGame, startGameAnimations } from './homeScreenDom.js';
import { bootLoadScreen } from './loadScreenDom.js';
import {
  bootPlayScreen,
  updateDomRoundCount,
  updateDomWins,
  highLightActivePlayer,
  endGameDomAnimation,
  updateDomBoard,
  highLightRoundWinner,
  clearDomBoard,
  clearDomStatus,
  resetRoundWinnerHighlight,
} from './playScreenDom.js';

// Variable declarations for Game Functionality
const startButton = document.getElementById('start');
const returnButton = document.querySelector('.return');
let selectedPlayers;
let playerOneWins = 0;
let playerTwoWins = 0;
const spaces = document.querySelectorAll('.space');
let playerSign = 'X';
let roundCount = 0;
let gameBoard = ['', '', '', '', '', '', '', '', ''];
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Simple event listener to reload page when button is click
returnButton.addEventListener('click', () => {
  // eslint-disable-next-line no-restricted-globals
  location.reload();
});

// Function that initates the game
function gameStart() {
  removeSpaceClickEvent();
  playerLogic();
  highLightActivePlayer(playerSign);
}

// Start button event listener that calls on imported functions to boot corresponding screens
// and start game functionality. The load screens are implemented using promises
startButton.addEventListener('click', () => {
  selectedPlayers = startGameAnimations();
  setTimeout(() => {
    bootLoadScreen(selectedPlayers).then(() => {
      setTimeout(() => {
        bootPlayScreen(selectedPlayers).then(() => {
          gameStart();
        });
      }, 1000);
    });
  }, 2000);
});

// Function to check if a space is taken
function spaceTaken(space) {
  if (space === 'X' || space === 'O') {
    return true;
  }

  return false;
}

// Function to check round winner
function checkRoundWinner(sign, board) {
  let combo;
  for (let i = 0; i < winningCombinations.length; i++) {
    let won = true;
    for (let j = 0; j < winningCombinations[i].length; j++) {
      if (board[winningCombinations[i][j]] !== sign) {
        won = false;
        break;
      }
    }
    if (won) {
      combo = winningCombinations[i];
    }
  }

  return [combo, sign];
}

// Function to check for round tie
function checkRoundTie(board) {
  let full = true;
  for (let i = 0; i < gameBoard.length; i++) {
    if (board[i] !== 'X' && board[i] !== 'O') {
      full = false;
      break;
    }
  }
  return full;
}

// Function used to swap turns each time a player switches
function swapTurn() {
  if (playerSign === 'X') {
    playerSign = 'O';
  } else {
    playerSign = 'X';
  }
}

// Function used to update the game board based on the dom board
function updateGameBoard() {
  let count = 0;
  spaces.forEach((space) => {
    gameBoard[count] = space.textContent;
    count++;
  });
}

// Function used to updatewins
function updateWins(winner) {
  if (winner === 'X') {
    playerOneWins++;
  } else if (winner === 'O') {
    playerTwoWins++;
  }
}

// Funciton called to end game
function endGame(winner = 'tie') {
  clearDomStatus();
  resetRoundWinnerHighlight();
  if (winner === 'X') {
    endGameDomAnimation('X', selectedPlayers[0]);
  } else if (winner === 'O') {
    endGameDomAnimation('O', selectedPlayers[1]);
  } else if (winner === 'tie') {
    endGameDomAnimation(null, null);
  }
}

// Function called to determine game winner based on different cases
function determineGameWinner() {
  if (roundCount === 5) {
    if (playerOneWins > playerTwoWins) {
      endGame('X');
    } else if (playerOneWins < playerTwoWins) {
      endGame('O');
    } else if (playerOneWins === playerTwoWins) {
      endGame();
    }
  } else if (playerOneWins >= 3) {
    endGame('X');
  } else if (playerTwoWins >= 3) {
    endGame('O');
  } else {
    setTimeout(() => {
      playerSign = 'X';
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      clearDomBoard();
      clearDomStatus();
      gameStart();
    }, 2000);
  }
}

// Function used to handle clicks on spaces by each player
function handleClick(e) {
  const space = e.target;
  if (!spaceTaken(space.textContent)) {
    space.textContent = playerSign;
    updateGameBoard();
    updateRoundLogic();
  }
}

// Function used to remove space click event after each player move
function removeSpaceClickEvent() {
  spaces.forEach((space) => {
    space.removeEventListener('click', handleClick);
  });
}

// Function used to end the round
function endRound(winner, combo) {
  removeSpaceClickEvent();
  roundCount++;
  updateWins(winner);
  updateDomWins(playerOneWins, playerTwoWins);
  highLightRoundWinner(winner, selectedPlayers[0], selectedPlayers[1], combo);
  updateDomRoundCount(roundCount);
  setTimeout(() => {
    determineGameWinner();
  }, 1000);
}

// Function that updates each round logic
function updateRoundLogic() {
  if (checkRoundWinner(playerSign, gameBoard)[0]) {
    endRound(playerSign, checkRoundWinner(playerSign, gameBoard)[0]);
  } else if (checkRoundTie(gameBoard)) {
    endRound();
  } else {
    swapTurn();
    gameStart();
  }
}

// Function used for the player move logic which implements a event listener on the spaces
function playerMove() {
  spaces.forEach((space) => {
    space.addEventListener('click', handleClick, { once: true });
  });
}

// Mini max algorithm used to implement the 'impossible' difficulty for the ai
function miniMax(board, depth, isMaximizing, currentPlayerSign) {
  let opposingPlayerSign;
  currentPlayerSign === 'X'
    ? (opposingPlayerSign = 'O')
    : (opposingPlayerSign = 'X');

  if (checkRoundWinner(currentPlayerSign, board)[0]) {
    return 1;
  }
  if (checkRoundWinner(opposingPlayerSign, board)[0]) {
    return -1;
  }

  if (checkRoundTie(board)) {
    return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!spaceTaken(board[i])) {
        board[i] = currentPlayerSign;
        const score = miniMax(board, depth + 1, false, currentPlayerSign);
        board[i] = '';
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  }
  let bestScore = Infinity;
  for (let i = 0; i < board.length; i++) {
    if (!spaceTaken(board[i])) {
      board[i] = opposingPlayerSign;
      const score = miniMax(board, depth + 1, true, currentPlayerSign);
      board[i] = '';
      bestScore = Math.min(score, bestScore);
    }
  }
  return bestScore;
}

// Easy bot ai that picks a random spot on the board
function botMoveEasy() {
  let index = Math.floor(Math.random() * gameBoard.length);
  while (spaceTaken(gameBoard[index])) {
    index = Math.floor(Math.random() * gameBoard.length);
  }
  gameBoard[index] = playerSign;
  updateDomBoard(index, playerSign);
  setTimeout(() => {
    updateRoundLogic();
  }, 1000);
  return true;
}

// Impossible bot ai that uses the recursive function minimax to make the most optimal decision
function botMoveImpossible() {
  let bestScore = -Infinity;
  let bestMove;
  for (let i = 0; i < gameBoard.length; i++) {
    if (!spaceTaken(gameBoard[i])) {
      gameBoard[i] = playerSign;
      const score = miniMax(gameBoard, 0, false, playerSign);
      gameBoard[i] = '';
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  gameBoard[bestMove] = playerSign;
  updateDomBoard(bestMove, playerSign);
  setTimeout(() => {
    updateRoundLogic();
  }, 1000);
  return true;
}

// Hard bot ai that invokes either botMoveEasy or botMoveImpossible based on a random selection
function botMoveHard() {
  const choice = Math.floor(Math.random() * 2);
  if (choice) {
    botMoveImpossible();
  } else {
    botMoveEasy();
  }
}

// Function used to calculate the player difficulty
function calculateDifficulty(player) {
  switch (player.textContent) {
    case 'Easy':
      return 1;
    case 'Hard':
      return 2;
    case 'Impossible':
      return 3;
  }

  return 4;
}

// Function to define the player logic
function playerLogic() {
  let difficulty;
  if (playerSign === 'X') {
    difficulty = calculateDifficulty(selectedPlayers[0]);
  } else {
    difficulty = calculateDifficulty(selectedPlayers[1]);
  }

  switch (difficulty) {
    case 1:
      botMoveEasy();
      break;
    case 2:
      botMoveHard();
      break;
    case 3:
      botMoveImpossible();
      break;
    case 4:
      playerMove();
  }
}

// Invoked function to boot up the game
bootUpGame();
