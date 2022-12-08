export function bootLoadScreen(players){
    const loadScreen = document.querySelector('.loadScreen');
    const playerOne = document.getElementById('firstSelection');
    const playerTwo = document.getElementById('secondSelection');
    const loadStart = document.querySelector('.loadStart');
    const countDown = document.getElementById('count');
    let count = 3;
    countDown.textContent = count;

    function formatPlayerText(player){
        if(player.textContent === 'Player' ) return player.id;
        return `${player.id} : ${player.textContent.toLowerCase()}`;
    }

    playerOne.textContent = `${formatPlayerText(players[0])}`;
    playerTwo.textContent = `${formatPlayerText(players[1])}`;
    loadScreen.classList.remove('d-none');
    loadScreen.classList.add('animate__bounceIn');

    setTimeout(() =>{
        loadStart.classList.remove('d-none');
        loadStart.classList.add('animate__bounceIn');

        const timer = setInterval(()=>{
            count--;
            countDown.textContent = count;
            if(count === 0){
                clearInterval(timer);
            }
        }, 1000)
    }, 1000)

}