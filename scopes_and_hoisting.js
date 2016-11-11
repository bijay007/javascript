
// ***************************************** SCOPING *****************************************************//

/* Note you can't access to local variable outside its local scope(eg.function is a local scope). for eg. even if you
have variable named global inside the function (see below); if you do console.log(global) outside the function, it shows value of the global varibale (ie 'this is global variable')*/

var global = " this is a global variable";
function wxyz (local3) {
	var local1 = "this is a local variable";
	local2 = "what is this" // this tries to update value of local2. as local 2 doesn't exists, it creates global varibale on window object but it's not defined. This creates confusion so always evade this kind of practice.
	window.local3 = "is this global now??" // YESS. now this local3 is assigned to window object so its clear now that its part of global window scope.
}
wxyz();
console.log(global); // This is defined as its global.
console.log(local); // This is undefined as its local to the function object
wxyz("heyyyy") // creates another local variable by passing it as argument to the function


// ***************************************** HOISTING ****************************************************//

/* How javascript reads var a = 'hey';
Step 1 DECLARATION: Oh someone declared a var called a (doesn't read "= 'hey'")
Step 2 ASSIGNMENT: Ok now this var a is assigned some value.

for eg. if you add the snippet below inside the above fuction: */
    console.log(local1);
    var local1 = 'bla bla bla';
/*THIS GIVES UNDEFINED WHY??
BECAUSE JS READS THE FOLLOWING LINES AS :*/
var local1;   //Declaration is hoisted at topmost level of the function before console.log
console.log(local1); // Nothing to log. I haven't been passed anything.
local1 = 'bla bla bla' // Now it it assigned some value.
/* Similar to if you use console.log(window.global)[this is incase you have another var with same name 'global' inside a function but you just need the outer variable]*/

// Example 2 (Function declaration vs function assignment to a variable
function testing() {
	badguy();   // --> Typeerror badguy() is not a function. --> Why does it happen?? (see below)
	goodguy();  // --> "I try to help people" --> How did this get executed tho??
	var badguy = function() {
	alert "I won't be seen cuz i'm bad"
	}
	function goodguy(){
	alert "I try to help people"
	}
}
// Function declaration is always hoisted at the top of the execution scope, even before variable declaration.
// The above code is read by js as:
function testing() {
	function goodguy(){.....} // --> Function declaration hoisted at top of execution scope
	badguy();   // --> hmm I don't see any function called badguy() declared above me. Guess the user made an error
	goodguy();  // --> Oh I have function declared above me. It aske me to alert(""..."");. Good job function.
	var badguy; // Damn, I am just now declared.Sucks!!
	badguy = function(){}  // --> Why did I assign myself to a variable. Goodguy got all the credit. Next time I'll declare solo.
}
	

// *************************************** CLOSURES (as nested functions) *****************************************//

function wxyz(){
  function wxy(){
    function wx(){

/*For more look up this ytube vid, good example on closure and all above mentioned.
MUST WATCH : https://www.youtube.com/watch?v=iSlSxDNarDY */

	   
	    
// REFERENCE ERROR AND TYPE ERROR //
	    
	    foo();
	    var foo = function bar() {
	    	console.log('error');
	    };
	    
// This has both TypeError and Reference Error. The way JS engine hoists the variables is as follows:
	    var foo;
	    foo();  // TYPE ERROR (WHY? Because the type of foo is undefined at this certain point and we are trying to execute it as a function)
	    bar(); // REFERENCE ERROR (WHY? Because bar is not referenced in the global scope but later on inside the function)
	    
	    foo = function() {
	    	bar = _self_;
		    console.log('error');
	    };
// Extracted from the book - You don't know Javascript: Scopes and Closures -
	    
