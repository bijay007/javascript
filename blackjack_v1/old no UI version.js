// jquery functions on hit,stand and play buttons
$(document).ready(function() {
  alert('Checking if this works');
  $('#hitbtn').click(function() {  // when hitbtn is clicked, executes hitMore function
    hitMore();
  });
  $('#standbtn').click(function() {  // when standbtn is clicked, executes declareWinner function and saves the user and dealer values in textbox
        declareWinner(userScore,dealerScore);
        var ubox = document.getElementById('userbox');
        var dbox = document.getElementById('dealerbox');
        ubox.value() = this.globalUser;
        dbox.value() = this.globalDealer;
		});
  $('#playbtn').clicK(function() {  // when playbtn is clicked, execute playGame function (starts new game)
    playGame();
  })
});

// Main card object with 3 public methods and takes two arguments
var Card = function(suit, num) {
    var suit = suit;
    var num = num;
    this.getNumber = function() {
        return num;
    };
    this.getSuit = function() {
        return suit;
    };
    this.getValue = function() {      // if condition for ace (we assign 11 for now) ,jack, queen and king (we assign value 10)
        if (num === 1) {
            return 11;
        } else if (num >= 10) {
            return 10;
        } else {
            return num;
        }
    };
};
// random card number and suit generator. Returns new object instance of card constructer
var deal = function() {
    var randSuit = (Math.floor(Math.random() * 3) + 1);
    var randNum = (Math.floor(Math.random() * 12) + 1);
    return new Card(randSuit, randNum);
};
// creating first 2 hands [cardPair] to be used by both user and dealer. Has 'score','hitMore' and 'printHand' public methods
var createHand = function() {
    var card1st = new deal();
    var card2nd = new deal();
    var cardPair = [card1st, card2nd];
    this.score = function() {      // adds the number value(getValue) of the 2 cards and returns total. if (ace), do extra steps for 1 and 11 value
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
    this.hitMore = function() {        // ask for new card and adds it to cardPair array -> uses 'deals' to create new card

        var hitCard = new deal();
        cardPair.push(hitCard);
    };
    this.printHand = function() {    // to print the 'facevalue' and 'suittype' of cardPair
        var string = "";
        for (var i = 0; i < cardPair.length; i++) {
            string = string + allCardValue[cardPair[i].getNumber()] + " of " + allSuits[cardPair[i].getSuit()] + ", ";
        }
        return string;
    };
};
// dealing for house -> using Createhand() to create first 2 cards and if sum is less than 17, automatically hits more
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
// dealing for user --> using hand() to create first 2 then if 'confirm' is true, hits more
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
// comparing user and dealer card sum values and returns result
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

// play a new games using abovementioned methods
    function playGame() {
        var newUser = playAsUser();
        var newDealer = playAsDealer();
        var newResults = declareWinner(newUser, newDealer);
        this.globalUser = newUser;
        this.globalDealer = newDealer;
    };
