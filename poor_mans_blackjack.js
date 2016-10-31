// Copy the whole code in jsfiddle.net -> open up console (google it if u dont know) -> check results -> ask me if any confusion arises
var Card = function(suit, num) {
    var suit = suit;
    var num = num;
    this.getNumber = function() {
        return num;
    };
    this.getSuit = function() {
        return suit;
    };
    this.getValue = function() {
        if (num === 1) {
            return 11;
        } else if (num >= 10) {
            return 10;
        } else {
            return num;
        }
    };
};

var deal = function() {
    var randSuit = (Math.floor(Math.random() * 3) + 1);
    var randNum = (Math.floor(Math.random() * 12) + 1);
    return new Card(randSuit, randNum);
};

var createHand = function() {
    var card1st = new deal();
    var card2nd = new deal();
    var cardPair = [card1st, card2nd];
    this.score = function() {
        var sum = 0;
        var aces = 0;
        for (var i = 0; i < cardPair.length; i++) {
            sum += cardPair[i].getValue();
            if (cardPair[i].getValue() === 11) {
                aces += 1;
            }
        }
        while (aces > 0 && sum > 21) {
            sum -= 10;
            aces--;
        }
        return sum;
    };
    this.hitMore = function() {
        var hitCard = new deal();
        cardPair.push(hitCard);
    };
    this.printHand = function() {
        var string = "";
        for (var i = 0; i < cardPair.length; i++) {
            string = string + allCardValue[cardPair[i].getNumber()] + " of " + allSuits[cardPair[i].getSuit()] + ", ";
        }
        return string;
    };
};

function playAsDealer() {
    var dealer = new createHand();
    while (dealer.score() < 17) {
        dealer.hitMore();
        if (dealer.score() > 21) {
            return dealer.score();
        }
    }
    return dealer.score();
};

function playAsUser() {
    var user = new createHand();
    var hitConfirm = confirm("Your hand is " + user.printHand() + ":Press OK -> Hit || Cancel -> Stand");
    while (hitConfirm && user.score() < 21) {
        user.hitMore();
        hitConfirm = confirm("Your hand is " + user.score() + ": Hit again? :Press OK -> Hit || Cancel -> Stand ");
        if (user.score() > 21) {
            break;
        }
    }
    return user.score();
};

function declareWinner(userScore, dealerScore) {
    if (userScore > 21) {
        if (dealerScore > 21) {
            return "You tied. Bet money returned";
        } else {
            return "You lose!";
        }
    } else if (dealerScore > 21) {
        return "You win!";
    } else if (userScore > dealerScore) {
        return "You win!";
    } else if (userScore == dealerScore) {
        return "You tied. Bet money returned!!";
    } else {
        return "You lose!";
    }
};

var allSuits = ["Spades", "Hearts", "Diamonds", "Spades"];
var allCardValue = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];

function playGame() {
    var newUser = playAsUser();
    var newDealer = playAsDealer();
    var newResults = declareWinner(newUser, newDealer);
};
playGame();
