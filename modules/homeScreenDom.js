function startGameAnimations(){
    let selected = document.querySelectorAll('.selected');
    const homeScreen = document.querySelector('.homeScreen');
    homeScreen.classList.add('animate__bounceOut');
    setTimeout(()=>{
        homeScreen.classList.add('d-none');
    }, 1500)
    return selected;
}

function bootUpGame(){
    const homescreen = document.querySelector('.homeScreen');
    const playerOneButton = document.getElementById('player-one');
    const cpuOneButton = document.getElementById('bot-one');
    const playerTwoButton = document.getElementById('player-two');
    const cpuTwoButton = document.getElementById('bot-two');
    const gameStartButton = document.getElementById('start');
    const playerX = document.getElementById('X');
    const playerO = document.getElementById('O');
    const startButton = document.getElementById('start');
    let buttons = [];
    buttons.push(playerOneButton, playerTwoButton, cpuOneButton, cpuTwoButton);
    let cpuButtons = [];
    cpuButtons = [];
    cpuButtons.push(cpuOneButton, cpuTwoButton);
    

    //Function to check if both players are selected to add animation of start button
    function checkBothPlayersSelected(){
        let playerOne = false;
        let playerTwo = false;
        let selectedItems = document.querySelectorAll('.selected');
        selectedItems.forEach(item =>{
            if(playerX.contains(item)) playerOne = true;
            if(playerO.contains(item)) playerTwo = true;
        })

        if(playerOne && playerTwo){
            startButton.classList.add('animate');
        }
    }
    
    // Function to check if parent node already contains a selected item if it does it returns the 
    // selected item
    function checkParentContainsSelected(element){ 
        let parentNode = element.parentNode;
        let selectedItem = document.querySelectorAll('.selected');
        let hasSelected;
        selectedItem.forEach(item =>{
            if(parentNode.contains(item)){
                hasSelected = item;
            }
        })
        return hasSelected;
    }

    //Function to revert CPU text content back to 'CPU'
    function revertCPU(element){
        if(!element.classList.contains('selected')){
            element.textContent = 'CPU';
        }
    }

    // Function to toggle active styling using checkToggle function if it has a sibling element 
    // that has already been selected the class is removed
    function toggleActive(element){
            let hasSelected = checkParentContainsSelected(element);
            if(!hasSelected){
                element.classList.toggle('selected');
                return;
            }

            if(hasSelected !== element){
                element.classList.toggle('selected');
                hasSelected.classList.toggle('selected');
                if(hasSelected === cpuOneButton || hasSelected === cpuTwoButton){ // conditional to check if previously selected item is a CPU
                    revertCPU(hasSelected);
                }
            }
    }

    //Function to toggle text on CPU buttons
    function toggleText(element){
        return function (){
            if(element.textContent === 'CPU' || element.textContent === 'Impossible') element.textContent = 'Easy';
            else if(element.textContent === 'Easy') element.textContent = 'Hard';
            else element.textContent = 'Impossible';
        }   
    }

    
    //For each loop to add event listener to each button
    buttons.forEach(button =>{
        button.addEventListener('click', ()=>{
            toggleActive(button);
            checkBothPlayersSelected();
        });
    })

    //For each loop to add event listener to each CPU button
    cpuButtons.forEach(button =>{
        button.addEventListener('click', toggleText(button));
    })
}

export {bootUpGame, startGameAnimations};
