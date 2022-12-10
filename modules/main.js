import { bootUpGame, startGameAnimations } from "./homeScreenDom.js";
import { bootLoadScreen } from "./loadScreenDom.js";
import { bootPlayScreen, updateRoundCount, updateWins, highLightActivePlayer, updateDomBoard } from "./playScreenDom.js";

const startButton = document.getElementById('start');
let selectedPlayers;
let playerOneWins = 0;
let playerTwoWins = 0;
let xTurn = false;
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

function checkWinner(sign){
    let winningCombo;
    for(let i = 0; i < winningCombinations.length; i++){
        let won = true;
        for(let j = 0; j < winningCombinations[i].length; j++){
            if(winningCombinations[i][j] !== sign){
                won = false;            
            }
        }
        if(won){
            winningCombo = winningCombinations[i];
            break;
        }
    }
    return winningCombo;
}

function determineDifficulty(player){
    if(player.textContent === 'Easy'){
        return 1;
    }else if(player.textContent === 'Hard'){
        return 2;
    }else if (player.textContent === 'Impossible'){
        return 3;
    }else{
        return 4;
    }
}


function updateGameBoard(index, sign){
    gameBoard[index] = sign;
}

function handleClick(e, sign, index){
    return function (){
        const space = e.target;
        if(space.textContent !== 'X' || space.textContent !== 'O'){
            space.textContent = sign;
            updateGameBoard(index, sign);
        }
    }
}

function playerMove(sign){
    const spaces = document.querySelectorAll('.space');
    for(let i = 0; i < spaces.length; i++){
        spaces[i].addEventListener('click', handleClick(sign, i));
    }
}

function nextTurn(sign){
    let player;
    if(sign === 'X'){
        player = selectedPlayers[0];
    }else{
        player = selectedPlayers[1];
    }

    let difficulty = determineDifficulty(player);
    if (difficulty === 1){
        botMoveEasy();
    }else if(difficulty === 2){
        botMoveHard();
    }else if(difficulty === 3){
        botMoveImpossible();
    }else{
        playerMove(sign);
    }
}

function gameStart(){
    if(xTurn){
        highLightActivePlayer('X');
        nextTurn('X');
    }else{
        highLightActivePlayer('O');
        nextTurn('O');
    }

    // if(checkWinner()){
    //     alert('Winner');
    // }else{
    //     gameStart();
    // }
}

bootUpGame();