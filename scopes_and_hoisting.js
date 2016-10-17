// ************ Scopes ****************//

/* Note you can't access to local variable outside the its local scope(eg.function is a local scope). for rg. even if you
have variable named global inside the function (see below); if you do console.log(global) outside the function, it shows value of the global varibale (ie 'this is global variable')*/

var global = " this is a global variable";
function wxyz (local3) {
	var local1 = "this is a local variable";
	local2 = "what is this" // this tries to update value of local2. as local 2 doesn't exits it creates global varibale 2 but it's not defined and creates confusion.
	window.local3 = "is this global now??" // YESS. now this local3 is assigned to window object so its clear now that its part of global scope.
}
wxyz();
console.log(global); // This is defined as its global.
console.log(local); // This is undefined as its local to the function object
wxyz("heyyyy") // creates another local variable by passing it as argument to the function

// ********************* Hoisting ********************//

/* How javascript reads var a = 'hey';
Step 1 DECLARATION: Oh someone declared a var called a (doesn't read "= 'hey'")
Step 2 ASSIGNMENT: Ok now this var a is assigned some value.

for eg. if you add the snippet below inside the above fuction: */
    console.log(local1);
    var local1 = 'bla bla bla';
/*THIS GIVES UNDEFINED WHY??
BECAUSE JS READS THE FOLLOWING LINES AS :*/
var local1;   //Declaration is hoisted at topmost level of the function before console.log
      console.log(local1); // Nothing to log. I havent been passed anything.
      local1 = 'bla bla bla' // Now it it assigned some value although we see it in same line.
/*But if we use console.log(global), it works correct because global varible are hoisted at higher level than functions.
Similar to if you use console.log(window.global)[this is incase you have another var with same name global inside function but you just need the outer variable]*/


// **** Closures (as nested functions) ****//

function wxyz(){
  function wxy(){
    function wx(){

/*For more look up this ybue vid, real life example on closure and all above mentioned.
MUST WATCH : https://www.youtube.com/watch?v=iSlSxDNarDY */
