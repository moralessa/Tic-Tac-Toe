import { bootUpGame, startGameAnimations } from "./homeScreenDom.js";
import { bootLoadScreen } from "./loadScreenDom.js";
import { bootPlayScreen, updateRoundCount, updateWins, highLightActivePlayer, updateDomBoard } from "./playScreenDom.js";

const startButton = document.getElementById('start');
let selectedPlayers;
let playerOneWins = 0;
let playerTwoWins = 0;
let xTurn = true;
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

function playerLogic(sign){
    let difficulty;
    if(sign === 'X'){
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
    if(xTurn){
        highLightActivePlayer('X');
        playerLogic('X');
    }else{
        highLightActivePlayer('O');
        playerLogic('O')
    }
}

bootUpGame();