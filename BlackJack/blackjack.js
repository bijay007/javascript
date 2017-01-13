// function that creates a deck of 52 shuffled cards
function mainDeck() {
	var listSuits = ["clubs","diamonds","hearts","spades"];
	var normalDeck = [], shuffledDeck = [], tempPosition;
	for (var i=1; i<14; i++){                   // Creating 52 cards
		for (var j=0; j<listSuits.length; j++){
		normalDeck.push([i,listSuits[j]]);	
		}
	}
	var shuffler = normalDeck.length;
	while (shuffler>0) {                 // Shuffling the 52 cards
		tempPosition = Math.floor(Math.random()*shuffler);
		shuffledDeck.push(unshuffledDeck.splice(tempPosition, 1)[0]);
		shuffler--;
	}
	return shuffledDeck;
}
// creating a variable to store an instance of mainDeck() function
var instanceDeck = mainDeck();
// function to take out one single card from the deck
function singleCard() {
	var poppedCard = instanceDeck.pop();
	return poppedCard;
}
// function to pull two cards from the top as first 2 card pair for both players
function currentPlayer() {
	var firstPair = [singleCard(),singleCard()];
	return firstPair;
}
// invokes singleCard function and appends the popped card to currentPlayer array
function hitCard(player) {
	var newLength = player.push(singleCard());
	showCards(player[newLength-1]);	// showing only the extra added card
	sumCards(player);
}
// function to add the card values of user and dealer card arrays
function sumCards(cards) {
	var sum = 0;
	var aces = 0;
	for (var i = 0; i<cards.length; i++) {
		if (cards[i][0]>=10) {
			sum += 10;
		} else {
			sum += cards[i][0];
		}
	}
	if (cards[i][0] === 1) {
		aces += 1;
		while (aces>0 && sum>21) {
			aces -=1;
			sum -=10;
		}
	}
	return sum;
}
// appending image on DOM
function showCards(currentCards) {
	var x = currentCards;
	for (var i=0; i<x.length; i++) {
		document.getElementById("image-section").appendChild(document.createElement("img")).src ="Blackjack/"+x[i][0]+"_of_"+x[i][1]+".png";
	}
}
// user function
function userTurn() {
	var userCards = currentPlayer();
	showCards(userCards);
	return sumCards(userCards);
}
// dealer initial function
function dealerTurn() {
	var dealerCards = currentPlayer();
	showCards(dealerCards);
	return dealerCards;
}
var instanceDealer = dealerTurn();
// dealer's hit function that executes when the user stands
function dealerHits(){
	while (sumCards(instanceDealer)<17) {
		hitCard(instanceDealer);
	}
	return sumCards(instanceDealer);
}
// executes on deal button click
function mainGame() {
	var userScore = userTurn();	// invokes user function
	var dealerScore = dealerHits();	// invokes dealer function
	return [userScore,dealerScore];
}
var bothScore = mainGame();	// storing value of mainGame in a variable (unsure!!)
// writing results to HTML
function showResults(bothScore) {
	var writeResult = document.getElementById("resultbox");
	if (bothScore[0] >21) {
		writeResult.innerHTML = "You busted. Dealer wins";
	} else if (bothScore[0]<=21 && bothScore[0]>bothScore[1]) {
		writeResult.innerHTML = "Great! You win";
	} else if (bothScore[0]<=21 && bothScore[1]>21) {
		writeResult.innerHTML = "Dealer busted. You win";
	} else {
		writeResult.innerHTML = "Dealer wins";
	}
}
// main event-listeners
document.getElementById("hit").addEventListener("click",hitCard);	// executes hitCard() function
document.getElementById("stand").addEventListener("click",showResults);	// executes showResults() function
document.getElementById("deal").addEventListener("click",mainGame);	// executes user and dealer functions