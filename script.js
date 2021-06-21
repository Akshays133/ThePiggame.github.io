    /** The pig Game 
 * Rules for it
 * 
 */

var activePlayer,scores,roundScore,gamePlaying,lastDice;
 init();



 document.querySelector('.btn--roll').addEventListener('click', function(){
    if(gamePlaying){
            // 1. Random Number
         var dice1 = Math.floor(Math.random() * 6) + 1;
         var dice2 = Math.floor(Math.random() * 6) + 1;

            // 2. Display the result
            document.getElementById('dice1').style.display = 'block';
            document.getElementById('dice2').style.display = 'block';
            document.getElementById('dice1').src = 'dice-' + dice1 + '.png';
            document.getElementById('dice2').src = 'dice-' + dice2 + '.png';

            //3. Update the roundScore if the rolled number is 1
            if(dice1 === 6 && dice2 === 6){
                scores[activePlayer] = 0;
                document.getElementById('score--' + activePlayer).textContent = '0';
                nextPlayer();
                
            }else if(dice1 !== 1 && dice2 !==1){
             roundScore += dice1 + dice2;
             document.getElementById(`current--${activePlayer}`).textContent = roundScore;
            }else {
             //NextPlayer
             nextPlayer();
            }
            lastDice = dice;
    }
    
});

document.querySelector('.btn--hold').addEventListener('click',function(){
   if(gamePlaying){
     //Add scores to display
     scores[activePlayer] += roundScore;
    
     // Update the score in the context 
     document.getElementById('score--' + activePlayer).textContent = scores[activePlayer];


     var input = document.querySelector('.final-score').value;
     var scoreWin;
     
     if (input){
         scoreWin = input;
     } else {
         scoreWin = 100;
     }

     //check if player won
     if(scores[activePlayer] >= scoreWin){
          document.querySelector('#name--' + activePlayer).textContent = 'Winner!';
          document.getElementById('dice1').style.display = 'none';
          document.getElementById('dice2').style.display = 'none';
          document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
          document.querySelector('.player--' + activePlayer).classList.remove('player--active');
          gamePlaying = false;
     }    else {
         nextPlayer();
        }
    }
    
});

document.querySelector('.btn--new').addEventListener('click', init);


function nextPlayer(){
    roundScore = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        document.getElementById('current--0').textContent = '0';
        document.getElementById('current--1').textContent = '0';
        document.querySelector('.player--0').classList.toggle('player--active');
        document.querySelector('.player--1').classList.toggle('player--active');

        document.getElementById('dice1').style.display = 'block';
        document.getElementById('dice2').style.display = 'block';
};

function init(){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.getElementById('dice1').style.display = 'none';
    document.getElementById('dice2').style.display = 'none';
    document.getElementById('score--0').textContent = '0';
    document.getElementById('score--1').textContent = '0';
    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';
    document.getElementById('name--0').textContent = 'Player 1';
    document.getElementById('name--1').textContent = 'Player 2';
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');
    document.querySelector('.player--0').classList.add('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
};
