// DEAL BUTTON - deals 2 cards to human and AI, shows the card in DOM of both, shows sum of cards of both
// HIT BUTTON - adds 1 card to initial pair of human, shows the new card in DOM, shows sum of cards human
// STAND BUTTON - keeps hitting until >=17 to AI cards, shows new AI card in DOM, shows sum of cards AI

// Defining properties and methods for every single card object created by PackOfCards function
function cardObject(cardNum,cardSuit) {
	this.cardNum = cardNum;
	this.cardSuit = cardSuit;
}
cardObject.prototype.getCardValue = function() {
		if (this.cardNum === "jack" || this.cardNum === "queen" || this.cardNum === "king") {
			return 10;
		} else if (this.cardNum === "ace") {
			return 11;
		} else {
			return this.cardNum;
		}
}
cardObject.prototype.getCardSuit = function() {
		return this.cardSuit;
}
// Creating a deck of shuffled card where every card has cardObject properties and methods
function PackOfCards() {
	var unshuffledDeck = [], shuffledDeck = [];
	var listCardNum = ["ace",2,3,4,5,6,7,8,9,10,"jack","queen","king"];
	var listCardSuits = ["clubs","diamonds","hearts","spades"];
	for (var i=0; i<listCardNum.length; i++) {
		for (var j=0; j<listCardSuits.length; j++) {
			unshuffledDeck.push(new cardObject(listCardNum[i],listCardSuits[j]));	//generating 52 new card objects
		}
	}
	var lengthCounter = unshuffledDeck.length;
	while(lengthCounter>0) {					// shuffling the 52 unshuffled cards randomly
		var tempPosition = Math.floor(Math.random()*lengthCounter);
		shuffledDeck.push(unshuffledDeck.splice(tempPosition,1)[0]);
		lengthCounter--
	}
return shuffledDeck;
}

var newDeck = PackOfCards();	// creating an instance of the function as the main playing deck