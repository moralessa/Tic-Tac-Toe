import { bootUpGame, startGame } from "./homepageDom.js";
import { bootLoadScreen } from "./loadScreenDom.js";

const startButton = document.getElementById('start');
let selectedPlayers;
startButton.addEventListener('click', ()=>{
    selectedPlayers = startGame();
    setTimeout(()=>{
        bootLoadScreen(selectedPlayers);
    }, 2000)
})

bootUpGame();
