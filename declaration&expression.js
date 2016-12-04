var x = function() { // function statement
	return 2016;
}
function y() {
	return 2016;  // function expression
}
console.log(x);  // 1. prints the function as a value of x variable (a string like how a coder writes)
console.log(x()); // 2. executes the function due to () and stores the value in x and prints it out
console.log(y);  // 3. same as 1 but just that the function has name y and is method of window(?) object
console.log(y()); // 4. same as 2 but stores doesn't store anywhere (is it y = 2016 ?? gotta test it)

console.log(x+z); // here js does implicit coercion -> concatenates x with z (whole function definition with z(value undefined here)
