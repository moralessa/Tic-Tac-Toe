"use strict"

const Player = (type, difficulty, sign)=>{
    const type_ = type;
    const sign_ = sign;
    const difficulty_ = difficulty;

    const getType = () =>{
        return type_;
    }

    const getSign = () =>{
        return sign_
    }

    const getDifficulty = () =>{
        return difficulty_;
    }

    return{getType, getSign};
}


const selection = (() =>{
    const playerX = document.getElementById('p1');
    const botX = document.getElementById('bot1');
    const playerO = document.getElementById('p2');
    const botO = document.getElementById('bot2');

    const toggleDifficulty = (bot) =>{
       const expr = bot.textContent;

       switch(expr){
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
                break;
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
        }
        if(botX.classList.contains('selected')){
            botX.classList.remove('selected');
            botX.textContent = 'CPU'
        }
    });

    botX.addEventListener('click', function(){
        if(!botX.classList.contains('selected')){
            botX.classList.add('selected');
        }
        if(playerX.classList.contains('selected')){
            playerX.classList.remove('selected');
        }
    });

    playerO.addEventListener('click', function(){
        if(!playerO.classList.contains('selected')){
            playerO.classList.add('selected');
        }
        if(botO.classList.contains('selected')){
            botO.classList.remove('selected');
            botO.textContent = 'CPU'
        }
    });

    botO.addEventListener('click', function(){
        if(!botO.classList.contains('selected')){
            botO.classList.add('selected');
        }
        if(playerO.classList.contains('selected')){
            playerO.classList.remove('selected');
        }
    });

})();