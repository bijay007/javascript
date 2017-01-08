// function that creates a deck of 52 shuffled cards
function deckCreate() {
  var listSuits = ["clubs", "diamonds", "hearts", "spades"];
  var normalDeck = [],
    shuffledDeck = [],
    temp;
  for (var i = 1; i < 14; i++) { // Creating 52 cards
    for (var j = 0; j < listSuits.length; j++) {
      normalDeck.push([i, listSuits[j]]);
    }
  }
  var shuffler = normalDeck.length;
  while (shuffler > 0) { // Shuffling the 52 cards
    temp = Math.floor(Math.random() * shuffler);
    shuffledDeck.push(normalDeck.splice(temp, 1));
    shuffler--;
  }
  return shuffledDeck;
}
// creating a variable to store an instance of deckCreate() value ( an array)
var instanceDeck = deckCreate();
// function to take out one single card from the deck
function singleCard() {
  return instanceDeck.pop();
}
// function to pull two cards from the top as first 2 card pair for both players
function currentPlayer() {
  this.iniHand = [singleCard(), singleCard()];
  return this.iniHand;
}
// invokes singleCard function and appends the returned card to currentPlayer array
function hitCard() {
  this.iniHand.push(singleCard());
  showCards();
}
// function to add the card values of currentPlayer card array
function sumCards(cards) {
  this.sum = 0; // public var reusable by both user and house
  var aces = 0;
  for (var i = 0; i < cards.length; i++) {
    if (cards[i][0] >= 10) {
      this.sum += 10;
    } else {
      this.sum += cards[i][0];
    }
  }
  if (cards[i][0] === 1) {
    aces += 1;
    while (aces > 0 && this.sum > 21) {
      aces -= 1;
      this.sum -= 10;
    }
  }
  return this.sum;
}
// appending image on DOM
function showCards(currentCard) {
  var x = currentCard;
  for (var i = 0; i < x.length; i++) {
    document.body.appendChild(document.createElement("img")).src = "imagefolder/" + x[i][0] + "_of_" + x[i][1] + ".png";
  }
}
// user function
function userTurn() {
  var userCards = currentPlayer();
  showCards(userCards);
  return sumCards(userCards);
}
// dealer function
function dealerTurn() {
  var dealerCards = currentPlayer();
  showCards(dealerCards);
  if (dealerCards.sumCards < 17) {
    hitCard();
    showCards(dealerCards);
  }
  return sumCards(dealerCards);
}
// writing results to HTML
function showResults() {
  var userScore = userTurn(); // invoke user function
  var dealerScore = dealerTurn(); // invoke dealer function
  var writeResult = document.getElementById("resultbox");
  if (userScore > 21) {
    writeResult.innerHTML = "You busted. Dealer wins";
  } else if (userScore <= 21 && userScore > dealerScore) {
    writeResult.innerHTML = "Great! You win";
  } else if (userScore <= 21 && dealerScore > 21) {
    writeResult.innerHTML = "Dealer busted. You win";
  } else {
    writeResult.innerHTML = "Dealer wins";
  }
}
// main event-listeners
document.getElementById("hit").addEventListner("click", hitCard); // executes hitCard() function on click
document.getElementById("stand").addEventListner("click", showResults); // executes showResults function which executes others
document.getElementById("deal").addEventListner("click", deckCreate); // creates a new deck on click
