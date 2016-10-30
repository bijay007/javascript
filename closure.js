var century = function(twothousand) {  // century function has another function inside //
  var currentYear = function (sixteen) {
    return twothousand + sixteen;  // here the inner function (currentYear) return a VALUE (twothousand + sixteen) //
  };
  return currentYear;  // Here, the main function (century) doesn't return a value BUT A FUNCTION (currentYear)!// //
};

var thisYear = new century(2000); // now we create and object instance of the function century//
console.log(thisYear(16));  // now we can pass arguments to the inner function which then returns a value (here 2016) which is again returned back by main function//

// The question of a MILLION : WHY IS 16 PASSED AS PARAMETER TO INNER FUNCTION BUT NOT OUTER function ??

// The function is evaluated as : century(2000)(16)
// Firstly, thisYear(2000) at line 8 returns the function currentYear(sixteen) (js runtime maintains a pointer to the variable stored in it as 2000+sixteen).
// Next at line 9, 16 is passed to function currentYear
// function thisYear(16) executes with value passed (ie value passed = 16 to pasee = 2000+sixteen
