// WITH THIS YOU WON'T HAVE TROUBLE WITH OBJECT AND ARRAY //
//Paste this on any debugger of your choice or pythontutor.com/visualize to see live how data is stored in array and objects. //

//Object is {key:value} pair/s in javascript. The key and value however can be of any variable type.//
var myInfo = {name: 'bijay', age:23, otherdata:['no_job','no_badHabits'], birth:{day:25,month:'Dec',year:1992}};
console.log(myInfo);
console.log(myInfo.name);
console.log(myInfo.other[0]);      //Here otherdata is an object containing array datatype//
console.log(myInfo.birth);        //You can't call myInfo.birth[1] and try to get month because birth is an object//

//This is an array however. Careful as Array only holds same datatypes (object datatype in this case)//
var myInfooo = [{name:'bijay',age:23},{job: false, badHabits:null},{day:25, month:'Dec',year:1992}];
console.log(myInfooo[1]);
console.log(myInfooo[0].name);
// You can't enter other datatypes in the array info. for eg. [{object1},('year',2016),{'hey',true}] will give error as the others are not objects.//
