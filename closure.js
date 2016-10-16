var century = function(twothousand) {  // century function has another function inside //
  var currentYear = function (sixteen) {
    return twothousand + sixteen;  // here the inner function (currentYear) return a VALUE (twothousand + sixteen) //
  };
  return currentYear;  // Here, the main function (century) doesn't return a value BUT A FUNCTION (currentYear)!// //
};
century(2000); //!! the value returned back to main function (century) is 2000 + sixteen (no sense right). Now this 2000 value is a CLOSURE (look next lines for its implementation)//
var constructurFunction1 = new century(2000); // now we have created one of the unlimited instances of main function that can be created//
console.log(constructurFunction1(16));  // now we can pass arguments to the inner function which then returns a value (here 2016) which is again returned back by main function (not a function now unlike in line 5 //