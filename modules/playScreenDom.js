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


function updateWins(){

}

function updateRoundCount(){

}

function updateDomBoard(){

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

export{bootPlayScreen, updateWins, updateRoundCount, highLightActivePlayer, updateDomBoard};
