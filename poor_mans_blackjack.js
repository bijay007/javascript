var Card = function(suit, number) {
        var Suit = suit;
        var Num = number;

        this.getNumber = function() {
            return Num;
        };
        this.getSuit = function() {
            return Suit;
        };
        // if condition for ace (we assign 11 for now) ,jack, queen and king (we assign value 10)
        this.getValue = function() {
            if (Num === 1) {
                return 11;
            } else if (Num >= 10) {
                return 10;
            } else {
                return Num;
            }
        };
    }

// random card number and suit generator. Returns new object instance of card constructer
var deal = function() {
    var randSuit = (Math.floor(Math.random() * 3) + 1);
    var randNum = (Math.floor(Math.random() * 12) + 1);
    return new Card(randSuit, randNum);
};

// creating first 2 hands to be used by both user and dealer
var createHand = function() {
    var card1st = new deal(); // ¿¿¿ card1st has 3 methods from Card when we only want 2 (getNumber,getSuit and getValue ??) Use prototype ???
    var card2nd = new deal();
    var cardPair = [card1st, card2nd];

    // adds the number value(getValue) of the 2 cards and returns total. if (ace), do extra steps for 1 and 11 value
    this.score = function() {
        var sum = 0;
        var aces = 0;
        for (i = 0; i < cardPair.length; i++) {
            sum += cardPair[i].getValue();
            if (cardPair[i].getValue() === 11) {
                aces += 1;
            }
        }
        while (aces > 0 && sum > 21) {
            sum -= 10;
            aces--;
        }
        return sum; // this.score returns sum of cards
    };

    // to print the 'facevalue' and 'suittype' of cardPair (how to do same for extra cards after hit)
    this.printHand = function() {
        var string = "";
        for (i = 0; i < cardPair.length; i++) {
            string = string + allCardValue[cardPair[i].getNumber()] + " of " + allSuits[cardPair[i].getSuit()] + ", ";
        }
        return string;
    };

    // ask for new card and adds it to cardPair array -> uses 'deals' to create new card
    this.hitMore = function() {
        var hitCard = deal();
        cardPair.push(hitCard);
    };
};

// dealing for house -> using hand() to create first 2 cards and if it's less than 17, hit 1 more
function playAsDealer() {
    var dealer = new createHand(); // ¿¿ how's 'new' used to create property and not the method??
    while (dealer.score() < 17) {
        dealer.hitMore();
        if (dealer.score() > 21) {
            alert('Dealer busted!');
            return dealer.score();
        }
    }
    return dealer.score(); //returns score 2 times??
};


// dealing for user --> using hand() to create first 2 then if 'confirm' is true, hits more
function playAsUser() {
    var user = new createHand();
    var hitConfirm = confirm("Your hand is " + user.printHand() + ":Press OK -> Hit or Cancel -> Stand");
    while (hitConfirm && user.score() < 21) {
        user.hitMore();
        hitConfirm = confirm("Your hand is " + user.score() + ": Hit again? :Press OK -> Hit or Cancel -> Stand ");  // how can i update user.score()
        if (user.score() > 21) {
            alert('You busted!');
            return user.score();
        }
    }
	    return user.score();
};


// comparing user and dealer total values and return result
function declareWinner(user, dealer) {
    if (user > 21) {
        if (dealer > 21) {
            return "You tied!";
        } else {
            return "You lose!";
        }
    } else if (dealer > 21) {
        return "You win!";
    } else if (user > dealer) {
        return "You win!";
    } else if (user == dealer) {
        return "You tied!";
    } else {
        return "You lose!";
    }
};


// play a new games using abovementioned methods
function playGame() {
    var newUser = playAsUser();
    var newDealer = playAsDealer();
    var newResults = declareWinner(newUser, newDealer);
	alert("You have " + newUser);
    alert("Dealer has " + newDealer);
    alert(newResults);
};
var allSuits = ["Spades", "Hearts", "Diamonds", "Spades"];
var allCardValue = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];
playGame();
