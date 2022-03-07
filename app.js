"use strict"
const Player = (difficulty, sign)=>{ //Player Factory Function
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

const selection = (() =>{ //Factory function immediately invoked for selection functionality 
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

    startGame.addEventListener('click', function(){ //Event listener that triggers animations
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


    const populateDisplay = () =>{ // Method to populate display for header of load screen
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

    function createPlayers(selection){ // method with conditional statements to create games players
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

    function checkStatus(){ // method to check if players are selected to trigger start button animation
        if(playersChosen.xSelection != undefined && playersChosen.oSelection != undefined){
            startGame.classList.add('animate');
        }
       }

    const toggleDifficulty = (bot) =>{ // method with conditionals for display of cpu difficulty selection
       switch(bot.textContent){
           case 'CPU':
                bot.textContent = 'Easy';
                break;
            // case 'Easy':
            //     bot.textContent = 'Hard';
            //     break;
            // case 'Hard':
            //     bot.textContent = 'Impossible';
            //     break;
            // case 'Impossible':
            //     bot.textContent = 'Easy';
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



const gameplay = (() =>{  //factory function immediately invoked to add functionality for gameplay between two players or an ai
    const startGame = document.getElementById('start');
    let restartButton = document.getElementById('again');
    let displayOne = document.getElementById('playerOne');
    let displayTwo = document.getElementById('playerTwo');
    let pOneWinsDisplay = document.getElementById('firstPlayerWins');
    let pTwoWinsDisplay = document.getElementById('secondPlayerWins');
    let roundCountDisplay = document.getElementById('roundCount');
    let statusDisplay = document.getElementById('status')
    const ret = document.querySelector('.return');
    let players = undefined;
    let gameBoard = [' ', ' ', ' ',
                     ' ', ' ', ' ',
                     ' ', ' ', ' '];
    let boardCount = 0;
    let pOneWins = 0;
    let pTwoWins = 0;
    let roundCount = 0;
    const spaces = document.querySelectorAll('.space');
    const getCount = () =>{ return boardCount;}
    const getBoard = () =>{return gameBoard;}
    const getPlayers = () =>{return players;}
    const getWins = ()=>{return [pOneWins, pTwoWins];}
    const getRoundCount = ()=>{return roundCount;}

    window.addEventListener('click', function (e){ // event listener with conditional to trigger playerMove() methodj
        if(e.target.classList.contains('space')){
            playerMove(e);
        }else {
            return;
        }
    })

    startGame.addEventListener('click', () =>{ // event listener that triggers the game start method
        players = selection.getPlayers();
        populateDisplay();
        displayOne.classList.add('focus');
        setTimeout(() =>{
            gameStart();
        }, 14000)
    })

    ret.addEventListener('click', function(){ // event listener to take users back to homepage
        location.reload()
    });

    restartButton.addEventListener('click', function(){
        console.log('clearing data')
        for(let i = 0; i < gameBoard.length; i++){
            gameBoard[i] = ' ';
        } 
        spaces.forEach(space => {
            space.textContent = "";
            space.style.color = 'black';
            space.style.backgroundColor = 'white';
        });
        pOneWins = 0;
        pTwoWins = 0;
        boardCount = 0;
        roundCount = 0;
        pOneWinsDisplay.textContent = getWins()[0];
        pTwoWinsDisplay.textContent = getWins()[1];
        roundCountDisplay.textContent = getRoundCount();
        displayOne.classList.remove('unfocus');
        displayTwo.classList.remove('unfocus');
        displayOne.classList.add('focus');
        statusDisplay.textContent = '';
        restartButton.style.opacity = '0';
        populateDisplay();
        gameStart();
    })

    function reset(){ //method to reset the stats of the game every round
        if(getWins()[0] > 2 || getWins()[1] > 2 || getRoundCount() > 5){ // conditional to ensure the game hasn't ended 
            console.log('end of game')
            endGame();
            return;
        }
        roundCountDisplay.textContent = `${getRoundCount()}`;
        setTimeout(() =>{
            for(let i = 0; i < gameBoard.length; i++){
                gameBoard[i] = ' ';
            }  

            spaces.forEach(space => {
                space.textContent = "";
                space.style.color = 'black';
                space.style.backgroundColor = 'white';
            });

            displayOne.classList.add('focus');
            boardCount = 0;
            statusDisplay.textContent = '';
            gameStart(); 
        }, 3000)
    }

    function roundTie(){ // method that animates a tie case and resets the game
        roundCount++;
        statusDisplay.textContent = 'Game Tied';
        spaces.forEach(space =>{
            space.style.color = 'white';
            space.style.backgroundColor = 'beige';
            displayTwo.classList.remove('focus');
            displayOne.classList.remove('focus');
        })
        reset();
    }

    function winRoundAnimate(indexOne, indexTwo, indexThree){ //method that animates a win case and resets the game
        let animations = [];
        animations.push(document.getElementById(`s${indexOne}`));
        animations.push(document.getElementById(`s${indexTwo}`));
        animations.push(document.getElementById(`s${indexThree}`));

        animations.forEach(animate =>{
            animate.style.color = 'white';
            animate.style.backgroundColor = 'rgb(128, 202, 128)';
            displayTwo.classList.remove('focus');
            displayOne.classList.remove('focus');
        })
        reset();
    }

    function checkWinner(){ // method to check if their is a winner
        let possibleWins = {
            firstColumn: [0,3,6],
            secondColumn: [1,4,7],
            thirdColumn: [2,5,8],
            firstRow: [0,1,2],
            secondRow: [3,4,5],
            thirdRow: [6,7,8],
            diagonalOne: [0,4,8],
            diagonalTwo: [2,4,6]
        }

        for(let property in possibleWins){ // iterate over possible wins for player 'X'
            for(let i =0; i < 3; i++){
                if(gameBoard[possibleWins[property][i]] != players[0].getSign()){
                    break;
                }else if(gameBoard[possibleWins[property][i]] == players[0].getSign() && i == 2){
                    console.log('Solution found');
                    pOneWins++;
                    roundCount++;
                    statusDisplay.textContent = `${displayOne.textContent} wins`
                    pOneWinsDisplay.textContent = `${getWins()[0]}`;
                    winRoundAnimate(possibleWins[property][0], possibleWins[property][1], possibleWins[property][2]);
                    return true
                }
            }
        }

        for(let property in possibleWins){ // iterate over possible wins for player 'O'
            for(let i =0; i < 3; i++){
                if(gameBoard[possibleWins[property][i]] != players[1].getSign()){
                    break;
                }else if(gameBoard[possibleWins[property][i]] == players[1].getSign() && i == 2){
                    console.log('Solution found');
                    pTwoWins++;
                    roundCount++;
                    statusDisplay.textContent = `${displayTwo.textContent} wins`
                    pTwoWinsDisplay.textContent = `${getWins()[1]}`;
                    winRoundAnimate(possibleWins[property][0], possibleWins[property][1], possibleWins[property][2]);
                    return true
                }
            }
        }

        console.log('no solution yet');
        return false;
    }

    function boardIncrement(){ // method to increment the board count and check if their is a winner or tie if neither it starts a new round
        boardCount++;
        if(checkWinner() != false){
            return;
        }else{
            if(getCount() >= 9){
                roundTie();
            }
            else{
                setTimeout(() =>{
                    gameStart();
                }, 2000)
            }
        }
    }

    function populateDisplay(){ // method to populate the display of the header based on user selection
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

    function playerMove(e){ // method to add functionality to a players move
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
                }
        }
    }
    
    function botEasy(sign){ // method to create an easy AI for the game 
        let index = Math.floor(Math.random() * 9);
        while(gameBoard[index] != ' '){
            index = Math.floor(Math.random() * 9);
            console.log(index);
        }        
            switch(sign){
                case 'X':
                    document.getElementById(`s${index}`).textContent = 'X';
                    gameBoard[index] = 'X';
                    displayOne.classList.remove('focus');
                    displayTwo.classList.add('focus');
                    boardIncrement();
                    break;
                case 'O':
                    document.getElementById(`s${index}`).textContent = 'O';
                    gameBoard[index] = 'O';
                    displayTwo.classList.remove('focus');
                    displayOne.classList.add('focus');
                    boardIncrement();
            }
        
    }

    function botMove(sign){ // method to determine what level of difficulty should be chosen for the bot
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
        }

    }

    function endGame(){ // method to animate the end of the game
        displayOne.classList.remove('focus');
        displayTwo.classList.remove('focus');

        if(getWins()[0] > getWins()[1]){
            statusDisplay.textContent = `${displayOne.textContent} beats ${displayTwo.textContent}!`;
            displayOne.innerHTML = `${displayOne.textContent}<i class="fa-solid fa-medal"></i>`
            displayOne.classList.add('fWin');
        }

        if(getWins()[0] < getWins()[1]){
            statusDisplay.textContent = `${displayTwo.textContent} beats ${displayOne.textContent}!`;
            displayTwo.innerHTML = `${displayTwo.textContent}<i class="fa-solid fa-medal"></i>`
            displayTwo.classList.add('fWin');
        }

        if(getWins()[0] == getWins()[1]){
            statusDisplay.textContent = `Its a draw!`;
        }

        setTimeout(() =>{
            restartButton.style.opacity ='1';
            displayOne.classList.remove('fWin');
            displayTwo.classList.remove('fWin');
        }, 3100)

    }

    function gameStart(){ // method for gameplay 
                if(players[0].getDifficulty() > 0 && displayOne.classList.contains('focus')){
                    botMove('X');
                }
                else if (players[1].getDifficulty() > 0 && displayTwo.classList.contains('focus')){
                    botMove('O')
                }
    }
        return { getBoard, getPlayers, getCount};
})();