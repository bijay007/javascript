"use strict"
// creating card object that has its number, suit and exact value
function CardConstructer(number, suit) {
    this.number = number;
    this.suit = suit;
    this.getValue = function() {
        if (this.number === "ace") {
            return 11;
        } else if (this.number === "jack" || this.number === "queen" || this.number === "king") {
            return 10;
        } else {
            return parseInt(this.number);
        }
    };
    this.getSuit = function() {
        return this.suit;
    };
};

// create a deck of 52 cards, shuffle it and pop out cards from deck 1 by 1
function DeckOfCards() {
    var cards = [];
    var _listOfFaces = new Array("ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king");
    var _listOfSuits = new Array("clubs", "diamonds", "hearts", "spades");

    function all52Cards() {
        for (var j = 0; j < _listOfFaces.length; j++) {
            for (var k = 0; k < _listOfSuits.length; k++) {
                cards.push(new CardConstructer(_listOfFaces[j], _listOfSuits[k]));
            }
        }
    }
    all52Cards(); // running the function once so the cards[] array is filled with 52 cards without need to return sequenced cards as we shuffle it later anyway

};

DeckOfCards.prototype.shuffle = function() { // Fischer-Yates Algorith
    var n = cards.length,
        randomNum, tempValue;
    while (n) {
        randomNum = Math.floor(Math.random() * n--);
        tempValue = cards[n];
        cards[n] = cards[randomNum];
        cards[randomNum] = tempValue;
    }
    return cards; // here we return deck of shuffled cards
}

DeckOfCards.prototype.dealCard = function() {
    var z = this.shuffle().pop();
    console.log('z',z.getValue());
    return z; // we take out single card from the shuffled deck for display
}

// create hands for player and dealer, add the values and prints hand, allows hit and stand options
function HandActions() {
    var aCard = new DeckOfCards(); // creating object instance of DeckOfCards to access all its public methods
    var cardPair = [aCard.dealCard(), aCard.dealCard()]; //pop two cards from stack and set them as initial pair
    addImagestoHTML(cardPair);  // appends the 2 cards in html
    
    this.addValues = function() {
        var sum = 0;
        var aces = 0;
        for (var i = 0; i < cardPair.length; i++) {
            //console.log(cardPair[i]);
            if (cardPair[i].getValue() == 11) {
                aces += 1;
            }
            sum = sum + cardPair[i].getValue();
        }
        while (sum > 21 && aces > 0) {
            sum -= 10;
            aces -= 1;
        }
        return sum;
    };
    this.hitMore = function() {
        console.log("checking");
        var newCard = new DeckOfCards();
        cardPair.push(newCard);
        addImagestoHTML(cardPair);
    };

};


// the dealer and the user
function newDealer() {
    var dealerCards = new HandActions();
    if (dealerCards.addValues() < 17) {
        dealerCards.hitMore();
    }
    return dealerCards;
};

function newUser() {
    var userCards = new HandActions();
    return userCards;
};

function addImagestoHTML(cardPair) {    // creates 'img' element to html and appends respective images
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < cardPair.length; i++) {
        var image = document.createElement("img");
        image.src = "image/" + cardPair[i].number + "_of_" + cardPair[i].suit + ".png";
        image.style.height ="50px";
        image.style.width="50px";
        fragment.appendChild(image);
    }
    var x = document.getElementById("addimage");
    x.appendChild(fragment);
};

// function to printout results
function finalResult(dealer, user) {
    var showResult;
    if (user.addValues() > 21) {
        if (dealer.addValues() > 21) {
            showResult = document.getElementsByTagName("form").textContent = "Both busted. It's a Tie";
        } else {
            showResult = document.getElementsByTagName("form").textContent = "You busted. Dealer won";
        }
    } else if (dealer.addValues() > 21) {
        showResult = document.getElementsByTagName("form").textContent = "Dealer busted. You win";
    } else if (user.addValues() > dealer.addValues()) {
        showResult = document.getElementsByTagName("form").textContent = "You scored high. You win ";
    } else if (user.addValues() == dealer.addValues()) {
        showResult = document.getElementsByTagName("form").textContent = "A tie !";
    } else {
        showResult = document.getElementsByTagName("form").textContent = "You lost. Dealer won";
    }
    return showResult + "Dealer has " + dealer.addValues() + " & you have " + user.addValues();
};

// game initiator function -- IIFE for invocation on window load
function playGame() {
    dealer = newDealer();
    user = newUser();
    var show = finalResult(newDealer, newUser);
};

var user;
var dealer;

var hitBtn = document.getElementById("hit").addEventListener("click", user.hitMore);
var standBtn = document.getElementById("stand").addEventListener("click", dealer);
var resetBtn = document.getElementById("reset").addEventListener("click", playGame);
var dealBtn = document.getElementById("deal").addEventListener("click", playGame);

playGame();