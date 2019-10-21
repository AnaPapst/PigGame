var score, roundScore, gamePlaying, inputScore, animationInterval;
var diceAnimationIteractions = 0;

init(); //run the clear page

document.querySelector('.btn-roll').addEventListener('click', function() {
    clearError();
    animation();
});

// HOLD BUTTON

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Add CURRENT score to  GLOBAL score
        var activePlayer = getActivePlayer();
        scores[activePlayer] += roundScore;

        // Update the User Interface
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // INPUT
        var input = document.getElementById("input-score").value;
        var winingScore;

        if (input) { // if input is TRUE
            winingScore = input;
        } else {
            winingScore = 100;
        }

        // Check if player won the game
        if (scores[activePlayer] >= winingScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {            
            //Next Player
            nextPlayer();}
    }
});

function nextPlayer() {
    var activePlayer = getActivePlayer();
        //next player
        if (activePlayer === 0) {
            activePlayer = 1;
        } else {
            activePlayer = 0;
        }
            roundScore = 0;
    
        document.getElementById('current-0').textContent = '0'; // zera no momento que é tirado 1 no dice;
        document.getElementById('current-1').textContent = '0';
        
        document.querySelector('.player-0-panel').classList.toggle('active'); // faz com que mude o active style pro outro jogador (remove/add)
        document.querySelector('.player-1-panel').classList.toggle('active');

        //Desaparece o aviso e shadow de dado 1 depois de x segundos
        setTimeout( function() {
            clearError();
          }, 5000 );
}

// BTN NEW

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0]; // Global score | 0 = Active Player 0 ; 1 = Active Player 1 
    roundScore = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none'; // esconde o dado
    document.getElementById('dice-2').style.display = 'none'; // esconde o dado

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1!';
    document.getElementById('name-1').textContent = 'Player 2!';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.remove('active');
    //document.querySelector('.player-0-panel').classList.add('active');
}

function getActivePlayer() {
    var activePlayer = 0;
    var activePlayerElement = document.querySelector('.active');
    var activePlayerClass = activePlayerElement.className;//player-1 active player-0 active
    if(activePlayerClass.indexOf('1') > 0){
        activePlayer = 1;
    }
    return activePlayer;
}


function animation() {
    //desabilitar botao aqui
    
    document.querySelector(".btn-roll").disabled = true;

    animationInterval = setInterval(animateDice, 150);
}

function animateDice(){
    
    if(diceAnimationIteractions > 10){
        clearInterval(animationInterval);
        diceAnimationIteractions = 0;
        main();
    } else {
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        var random = Math.floor(Math.random() * 6) + 1;
        document.getElementById('dice-1').src = 'dice-' + random  + '.png';
        random = Math.floor(Math.random() * 6) + 1;
        document.getElementById('dice-2').src = 'dice-' + random  + '.png';
        console.log(diceAnimationIteractions);
        diceAnimationIteractions++;
    }
}

function main() {
    if (gamePlaying) {
        var activePlayer = getActivePlayer();

        //1. random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        console.log('dado1 '+ dice1);
        console.log('dado2 '+ dice2);


        //2. Display the result of the number in the dice block
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png' //last dice, because it's references Math.floor (num 3, dice-3.png. num 8, dice-8.png)
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png' //last dice, because it's references Math.floor (num 3, dice-3.png. num 8, dice-8.png)

        //3. Update the round score IF the rolled number was NOT a 1             
        if (dice1 !== 1 && dice2 !== 1) {
            //Add Score
            roundScore += dice1 + dice2;
            var activePlayer = getActivePlayer();
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Adicionar um metodo que coloca mensagens de erro sobre ter tirado 1 nos dados antes de trocar de jogador
            if (dice1 === 1 || dice2 === 1) {
                document.querySelector('.erro').textContent = 'Valor 1. Próximo!';

            }

            // Shadow de aviso dado 1
            if (dice1 === 1) {
                document.getElementById('dice-1').style.boxShadow = "0 0 1em red";
            } else if (dice2 === 1) {
                document.getElementById('dice-2').style.boxShadow = "0 0 1em red";
            }

            // next player
            nextPlayer();
        }
        //habilitar botao
        document.querySelector(".btn-roll").disabled = false;
    }
}

function clearError() {
    document.querySelector('.erro').textContent = '';
    document.getElementById('dice-1').style.boxShadow = "0px 10px 60px rgba(0, 0, 0, 0.10)";
    document.getElementById('dice-2').style.boxShadow = "0px 10px 60px rgba(0, 0, 0, 0.10)";
}