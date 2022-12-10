import { bootUpGame, startGameAnimations } from "./homeScreenDom.js";
import { bootLoadScreen } from "./loadScreenDom.js";
import { bootPlayScreen, updateRoundCount, updateWins, highLightActivePlayer } from "./playScreenDom.js";

const startButton = document.getElementById('start');
let newGame;
let selectedPlayers;

function Game(players){
    this.roundCount = 0;
    this.playerOne = players[0];
    this.playerTwo = players[1];
    this.wins = [];
    this.roundCount = 0;
    this.gameBoard = 
    ['-', '-', '-'
    ,'-', '-', '-'
    ,'-', '-', '-'];
}




startButton.addEventListener('click', ()=>{
    selectedPlayers = startGameAnimations();
    setTimeout(()=>{
        bootLoadScreen(selectedPlayers).then(()=>{
            setTimeout(()=>{
                bootPlayScreen(selectedPlayers).then(()=>{
                    newGame = new Game(selectedPlayers);
                    gameStart(newGame);
                })
            }, 1000)
        })
    }, 2000)
})

function botMoveEasy(){

}

function botMoveHard(){

}

function botMove(){

}

function nextTurn(player, board){
    return new Promise(resolve=>{
        if(player.textContent === 'Easy'){
            botMoveEasy(board);
        }else if(player.textContent === 'Hard'){
            botMoveHard(board);
        }else if(player.textContent === 'Impossible'){
            botMoveImpossible(board);
        }else{
            playerMove(board);
        }
    })
}

function determineRoundWinner(board){
    let winningCombinations = 
    [[0,1,2], [3,4,5], [6,7,8], 
     [0,3,6], [1,4,7], [2,5,8],
     [0,4,8], [2,4,6]];
}

function gameStart(game){
    if(game.roundCount === 5){
        endGame(game);
    }

    nextTurn(game.players[0], game.gameBoard).then(()=>{
        nextTurn(game.players[1], game.gameBoard).then(()=>{
            determineRoundWinner(game.gameBoard);
        })
    })

}

function endGame(game){

}


bootUpGame();