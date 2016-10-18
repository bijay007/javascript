var person = {
	name : 'bijay',
  age : 23,
  married : false,
  salary : function hey() {
        this.oldSalary = 28000;
  		}
};
/* Properties and Method of the object person can be accessed diretly uding .(dot) notation. (object.property/method) */
console.dir(person.name);
console.dir(person.salary);

console.log(salary.oldSalary);
/* Now this gives you 'undefined' if you try access oldSalary. In order to access it, you've to create 
another object from the object salary */
var salary2016 = new oldSalary();
// Now I can access the property oldSalary from this new object
console.log (salary2016.oldSalary);
salary2016.oldSalary = 35000; //This only changes value of oldSalary of the newly created object salary2016

// Private variables and Public methods to extract them
var salary1992 = function name() {
    var netSalary = 2800;  // private variable
    this.extras = 200;    // public variable
    this.otherBonus = function() {  // public method
        return this.extras;
        this.getNetSalary = function() {
            return netSalary;   // here we define a method to extract the netSalary. We dont need to use this because the scope of private variable reaches here too (closure)
        }
    }
    };
 var ancient = new salary1992(); // new object ancient where the constructor is salary1992
 console.log(ancient.netSalary);  // it gives undefined cuz its PRIVATE VARIBALE to salary1992 only (as it's defined by using var)
 console.log(ancient.extras); // 200 shows up cuz its PUBLIC varibale to its child objects (defined by this.property)
 console.log(ancient.otherBonus()); // same as ancient.extras ?? ----whats the purpose of declaring this.otherBonus method when it does the same as ancient.salary??
 console.log(ancient.getNetSalary()); // finally we can reap the private variable(netSalary) from inside the object salary1992 by using public method this.getNetSalary. Don't forget () cuz they're functions xD
 
 // Private methods 
 
 var salary2020 = function() {
     var salaryFuture = '1 billion';  // private variable
     var getSalary = function () {
         return salaryFuture;
         };
     };
     
     var salaryUnknown = new Salary2020(); // new object from the salary2020
     console.log(salaryUnknown.getSalary()); // This doesn't work either like in line 33 because getSalary is PRIVATE METHOD
     // SO WHAT WE KNOW IS THAT OBJECTS CREATED FROM A PARENT METHOD CAN NOT ACCESS PRIVATE VARIBALES/METHODS (DEFINED BY var KEYWORD) BUT CAN ONLY ACESS PUBLIC VARIBALES/METHODS (DEFINED BY this KEYWORD)
      
      
     /* ********************** BIT ADVANCED STUFF BELOW ************************
      
     SO HOW IN HOLY HELL CAN WE ACCES THIS PRIVATE METHOD
     ITS BY ASSIGNING PRIVATE METHODS -> PROPERTY OF ANOTHER OBJECT. LETS CREATE AN OBJECT NAMED heyhey AND SUPPOSE ITS INSIDE salary2020 method*/
     var heyhey = {}  // empty object
     heyhey.getSalary = getSalary;  // adding a property to an object but luckily this property is infact a function(method). Lucky ehh??
     return heyhey;
     console.log(ancient.getSalary); // Now here ancient is just an object -> which also has another property called heyhey -> which has value called getSalary -> which is a method that returns getSalary -> which turns out to be 200
     //This what we saw above of retaining values from earlier methods/objects is called CLOSURE.     
