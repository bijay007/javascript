//*************************** BLACKJACK GAME FOR PROFESSIONALS ****************************//
"use strict";
// dom elements and event handlers
var deal = document.getElementById("dealBtn").addEventListener("click", playGame);
var hit = document.getElementById("hitBtn").addEventListener("click", goToHitMethod);
var stand = document.getElementById("standBtn").addEventListener("click", showScore);
var playerSum = document.getElementById("playersum");
var dealerSum = document.getElementById("dealersum");
var writeResult = document.getElementById("resultbox");

// Defining properties and methods for every single card object created by fillPlayingCards function
function CardObject(cardNum, cardSuit) {
    this.cardNum = cardNum;
    this.cardSuit = cardSuit;
}
CardObject.prototype.getCardValue = function() {
    if (this.cardNum === "jack" || this.cardNum === "queen" || this.cardNum === "king") {
        return 10;
    } else if (this.cardNum === "ace") {
        return 11;
    } else {
        return this.cardNum;
    }
};

// Deck object constructer with its properties and methods
function DeckObject() {
    this.iniDeck = [];
    this.displayCards = function(cards) { // displaying corresponding card images on DOM
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < cards.length; i++) {
            var imgElement = document.createElement("img");
            imgElement.src = "Images/" + cards[i].cardNum + "_of_" + cards[i].cardSuit + ".png";
            imgElement.style.height = "120px";
            imgElement.style.width = "100px";
            fragment.appendChild(imgElement);
        }
        if (this == mainPlayer) {
            document.getElementById("playercards").appendChild(fragment); // only child nodes of fragment are added on DOM
        } else {
            document.getElementById("dealercards").appendChild(fragment);
        }
    };
    this.sumCards = function(cards) { // adding numeric values of given cards
        var sum = 0,
            aces = 0;
        for (var i = 0; i < cards.length; i++) {
            if (cards[i].getCardValue() === 11) { // checking for aces; if >21, sum is decreased by 10
                aces += 1;
                sum = sum + cards[i].getCardValue();
            } else {
                sum = sum + cards[i].getCardValue();
            }
        }
        while (aces > 0 && sum > 21) {
            aces -= 1;
            sum -= 10;
        }
        return sum;
    };
    this.hitCard = function(cards) {
        var hitter = this;
        var extraCard = cards.push(PlayingDeck.iniDeck.pop());
        hitter.displayCards(cards[extraCard - 1]); // display only the new added card
        showScore();
    };
};

// Main deck used to play the game 
var PlayingDeck = new DeckObject();
(function fillPlayingDeck() { // Filling the main deck with card objects
    var listCardNum = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];
    var listCardSuits = ["clubs", "diamonds", "hearts", "spades"];
    for (var i = 0; i < listCardNum.length; i++) {
        for (var j = 0; j < listCardSuits.length; j++) {
            PlayingDeck.iniDeck.push(new CardObject(listCardNum[i], listCardSuits[j])); //generating 52 new card objects
        }
    }
    var len = PlayingDeck.iniDeck.length,
        randomNum, tempValue;
    while (len) { // Fischer-Yates shuffling Algorithm
        randomNum = Math.floor(Math.random() * len--);
        tempValue = PlayingDeck.iniDeck[len];
        PlayingDeck.iniDeck[len] = PlayingDeck.iniDeck[randomNum];
        PlayingDeck.iniDeck[randomNum] = tempValue;
    }
}());
// player and dealer function objects
var mainPlayer = new DeckObject();

function player() {
    mainPlayer.iniDeck.push(PlayingDeck.iniDeck.pop(), PlayingDeck.iniDeck.pop());
    mainPlayer.displayCards(mainPlayer.iniDeck);
    playerSum.value = mainPlayer.sumCards(mainPlayer.iniDeck);
}

function goToHitMethod() {
    mainPlayer.hitCard(mainPlayer.iniDeck);
}

var mainDealer = new DeckObject();

function dealer() {
    mainDealer.iniDeck.push(PlayingDeck.iniDeck.pop(), PlayingDeck.iniDeck.pop());
    mainDealer.displayCards(mainDealer.iniDeck);
    dealerSum.value = mainDealer.sumCards(mainDealer.iniDeck);
}

// main game function on 'deal' button click
function playGame() {
    player();
    dealer();
}

// function that compares scores everytime when 'hit' or 'stand' button is clicked
function showScore() {
    var playerScore = mainPlayer.sumCards(mainPlayer.iniDeck);
    var dealerScore = mainDealer.sumCards(mainDealer.iniDeck);
    if (playerScore > 21) {
        writeResult.value = "You went over 21. You lost!!";
    } else if (playerScore == 21) {
        writeResult.value = "Great. You got 21. You won!!";
    } else if (playerScore < 21) {
        while (dealerScore < 17) {
            mainDealer.hitCard(mainDealer.iniDeck);
        }
        if (dealerScore > playerScore && dealerScore < 21) {
            writeResult.value = "Dealer has " + dealerScore + " & you have " + playerScore + ". You lost.";
        } else {
            writeResult.value = "You have " + playerScore + " & Dealer has " + dealerScore + ". You won.";
        }
    } else if (playerScore == dealerScore) {
        writeResult.value = "Both tied with " + playerScore + " points.";
    }
}