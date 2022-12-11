import { bootUpGame, startGameAnimations } from "./homeScreenDom.js";
import { bootLoadScreen } from "./loadScreenDom.js";
import { bootPlayScreen, updateRoundCount, updateWins, highLightActivePlayer, updateDomBoard } from "./playScreenDom.js";

const startButton = document.getElementById('start');
let selectedPlayers;
let playerOneWins = 0;
let playerTwoWins = 0;
const spaces = document.querySelectorAll('.space');
let playerSign = 'X'
let roundCount = 0;
let gameBoard =  
['-', '-', '-'
,'-', '-', '-'
,'-', '-', '-'];
const winningCombinations = 
[[0,1,2], [3,4,5], [6,7,8], 
 [0,3,6], [1,4,7], [2,5,8],
 [0,4,8], [2,4,6]];


startButton.addEventListener('click', ()=>{
    selectedPlayers = startGameAnimations();
    setTimeout(()=>{
        bootLoadScreen(selectedPlayers).then(()=>{
            setTimeout(()=>{
                bootPlayScreen(selectedPlayers).then(()=>{
                    gameStart();
                })
            }, 1000)
        })
    }, 2000)
})

function spaceTaken(space){
    if(space.textContent === 'X' || space.textContent === 'O'){
        return true;
    }

    return false;
}

function checkWinner(){
    let winner;
    for(let i = 0; i < winningCombinations.length; i++){
        let won = true;
        for(let j = 0; j < winningCombinations[i].length; j++){
            if(gameBoard[winningCombinations[i][j]] !== 'X'){
                won = false;
                break;
            }
        }
        if(won){
            winner = 'X';
        }
    }
     
    if(winner){
        return winner;
    }

    for(let i = 0; i < winningCombinations.length; i++){
        let won = true;
        for(let j = 0; j < winningCombinations[i].length; j++){
            if(gameBoard[winningCombinations[i][j]] !== 'O'){
                won = false;
                break;
            }
        }
        if(won){
            winner = 'O';
        }
    }

    return winner;
}

function swapTurn(){
    if(playerSign === 'X'){
        playerSign = 'O';
    }else{
        playerSign = 'X'
    }
}

function updateGameBoard(){
    let count = 0;
    spaces.forEach(space =>{
        gameBoard[count] = space.textContent;
        count++;
    })
}

function handleClick(e){
    const space = e.target;
    if(!spaceTaken(space)){
        space.textContent = playerSign;
        updateGameBoard();
        if(checkWinner()){
            spaces.forEach(space =>{
                space.removeEventListener('click', handleClick)
            })
            alert('we have a winner');
        }else{
            swapTurn();
            gameStart();
        }
    }
}

function playerMove(){
    spaces.forEach(space =>{
        space.addEventListener('click', handleClick , {once : true});
    })
}

function calculateDifficulty(player){
    switch(player.textContent){
        case 'Easy':
            return 1;
        case 'Hard':
            return 2;
        case 'Impossible':
            return 3;
    }

    return 4;
}

function playerLogic(){
    console.log('sign: ' + playerSign);
    let difficulty;
    if(playerSign === 'X'){
        difficulty = calculateDifficulty(selectedPlayers[0]);
    }else{
        difficulty = calculateDifficulty(selectedPlayers[1]);
    }

    switch(difficulty){
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

function gameStart(){
    playerLogic();
    highLightActivePlayer(playerSign);
}

bootUpGame();