function bootPlayScreen(players){
    return new Promise(resolve=>{
        const playScreen = document.querySelector('.playScreen');
        const playerOne = document.getElementById('playerOne');
        const playerTwo = document.getElementById('playerTwo');
        playScreen.classList.remove('d-none');
        playScreen.classList.add('animate__bounceIn');

        function formatPlayerText(player){
            if(player.textContent === 'Player' ) return player.id;
            return `${player.id} : ${player.textContent.toLowerCase()}`;
        }

        playerOne.textContent = formatPlayerText(players[0]);
        playerTwo.textContent = formatPlayerText(players[1]);
        console.log(players[0].parentNode);
        resolve('finished playScreen animation');
    })
}

function highLightActivePlayer(sign){
    const playerOne = document.getElementById('playerOne');
    const playerTwo = document.getElementById('playerTwo');

    if(sign === 'X'){
        playerOne.classList.add('focus')
        playerTwo.classList.remove('focus');
    }else{
        playerOne.classList.remove('focus')
        playerTwo.classList.add('focus');
    }
}

function updateDomBoard(){

}

function updateDomRoundCount(count){
    const roundCount = document.getElementById('roundCount');
    roundCount.textContent = count;
}

function updateDomWins(p1, p2){
    const playerOne = document.getElementById('firstPlayerWins');
    const playerTwo = document.getElementById('secondPlayerWins');
    playerOne.textContent = p1;
    playerTwo.textContent = p2;
}

function updateDomStatus(player = 'tie'){
    const roundStatus = document.getElementById('status');
    if(player === 'tie'){
        roundStatus.textContent = 'It\'s a tie!';
    }else{
        roundStatus.textContent = `${player.id} wins this round`;
    }
}

function clearDomStatus(){
    const roundStatus = document.getElementById('status');
    roundStatus.textContent = '';
}

function highLightRoundWinner(sign = 'tie', p1, p2){
    if(sign === 'tie'){
        resetRoundWinnerHighlight();
        updateDomStatus();
        return;
    }else{
        highLightActivePlayer(sign);
    }

    if(sign === 'X'){
        updateDomStatus(p1);
    }else {
        updateDomStatus(p2);
    }
}

function resetRoundWinnerHighlight(){
    const playerOne = document.getElementById('firstPlayerWins');
    const playerTwo = document.getElementById('secondPlayerWins');
    playerOne.classList.remove('focus');
    playerTwo.classList.remove('focus');
}

function clearDomBoard(){
    const spaces = document.querySelectorAll('.space')
    spaces.forEach(space =>{
        space.textContent = '';
    })
}


export{bootPlayScreen, updateDomWins, updateDomRoundCount, highLightActivePlayer,
     updateDomBoard, highLightRoundWinner, resetRoundWinnerHighlight, clearDomBoard, clearDomStatus};
