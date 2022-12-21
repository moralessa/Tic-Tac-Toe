import { bootUpGame, startGameAnimations } from "./homeScreenDom.js";
import { bootLoadScreen } from "./loadScreenDom.js";
import { bootPlayScreen, updateDomRoundCount, updateDomWins, highLightActivePlayer, endGameDomAnimation,
    updateDomBoard, highLightRoundWinner, clearDomBoard, clearDomStatus, resetRoundWinnerHighlight, } from "./playScreenDom.js";

const startButton = document.getElementById('start');
const returnButton = document.querySelector('.return');
let selectedPlayers;
let playerOneWins = 0;
let playerTwoWins = 0;
const spaces = document.querySelectorAll('.space');
let playerSign = 'X'
let roundCount = 0;
let gameBoard =  
['', '', ''
,'', '', ''
,'', '', ''];
const winningCombinations = 
[[0,1,2], [3,4,5], [6,7,8], 
 [0,3,6], [1,4,7], [2,5,8],
 [0,4,8], [2,4,6]];


returnButton.addEventListener('click',  ()=>{
    location.reload();
})

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
    if(space === 'X' || space === 'O'){
        return true;
    }

    return false;
}

function checkRoundWinner(sign, board){
    let combo;
    for(let i = 0; i < winningCombinations.length; i++){
        let won = true;
        for(let j = 0; j < winningCombinations[i].length; j++){
            if(board[winningCombinations[i][j]] !== sign){
                won = false;
                break;
            }
        }
        if(won){
            combo = winningCombinations[i];
        }
    }

    return [combo, sign];
}

function checkRoundTie(board){
    let full = true;
    for(let i = 0; i < gameBoard.length; i++){
        if(board[i] !== 'X' && board[i] !== 'O'){
            full = false;
            break;
        }
    }
    return full;
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

function updateWins(winner){
    if(winner === 'X'){
        playerOneWins++;
    }else if(winner === 'O'){
        playerTwoWins++;
    }
}


function endGame(winner = 'tie'){
    clearDomStatus();
    resetRoundWinnerHighlight();
    if(winner === 'X'){
    endGameDomAnimation('X', selectedPlayers[0]);
    }else if(winner === 'O'){
        endGameDomAnimation('O', selectedPlayers[1]);
    }else if(winner === 'tie'){
        endGameDomAnimation(null, null);
    }
}

function determineGameWinner(){
    if(roundCount === 5){
        if(playerOneWins > playerTwoWins){
            endGame('X');
        }else if(playerOneWins < playerTwoWins){
            endGame('O');
        }else if(playerOneWins === playerTwoWins){
            endGame();
        }
    }else if(playerOneWins >= 3)
    {   
        endGame('X')
    }else if(playerTwoWins >= 3){
        endGame('O');
    }else{
        setTimeout(() =>{
            playerSign = 'X';
            gameBoard = 
            ['', '', ''
            ,'', '', ''
            ,'', '', ''];
            clearDomBoard();
            clearDomStatus();
            gameStart();
        }, 2000)
    }
}

function endRound(winner, combo){
    removeSpaceClickEvent();
    roundCount++;
    updateWins(winner);
    updateDomWins(playerOneWins, playerTwoWins);
    highLightRoundWinner(winner, selectedPlayers[0], selectedPlayers[1], combo);
    updateDomRoundCount(roundCount);
    setTimeout(() =>{
        determineGameWinner();
    }, 1000)
}

function updateRoundLogic(){
    if(checkRoundWinner(playerSign, gameBoard)[0]){
        endRound(playerSign, checkRoundWinner(playerSign, gameBoard)[0]);
    }else if(checkRoundTie(gameBoard)){
        endRound();
    }else{
        swapTurn();
        gameStart();
    }
}

function removeSpaceClickEvent(){
    spaces.forEach(space =>{
        space.removeEventListener('click', handleClick);
    })
}

function handleClick(e){
    const space = e.target;
    if(!spaceTaken(space.textContent)){
        space.textContent = playerSign;
        updateGameBoard();
        updateRoundLogic();
    }
}

function playerMove(){
    spaces.forEach(space =>{
        space.addEventListener('click', handleClick , {once : true});
    })
}

function miniMax(board, depth, isMaximizing, currentPlayerSign){
    let opposingPlayerSign;
    (currentPlayerSign === 'X') ? opposingPlayerSign = 'O' : opposingPlayerSign = 'X';
    
    if(checkRoundWinner(currentPlayerSign, board)[0]){
        return 1;
    }
    if(checkRoundWinner(opposingPlayerSign, board)[0]){
        return -1;
    }

    if(checkRoundTie(board)){
        return 0;
    }

    if(isMaximizing){
        let bestScore = -Infinity;
        for(let i = 0; i < board.length; i++){
            if(!spaceTaken(board[i])){
                board[i] = currentPlayerSign;
                let score = miniMax(board, depth + 1, false, currentPlayerSign);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    }else{
        let bestScore = Infinity;
        for(let i = 0; i < board.length; i++){
            if(!spaceTaken(board[i])){
                board[i] = opposingPlayerSign;
                let score = miniMax(board, depth + 1, true, currentPlayerSign);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function botMoveImpossible(){
    let bestScore = -Infinity;
    let bestMove;
    for(let i = 0; i < gameBoard.length; i++){
        if(!spaceTaken(gameBoard[i])){
            gameBoard[i] = playerSign;
            let score = miniMax(gameBoard, 0, false, playerSign);
            gameBoard[i] = '';
            if(score > bestScore){
                bestScore = score;
                bestMove = i;
            }
        }
    }
    gameBoard[bestMove] = playerSign;
    updateDomBoard(bestMove, playerSign);
    setTimeout(()=>{
        updateRoundLogic();
    }, 1000)
    return true;
}

function botMoveHard(){
    let choice = Math.floor(Math.random() * 2);
    if(choice){
        botMoveImpossible();
    }else{
        botMoveEasy();
    }
}

function botMoveEasy(){
    let index = Math.floor(Math.random() * gameBoard.length);
    while(spaceTaken(gameBoard[index])){
        index = Math.floor(Math.random() * gameBoard.length);
    }
    gameBoard[index] = playerSign;
    updateDomBoard(index, playerSign);
    setTimeout(()=>{
        updateRoundLogic();
    }, 1000)
    return true;
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
    removeSpaceClickEvent();
    playerLogic();
    highLightActivePlayer(playerSign);
}

bootUpGame();