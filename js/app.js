/*
 * A list that holds all of your cards
 */
var container = document.querySelector('.container');
var cards = ['fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-leaf','fa-bicycle','fa-bomb','fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-leaf','fa-bicycle','fa-bomb'];
var counter = 0;
gameInit();

console.log(cards);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function gameInit(){
    
    var ul = document.createElement('ul');
    var counter = 0;
    var openCards = [];
    ul.classList.add('deck');
    //ul.id.add('deck');
    container.appendChild(ul);

    cards = shuffle(cards);
    for (let x = 0; x < cards.length; x++){
        cardHtml(cards[x]);
    }
    
    // Creates the cards
    function cardHtml(name){
        const newCard = document.createElement('li');
        const newI = document.createElement('i');
        newCard.classList.add('card');
        newI.classList.add('fa',name);
    
        newCard.appendChild(newI);
        ul.appendChild(newCard);
    }

    ul.addEventListener('click', function(evt){

        if(evt.target.tagName === 'LI' && openCards.length < 2){

            if(!evt.target.classList.contains('show')){
                evt.target.classList.toggle('show');
                openCards.push(evt.target.innerHTML);
            }

            if(openCards.length === 2){
                
                var cardsShowing = document.querySelectorAll('li.card.show'); // Select cards that are showing.
              
                if(openCards[0] === openCards[1]){
                    match();
                }else{
                    nonMatch();
                }
                console.log(openCards);
                counter++;
            }
            
        }

        function match(){
            console.log("match!");
            setTimeout(function(){
                cardsShowing[0].classList.toggle('show');
                cardsShowing[1].classList.toggle('show');
                openCards = [];
            }, 1000);
        }
    
        function nonMatch(){
            console.log("non match!");
            setTimeout(function(){
                cardsShowing[0].classList.toggle('show');
                cardsShowing[1].classList.toggle('show');
                openCards = [];
            }, 1000);
        }


    })

   

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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
