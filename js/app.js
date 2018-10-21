var container = document.querySelector('.container');
var cards = ['fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-leaf','fa-bicycle','fa-bomb','fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-leaf','fa-bicycle','fa-bomb'];

// Restarts game button
var restart = document.querySelector('.fa-repeat').addEventListener('click', function(){ 
    restartGame();
});

// Restart Game
function restartGame(){
    document.querySelector('.deck').remove();
    document.querySelector('.stars').remove();
    gameInit();
}

// Timer
var timer = document.querySelector('.seconds'); // Timer
var time = 0;
var timeEnd;

function keepTime(){
   timeEnd = setTimeout(function(){
         setTimeout(function(){
           time++;
           keepTime();
        },1000)
  timer.innerHTML = time;
 },0);
 document.querySelector('.fa-repeat').addEventListener('click', function(){clearTimeout(timeEnd);}); 
}


//Starts game initially
keepTime();
gameInit();

function gameInit(){
    time = 0;
    timer.innerHTML = time;

    var ul = document.createElement('ul');
    var stars = document.createElement('ul');
    var counter = 0;
    var moves = document.querySelector('.moves');
    var scorePanel = document.querySelector('.score-panel');
    var openCards = [];
    var totalMatches = 0;
    
    moves.innerHTML = counter;
    ul.classList.add('deck');
    stars.classList.add('stars')

    container.appendChild(ul);
    scorePanel.insertAdjacentElement('afterbegin', stars);

    // Creates the stars
    for (let x = 0; x < 3; x++){
        starHtml();
    }
    function starHtml(){
        const starLi = document.createElement('li');
        const starI = document.createElement('i');
        starI.classList.add('fa', 'fa-star');
        starLi.appendChild(starI)
        stars.appendChild(starLi);
    }

     // Creates the cards
    cards = shuffle(cards);
    for (let x = 0; x < cards.length; x++){
        cardHtml(cards[x]);
    }
    function cardHtml(name){
        const newCard = document.createElement('li');
        const newI = document.createElement('i');
   
        newCard.classList.add('card');
        newI.classList.add('fa',name);
    
        newCard.appendChild(newI);
        ul.appendChild(newCard);
    }


    // Event listeners for Cards.
    ul.addEventListener('click', function(evt){

        if(evt.target.tagName === 'LI' && openCards.length < 2){ //Listener only triggers when there aren't two open cards currently.

            if(!evt.target.classList.contains('show')){
                evt.target.classList.add('show', 'open');
                openCards.push(evt.target.innerHTML);
            }

            if(openCards.length === 2){

                var cardsShowing = document.querySelectorAll('li.card.show'); // Select cards that are showing.
              
                if(openCards[0] === openCards[1]){
                    match();
                }else{
                    nonMatch();
                }

                counter++;
                moves.innerHTML = counter;
                if(counter > 13 && stars.childElementCount > 2){ //Changes stars based on move ammount.
                    stars.firstElementChild.remove();
                } else if(counter > 15 && stars.childElementCount > 1){
                    stars.firstElementChild.remove();
                }  else if(counter > 16 && stars.childElementCount > 0){
                    stars.firstElementChild.remove();
                }
            }
            
        }

        function match(){
            console.log("match!");
            setTimeout(function(){
                cardsShowing[0].classList.add('match');
                cardsShowing[1].classList.add('match');
                cardsShowing[0].classList.toggle('show');
                cardsShowing[1].classList.toggle('show');
                openCards = [];
                totalMatches++;
                if(totalMatches === 8){
                    victory();
                }
            }, 600);
        }
    
        function nonMatch(){
            console.log("non match!");
            setTimeout(function(){
                cardsShowing[0].classList.remove('show','open');
                cardsShowing[1].classList.remove('show','open');
                openCards = [];
            }, 1000);
        }


    })

    function victory(){
        window.alert("Congratulations you win! \n Your rating was " + stars.childElementCount + " Stars. Your time was: " +  timer.innerHTML + " seconds. \n Would you like to play again?");
        restartGame();
    }

}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}