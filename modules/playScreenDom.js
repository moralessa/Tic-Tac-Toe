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

function updateDomBoard(index, sign){
    const chosenSpace = document.getElementById(`s${index}`);
    setTimeout(()=>{
        chosenSpace.textContent = sign;
        chosenSpace.style.backgroundColor = 'rgba(128, 202, 128, 0.411)';
        setTimeout(()=>{
            chosenSpace.style.backgroundColor = 'white';
        }, 500)
    }, 500)
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

function updateDomRoundStatus(player = 'tie'){
    const roundStatus = document.getElementById('status');
    if(player === 'tie'){
        roundStatus.textContent = 'It\'s a tie!';
    }else if(player === 'new round'){
        roundStatus.textContent = 'Initiating new round';
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
        updateDomRoundStatus();
        return;
    }else{
        highLightActivePlayer(sign);
    }

    if(sign === 'X'){
        updateDomRoundStatus(p1);
    }else {
        updateDomRoundStatus(p2);
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

function endGameDomAnimation(sign, player){
    const roundStatus = document.getElementById('status');
    const playerOne = document.getElementById('playerOne');
    const playerTwo = document.getElementById('playerTwo');
    const playAgainButton = document.getElementById('again');
    let crownIcon = document.createElement('i');
    crownIcon.classList.add('fa-solid', 'fa-crown');
    crownIcon.style.marginLeft = '20px';
    if(sign === 'X'){
        highLightActivePlayer(sign);
        playerOne.append(crownIcon);
        roundStatus.textContent = `${player.id} is the winner!`
    }else if(sign === 'O'){
        highLightActivePlayer(sign);
        playerTwo.append(crownIcon);
        roundStatus.textContent = `${player.id} is the winner!`;
    }else{
        roundStatus.textContent = `The Game ended in a tie! 💩`
    }

    setTimeout(()=>{
        playAgainButton.style.opacity = 1;
        playAgainButton.addEventListener('click', ()=>{
            location.reload();
        })
    }, 1000)
}


export{bootPlayScreen, updateDomWins, updateDomRoundCount, highLightActivePlayer, endGameDomAnimation,
     updateDomBoard, highLightRoundWinner, resetRoundWinnerHighlight, clearDomBoard, clearDomStatus};
