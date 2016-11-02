// FACTORY PATTERN 

var letters = function (AtoZ,Num) {
    var info = {};   //empty object. You can also use : var info = new Object;
    info.alphabet = AtoZ;
    info.noOfLetters = Num;
    info.printAZ = function() {
        console.log('The alphabet extends from ' + this.alphabet + ' and has ' + this.noOfLetters + ' letters.');
    };
    return info;  // we return the (now filled) object 'info'
};
// Now to create object instances from this factory object :
var spanish = letters('A to Z', 28);
var german = letters('A to Z', 30);

spanish.printAZ(); // to print out the console.log() inside printAZ function
german.printAZ();


// CONSTRUCTER PATTERN

var letters = function (AtoZ,Num) {
    this.alphabet = AtoZ;
    this.noOfLetters = Num;
    this.printAZ = function() {
        console.log('The alphabet extends from ' + this.alphabet + ' and has ' + this.noOfLetters + ' letters.');        
    };
};      // here we return nothing to the function object

//Now to create object instances from the construter function 'letters', we use keyword 'new'
var spanish = new letters('A to Z', 28);
var german = new letters('A to Z', 30);

spanish.printAZ();
german.printAZ();
// Note than we don't have 'info' object like before as we use 'this' to refer the properties and methods to the main object 'letter'. Also we dont return anything back to printAZ method.


// PROTOTYPE PATTERN

var letters = function(){
    this.everyInstanceHasThisProperty = "this is recreated in every new objects while those below aren't"
    };

    letters.prototype.alphabet = 'heyhey'; // here we have properties with deafult set values
    letters.prototype.noOfLetters = 0;
    letters.prototype.printAZ = function(){
        console.log('The alphabet extends from ' + this.alphabet + ' and has ' + this.noOfLetters + ' letters.'); )
        };
        
var spanish = new letters(); // here we create prototype object and we can overwrite the default values with our values. 
    spanish.alphabet = 'A to Z';
    spanish.noOfLetters = 28;
        spanish.printAZ();
// the plus point of using prototype is to save cpu processing, as in every instances of main objects created all methods are re-written even tho we might not want them.
//Using prototype saves the methods and properties we don't need in every new object in __proto__ property (check in console).
    
