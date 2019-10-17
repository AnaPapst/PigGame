var score, roundScore, activePlayer, gamePlaying, inputScore;

init(); //run the clear page

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        //1. random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;


        //2. Display the result of the number in the dice block
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png' //last dice, because it's references Math.floor (num 3, dice-3.png. num 8, dice-8.png)
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png' //last dice, because it's references Math.floor (num 3, dice-3.png. num 8, dice-8.png)

        //3. Update the round score IF the rolled number was NOT a 1 
        if (dice1 !== 1 && dice2 !== 1) {
            //Add Score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // next player
            nextPlayer();
        }

        /*
        if (dice === 6 && diceAnterior === 6) {
            // player looses score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer),textContent = '0';
            // Next Playr
            nextPlayer();

        } else if (dice !== 1) {
            //add score
            roundScore += dice; // when you roll the dice for the second time, or third, the value is add to the the last value.
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else {
            //Next Player
                nextPlayer();
        }

        diceAnterior = dice;
        */
    }
});

// HOLD BUTTON

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Add CURRENT score to  GLOBAL score
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
        //next player
        if (activePlayer === 0) {
            activePlayer = 1;
        } else {
            activePlayer = 0;
        }
            roundScore = 0;
    
        document.getElementById('current-0').textContent = '0'; // zera no momento que é tirado 1 no dice
        document.getElementById('current-1').textContent = '0';
        
        document.querySelector('.player-0-panel').classList.toggle('active'); // faz com que muse o active style pro outro jogador (remove/add)
        document.querySelector('.player-1-panel').classList.toggle('active');
    
        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';
}

// BTN NEW

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0]; // Global score | 0 = Active Player 0 ; 1 = Active Player 1 
    roundScore = 0;
    activePlayer = 0; // Player 1 = ActivePlayer 0 | Player 2 = ActivePlayer 1
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
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
