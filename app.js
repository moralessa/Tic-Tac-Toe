"use strict"

const Player = (difficulty, sign)=>{
    const sign_ = sign;
    const difficulty_ = difficulty;
  
    const getSign = () =>{
        return sign_
    }

    const getDifficulty = () =>{
        return difficulty_;
    }

    return{getSign, getDifficulty};
}


const selection = (() =>{
    const playerX = document.getElementById('p1');
    const botX = document.getElementById('bot1');
    const playerO = document.getElementById('p2');
    const botO = document.getElementById('bot2');
    const startGame = document.getElementById('start');
    const firstSelection = document.getElementById('firstSelection');
    const secondSelection = document.getElementById('secondSelection');
    const countDown = document.getElementById('count');
    let playersChosen = {
         xSelection: undefined,
         oSelection: undefined,
    };
    let playerOne = undefined;
    let playerTwo = undefined;

    const getPlayers = () =>{
        return [playerOne, playerTwo];
    }

    startGame.addEventListener('click', function(){
        createPlayers(playersChosen.xSelection);
        createPlayers(playersChosen.oSelection);
        populateDisplay();
        document.querySelector('.homeScreen').classList.add('animate__bounceOut');
        window.setTimeout(() =>{
            document.querySelector('.homeScreen').classList.add('d-none');            
        }, 2000)
        window.setTimeout(() =>{
            document.querySelector('.loadScreen').classList.add('animate__bounceIn');
            document.querySelector('.loadScreen').classList.remove('d-none');
        }, 2000)
        window.setTimeout(() =>{
            document.querySelector('.loadStart').classList.add('animate__bounceIn')
            document.querySelector('.loadStart').classList.remove('d-none')
        },4000);
       
        window.setTimeout(() =>{
            countDown.textContent = "2";
        },6000)
        window.setTimeout(() =>{
            countDown.textContent = "1";
        }, 7000)
        window.setTimeout(() =>{
            countDown.textContent = "Tic Tac Toe!";
        }, 8000)
        window.setTimeout(() =>{
            document.querySelector('.loadScreen').classList.remove('animate__bounceIn')
            document.querySelector('.loadScreen').classList.add('animate__bounceOut')
        }, 9000)
        window.setTimeout(() =>{
            document.querySelector('.loadScreen').classList.add('d-none');
            document.querySelector('.playScreen').classList.add('animate__bounceIn')
            document.querySelector('.playScreen').classList.remove('d-none');
        }, 12000)
    })


    const populateDisplay = () =>{
        switch(playerOne.getDifficulty()){
            case 0 :
                firstSelection.textContent = 'Player One';
                break;
            case 1 :
                firstSelection.textContent = 'Bot One Easy';
                break;
            case 2: 
                firstSelection.textContent = 'Bot One Hard';
                break;
            case 3:
                firstSelection.textContent = 'Bot One Impossible'
        }

        switch(playerTwo.getDifficulty()){
            case 0 :
                secondSelection.textContent = 'Player Two';
                break;
            case 1 :
                secondSelection.textContent = 'Bot Two Easy';
                break;
            case 2: 
                secondSelection.textContent = 'Bot Two Hard';
                break;
            case 3:
                secondSelection.textContent = 'Bot Two Impossible'
        }
    }

    function createPlayers(selection){
        switch(selection.id){
            case 'p1':
                playerOne = Player(0, 'X');
            case 'bot1':
                switch(selection.textContent){
                    case 'Easy':
                        playerOne = Player(1, 'X');
                        break;
                    case 'Hard':
                        playerOne = Player(2, 'X');
                        break;
                    case 'Impossible':
                        playerOne = Player(3, 'X');
                }
            case 'p2':
                playerTwo = Player(0, 'O');
            case 'bot2':
                switch(selection.textContent){
                    case 'Easy':
                        playerTwo = Player(1, 'O');
                        break;
                    case 'Hard':
                        playerTwo = Player(2, 'O');
                        break;
                    case 'Impossible':
                        playerTwo = Player(3, 'O');
                }
                
        }
    }

    function checkStatus(){
        if(playersChosen.xSelection != undefined && playersChosen.oSelection != undefined){
            startGame.classList.add('animate');
        }
       }

    const toggleDifficulty = (bot) =>{

       switch(bot.textContent){
           case 'CPU':
                bot.textContent = 'Easy';
                break;
            case 'Easy':
                bot.textContent = 'Hard';
                break;
            case 'Hard':
                bot.textContent = 'Impossible';
                break;
            case 'Impossible':
                bot.textContent = 'Easy';
       }
    }

    botX.addEventListener('click', () =>{
        toggleDifficulty(botX);
    });

    botO.addEventListener('click', () =>{
        toggleDifficulty(botO);
    })

    playerX.addEventListener('click', function(){
        if(!playerX.classList.contains('selected')){
            playerX.classList.add('selected');
            playersChosen.xSelection = playerX;
            checkStatus();
        }
        if(botX.classList.contains('selected')){
            botX.classList.remove('selected');
            botX.textContent = 'CPU'
        }
    });

    botX.addEventListener('click', function(){
        if(!botX.classList.contains('selected')){
            botX.classList.add('selected');
            playersChosen.xSelection = botX;
            checkStatus();
        }
        if(playerX.classList.contains('selected')){
            playerX.classList.remove('selected');
        }
    });

    playerO.addEventListener('click', function(){
        if(!playerO.classList.contains('selected')){
            playerO.classList.add('selected');
            playersChosen.oSelection = playerO;
            checkStatus();
        }
        if(botO.classList.contains('selected')){
            botO.classList.remove('selected');
            botO.textContent = 'CPU'
        }
    });

    botO.addEventListener('click', function(){
        if(!botO.classList.contains('selected')){
            botO.classList.add('selected');
            playersChosen.oSelection = botO;
            checkStatus();
        }
        if(playerO.classList.contains('selected')){
            playerO.classList.remove('selected');
        }
    });


    return {getPlayers};

})();



const gameplay = (() =>{
    const startGame = document.getElementById('start');
    let displayOne = document.getElementById('playerOne');
    let displayTwo = document.getElementById('playerTwo');
    const ret = document.querySelector('.return');
    let players = undefined;
    let gameBoard = [' ', ' ', ' ',
                     ' ', ' ', ' ',
                     ' ', ' ', ' '];
    let boardCount = 0;
    const spaces = document.querySelectorAll('.space');
    const spacesArr = Array.from(spaces);
    let boardBool = false;

    startGame.addEventListener('click', () =>{
        players = selection.getPlayers();
        populateDisplay();
        displayOne.classList.add('focus');
        gameStart();
    })

    ret.addEventListener('click', function(){
        location.reload()
    });


    const getBoard = () =>{
        return gameBoard;
    }

    const getPlayers = () =>{
        return players;
    }

    function boardIncrement(){
        boardCount++;
        if(boardCount >= 9){
            boardBool = true;
        }else{
            gameStart();
        }
    }

    function populateDisplay(){
        switch(players[0].getDifficulty()){
            case 0:
                displayOne.textContent = 'Player One';
                break;
            case 1:
                displayOne.textContent = 'Bot One Easy';
                break;
            case 2: 
                displayOne.textContent = 'Bot One Hard';
                break;
            case 3: 
                displayOne.textContent = 'Bot One Impossible';
        }

        switch(players[1].getDifficulty()){
            case 0:
                displayTwo.textContent = 'Player Two';
                break;
            case 1:
                displayTwo.textContent = 'Bot Two Easy';
                break;
            case 2: 
                displayTwo.textContent = 'Bot Two Hard';
                break;
            case 3: 
                displayTwo.textContent = 'Bot Two Impossible';
        }
    }

        
    window.addEventListener('click', function (e){
        if(e.target.classList.contains('space')){
            playerMove(e);
        }else {
            return;
        }
    })


    function playerMove(e){
        switch(e.target.id){
            case 's0':
                if(players[0].getDifficulty() == 0 && displayOne.classList.contains('focus') && gameBoard[0] == ' '){
                    e.target.textContent = 'X';
                    gameBoard[0] = 'X';
                    displayOne.classList.remove('focus');
                    displayTwo.classList.add('focus');
                    boardIncrement();
                }else if(players[1].getDifficulty() == 0 && displayTwo.classList.contains('focus') && gameBoard[0] == ' '){
                    e.target.textContent = 'O';
                    gameBoard[0] = 'O';
                    displayTwo.classList.remove('focus');
                    displayOne.classList.add('focus');
                    boardIncrement();
                }else if(gameBoard[0] != ' '){
                    console.log('spots taken');
                }else{
                    return;
                }
                break;
            case 's1':
                if(players[0].getDifficulty() == 0 && displayOne.classList.contains('focus') && gameBoard[1] == ' '){
                    e.target.textContent = 'X';
                    gameBoard[1] = 'X';
                    displayOne.classList.remove('focus');
                    displayTwo.classList.add('focus');
                    boardIncrement();
                }else if(players[1].getDifficulty() == 0 && displayTwo.classList.contains('focus') && gameBoard[1] == ' '){
                    e.target.textContent = 'O';
                    gameBoard[1] = 'O';
                    displayTwo.classList.remove('focus');
                    displayOne.classList.add('focus');
                    boardIncrement();
                }else if(gameBoard[1] != ' '){
                    console.log('spots taken');
                }else{
                    return;
                }
                break;
            case 's2':
                if(players[0].getDifficulty() == 0 && displayOne.classList.contains('focus') && gameBoard[2] == ' '){
                    e.target.textContent = 'X';
                    gameBoard[2] = 'X';
                    displayOne.classList.remove('focus');
                    displayTwo.classList.add('focus');
                    boardIncrement();
                }else if(players[1].getDifficulty() == 0 && displayTwo.classList.contains('focus') && gameBoard[2] == ' '){
                    e.target.textContent = 'O';
                    gameBoard[2] = 'O';
                    displayTwo.classList.remove('focus');
                    displayOne.classList.add('focus');
                    boardIncrement();
                }else if(gameBoard[2] != ' '){
                    console.log('spots taken');
                }else{
                    return;
                }
                break;
            case 's3':
                if(players[0].getDifficulty() == 0 && displayOne.classList.contains('focus') && gameBoard[3] == ' '){
                    e.target.textContent = 'X';
                    gameBoard[3] = 'X';
                    displayOne.classList.remove('focus');
                    displayTwo.classList.add('focus');
                    boardIncrement();
                }else if(players[1].getDifficulty() == 0 && displayTwo.classList.contains('focus') && gameBoard[3] == ' '){
                    e.target.textContent = 'O';
                    gameBoard[3] = 'O';
                    displayTwo.classList.remove('focus');
                    displayOne.classList.add('focus');
                    boardIncrement();
                }else if(gameBoard[3] != ' '){
                    console.log('spots taken');
                }else{
                    return;
                }
                break;
            case 's4':
                if(players[0].getDifficulty() == 0 && displayOne.classList.contains('focus') && gameBoard[4] == ' '){
                    e.target.textContent = 'X';
                    gameBoard[4] = 'X';
                    displayOne.classList.remove('focus');
                    displayTwo.classList.add('focus');
                    boardIncrement();
                }else if(players[1].getDifficulty() == 0 && displayTwo.classList.contains('focus') && gameBoard[4] == ' '){
                    e.target.textContent = 'O';
                    gameBoard[4] = 'O';
                    displayTwo.classList.remove('focus');
                    displayOne.classList.add('focus');
                    boardIncrement();
                }else if(gameBoard[4] != ' '){
                    console.log('spots taken');
                }else{
                    return;
                }
                break;
            case 's5':
                if(players[0].getDifficulty() == 0 && displayOne.classList.contains('focus') && gameBoard[5] == ' '){
                    e.target.textContent = 'X';
                    gameBoard[5] = 'X';
                    displayOne.classList.remove('focus');
                    displayTwo.classList.add('focus');
                    boardIncrement();
                }else if(players[1].getDifficulty() == 0 && displayTwo.classList.contains('focus') && gameBoard[5] == ' '){
                    e.target.textContent = 'O';
                    gameBoard[5] = 'O';
                    displayTwo.classList.remove('focus');
                    displayOne.classList.add('focus');
                    boardIncrement();
                }else if(gameBoard[5] != ' '){
                    console.log('spots taken');
                }else{
                    return;
                }
                break;
            case 's6':
                if(players[0].getDifficulty() == 0 && displayOne.classList.contains('focus') && gameBoard[6] == ' '){
                    e.target.textContent = 'X';
                    gameBoard[6] = 'X';
                    displayOne.classList.remove('focus');
                    displayTwo.classList.add('focus');
                    boardIncrement();
                }else if(players[1].getDifficulty() == 0 && displayTwo.classList.contains('focus') && gameBoard[6] == ' '){
                    e.target.textContent = 'O';
                    gameBoard[6] = 'O';
                    displayTwo.classList.remove('focus');
                    displayOne.classList.add('focus');
                    boardIncrement();
                }else if(gameBoard[6] != ' '){
                    console.log('spots taken');
                }else{
                    return;
                }
                break;
            case 's7':
                if(players[0].getDifficulty() == 0 && displayOne.classList.contains('focus') && gameBoard[7] == ' '){
                    e.target.textContent = 'X';
                    gameBoard[7] = 'X';
                    displayOne.classList.remove('focus');
                    displayTwo.classList.add('focus');
                    boardIncrement();
                }else if(players[1].getDifficulty() == 0 && displayTwo.classList.contains('focus') && gameBoard[7] == ' '){
                    e.target.textContent = 'O';
                    gameBoard[7] = 'O';
                    displayTwo.classList.remove('focus');
                    displayOne.classList.add('focus');
                    boardIncrement();
                }else if(gameBoard[7] != ' '){
                    console.log('spots taken');
                }else{
                    return;
                }
                break;
            case 's8':
                if(players[0].getDifficulty() == 0 && displayOne.classList.contains('focus') && gameBoard[8] == ' '){
                    e.target.textContent = 'X';
                    gameBoard[8] = 'X';
                    displayOne.classList.remove('focus');
                    displayTwo.classList.add('focus');
                    boardIncrement();
                }else if(players[1].getDifficulty() == 0 && displayTwo.classList.contains('focus') && gameBoard[8] == ' '){
                    e.target.textContent = 'O';
                    gameBoard[8] = 'O';
                    displayTwo.classList.remove('focus');
                    displayOne.classList.add('focus');
                    boardIncrement();
                }else if(gameBoard[8] != ' '){
                    console.log('spots taken');
                }else{
                    return;
                }
                break;
        }
    }
    
    function botEasy(sign){
        let index = Math.floor(Math.random() * 9);
        console.log(index);
        // if(){

        // }else{
        //     switch(sign){
        //         case 'X':
                    
        //     }
        // }
    }

    function botMove(sign){
        switch(sign){
            case 'X':
                console.log('Bot X Move');
                if(players[0].getDifficulty() == 1){
                    botEasy('X');
                }
                if(players[0].getDifficulty() == 2){
                    botHard('X');
                }
                if(players[0].getDifficulty() == 3){
                    botImpossible('X');
                }
                displayOne.classList.remove('focus');
                displayTwo.classList.add('focus');
                break;
            case 'O':
                console.log('Bot O move');
                if(players[1].getDifficulty() == 1){
                    botEasy('O');
                }
                if(players[1].getDifficulty() == 2){
                    botHard('O');
                }
                if(players[1].getDifficulty() == 3){
                    botImpossible('O');
                }
                displayTwo.classList.remove('focus');
                displayOne.classList.add('focus');
        }

    }

    function gameStart(){
        console.log('gamestart');
                if(players[0].getDifficulty() > 0 && displayOne.classList.contains('focus')){
                    botMove('X');
                }
                else if (players[1].getDifficulty() > 0 && displayTwo.classList.contains('focus')){
                    botMove('O')
                }
    }

    
        return { getBoard, getPlayers};
})();