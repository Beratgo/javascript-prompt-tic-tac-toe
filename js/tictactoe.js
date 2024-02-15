// Tic-Tac-Toe prompt & console game

'use strict'

let gameRoundsPlayed = 0;

let board = [
  null // first one is a placeholder, so we can count from 1 to 9, instead of 0 to 8
  , null
  , null
  , null
  , null
  , null
  , null
  , null
  , null
  , null
];

function explainNumberLocationOnBoard(x){

  let chosenNumberOnBoard = x;

  switch(chosenNumberOnBoard){

    case 1:
      return "TOP LEFT";
      break;
    case 2:
      return "TOP MIDDLE";
      break;
    case 3:
      return "TOP RIGHT";
      break;
    case 4:
      return "MIDDLE LEFT";
      break;
    case 5:
      return "MIDDLE MIDDLE";
      break;
    case 6:
      return "MIDDLE RIGHT";
      break;
    case 7:
      return "BOTTOM LEFT";
      break;
    case 8:
      return "BOTTOM MIDDLE";
      break;
    case 9:
      return "BOTTOM RIGHT";
      break;
    
  };
}

const winningCombinations = [
  // Rows
  [1, 2, 3], [4, 5, 6], [7, 8, 9], 
  // Columns
  [1, 4, 7], [2, 5, 8], [3, 6, 9],
  // Diagonals
  [1, 5, 9], [3, 5, 7]
];

function checkForWinner(player) {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] === player && board[b] === player && board[c] === player) {
      return true; // Player wins
    }
  }
  return false; // No winner yet
}

function checkForTie() {
  for (let i = 1; i < board.length; i++) { 
    if (board[i] === null) {
      return false; // There are still empty spots
    }
  }
  return true; // Tie game
}

export function initiateGame(){// Choose whose turn it is
  if(confirm("Do you want to start a game of Tic-Tac-Toe?") === true){
    playerTurn();
  }
}

// Get a reference to the paragraph element
const startGameWhenClickingParagraph = document.querySelector('.startgame');

// Add a click event listener
startGameWhenClickingParagraph.addEventListener('click', function() {
    // Call your function when the paragraph is clicked
    initiateGame(); 
});

// Get random number between 1-9 for robot
function getRandomNumber() {
  let minNumber = 1;
  let maxNumber = 9;
  return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
}

// Play the human round

function playerTurn(){

  let promptNumber = +prompt(`CROSS: Choose a number between 1 and 9, that's not taken:`, '');
  (promptNumber === 0) ? console.log("0 is an invalid number") : console.log('Cross (Player) Chose Number: ' + promptNumber);

  if(promptNumber >= 1 && promptNumber <= 9){

    let boardIndex = promptNumber;

    if(board[boardIndex] === null){

      console.log(`${promptNumber} is a valid number! ${explainNumberLocationOnBoard(promptNumber)}`);
      board[boardIndex] = 'X'; // human round puts 'X' into array
      console.log(`Finished round: ${++gameRoundsPlayed}! Moving on to the next round.`); // Show which round it was and add a round to the game
      
      if (checkForWinner('X')) {
        console.log('CROSS (Player) wins!');
        // End the game or take relevant action here
      } else if (checkForTie()) {
        console.log("It's a tie!");
        // End the game or take relevant action here
      } else {
        computerTurn();
      }

    }else{
      alert('This spot on the board is already taken! Take a look at your console to find which are taken.');

      // printing out values that are taken; 
      for(let i = 0; i < board.length; i++){
        if(board[i] !== null){
          console.log(i + ': ' + explainNumberLocationOnBoard(i) + ' is taken!\n');
        }
      }

      playerTurn();
    }
  }else{
    alert('Not a valid number between 1-9, trying again!');

      // printing out values that are taken; 
      for(let i = 0; i < board.length; i++){
        if(board[i] !== null){
          console.log(i + ': ' + explainNumberLocationOnBoard(i) + ' is taken!\n');
        }
      }
    
    playerTurn();
  }

}

// Play the computer round

function computerTurn(){

  let robotNumber = getRandomNumber(); // robot gets random number from 1 to 9
  console.log('Circle (Robot) Chose Number: ' + robotNumber);

  if(robotNumber >= 1 && robotNumber <= 9){

    let boardIndex = robotNumber; // for array index

    if(board[boardIndex] === null){

      console.log(`${robotNumber} is a valid number! ${explainNumberLocationOnBoard(robotNumber)}`);
      board[boardIndex] = 'O'; // computer puts 'O' into array
      console.log(`Finished round: ${++gameRoundsPlayed}! Moving on to the next round.`); // Show which round it was and add a round to the game

      if (checkForWinner('O')) {
        console.log('CIRCLE (Computer) wins!');
        // End the game or take relevant action here
      } else if (checkForTie()) {
        console.log("It's a tie!");
        // End the game or take relevant action here
      } else {
        playerTurn();
      }

    }else{
      console.log('The robot tried to take a spot on the board that is already taken... No cheaters!');
      // starting function again till we get a valid value
      computerTurn();
    }
  }else{
    alert('The robot tried an invalid number between 1-9, there must be a bug in the system?!');
    // starting function again till we get a valid value
    computerTurn();
  }

}
