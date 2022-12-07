export function bootUpGame(){
    let homescreen = document.querySelector('.homeScreen');
    let playerOneButton = document.getElementById('p1');
    let cpuOneButton = document.getElementById('bot1');
    let playerTwoButton = document.getElementById('p2');
    let cpuTwoButton = document.getElementById('bot2');
    let gameStartButton = document.getElementById('start');
    let buttons = [];
    buttons.push(playerOneButton, playerTwoButton, cpuOneButton, cpuTwoButton);
    let cpuButtons = [];
    cpuButtons = [];
    cpuButtons.push(cpuOneButton, cpuTwoButton);
    
    
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
        return function(){
            let hasSelected = checkParentContainsSelected(element);
            if(hasSelected !== element){
                element.classList.toggle('selected');
                hasSelected.classList.toggle('selected');
                if(hasSelected === cpuOneButton || hasSelected === cpuTwoButton){ // conditional to check if previously selected item is a CPU
                    revertCPU(hasSelected);
                }
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
        button.addEventListener('click', toggleActive(button));
    })

    //For each loop to add event listener to each CPU button
    cpuButtons.forEach(button =>{
        button.addEventListener('click', toggleText(button));
    })
    
}

