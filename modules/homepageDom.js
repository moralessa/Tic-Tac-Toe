export function bootUpGame(){
    let homescreen = document.querySelector('.homeScreen');
    let playerOneButton = document.getElementById('p1');
    let cpuOneButton = document.getElementById('bot1');
    let playerTwoButton = document.getElementById('p2');
    let cpuTwoButton = document.getElementById('bot2');
    let gameStartButton = document.getElementById('start');
    let buttons = [];
    buttons.push(playerOneButton, playerTwoButton, cpuOneButton, cpuTwoButton);
    
    
    // Function to check if parent node already contains a selected item if it does it returns the 
    // selected item
    function checkToggle(element){ 
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

    // Function to toggle active styling using checkToggle function if it has a sibling element 
    // that has already been selected the class is removed
    function toggleActive(element){
        return function(){
            let hasSelected = checkToggle(element);
            if(hasSelected){
                hasSelected.classList.remove('selected');
            } 
            element.classList.toggle('selected');
        }
    }

    
    //For each loop to add event listener to each button
    buttons.forEach(button =>{
        button.addEventListener('click', toggleActive(button));
    })


    
}

