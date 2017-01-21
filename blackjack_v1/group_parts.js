//*************************** BLACKJACK GAME FOR PROFESSIONALS ****************************//
"use strict"
// *************** MAIN CARDOBJECT (independent from other part of code) **************** //

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
};
// Creating a deck of shuffled card where every card has cardObject properties and methods
var deckOfCards = (function PackOfCards() {
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
}());

// ***************** ALL POSSIBLE CARD METHODS ********************** //

function HandActions() {

	this.popCards = function() {		// first 2 cards for user/dealer
		var cardPair = [deckOfCards.pop(),deckOfCards.pop()];
		return cardPair;
	};

	this.displayCards = function(cards) {		// displaying corresponding card images on DOM
    	var fragment = document.createDocumentFragment();	// only child nodes of fragment are added
    	for (var i = 0; i < cards.length; i++) {
			var imgEle = document.createElement("img");
			imgEle.src = "Blackjack/" + cards[i].cardNum + "_of_" + cards[i].cardSuit + ".png";
        	imgEle.style.height ="50px";
        	imgEle.style.width="50px";
        	fragment.appendChild(imgEle);
    	}
		document.getElementById("card_images").appendChild(fragment);
	};

	this.sumOfCards = function(cards){		// function to add card values
		var sum = 0, aces = 0;
		for (var i = 0; i<cards.length; i++) {
			if (cards[i].getCardValue() === 11) {	// checking for aces; if >21, sum is decreased by 10
				aces += 1;
				while (aces>0 && sum>21) {
					aces -= 1;
					sum -= 10;
				}
			} else {
				sum = sum + cards[i].getCardValue();
			}
		}
		return sum;
	};

	this.hitCard = function(cards) {		// pushing a new card to user/dealer hand
		var addedCard = cards.push(deckOfCards.pop());
		displayCards(cards[addedCard-1]);	// display only the new added card
		this.sumCards(cards);
	};
}

// **************  PLAYER AND DEALER FUNCTIONS ******************* //

function playerX() {
	var newPlayer = new HandActions();
	return playerPair;
}

function dealerX() {
	var newDealer = new HandActions();
	//(if standBtn || sumOfCards(player)>21) -> hitCards(dealer)
	return dealerPair;
}

function dealerHit() {
	if (standBtn || playerX.sumOfCards()>21) {
		dealerX.hitCard();
	}
}

// ************** MAIN GAME AND RESULTS FUNCTIONS ************* //

function finalResults(player,house) {
	while (house<17 && standBtn) {
		hitCard(dealerCards);
	}
	var writeResult = document.getElementById("result_box");
    if (player > 21) {
        if (house > 21) {
            showResult = writeResult.textContent = "Both busted. It's a Tie";
        } else {
            showResult = writeResult.textContent = "You busted. house won";
        }
    } else if (house > 21) {
        showResult = writeResult.textContent = "house busted. You win";
    } else if (player > house) {
        showResult = writeResult.textContent = "You scored" + player + ". You win";
    } else if (player == house) {
        showResult = writeResult.textContent = "It's a tie !";
    } else {
        showResult = writeResult.textContent = "house scored" + house + ". You lose";
    }
    return showResult;
}

(function playBlackjack() {	// main game initiator function on 'Play'
	var dealer = dealerX();
	var player = playerX();
	return [dealer,player];
}());

var hit = document.getElementById("hitBtn").addEventListener("click",playerX.hitCard);
var stand = document.getElementById("standBtn").addEventListener("click",dealerHit);
var deal = document.getElementById("dealBtn").addEventListener("click",playBlackjack);