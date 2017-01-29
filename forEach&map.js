// FIVE ARRAY METHODS THAT MAKES LIFE EASY - START OF PURE FUNCTIONAL PROGRAMMING

// 1. forEach() and map() methods for array iteration - Bye-bye 'for-loop'

function() {
	var newReleases = [
			{
				"id": 70111470,
				"title": "Die Hard",
				"rating": [4.0],
				"bookmark": []
			},
			{
				"id": 654356453,
				"title": "Bad Boys",
				"rating": [5.0],
				"bookmark": [{ id: 432534, time: 65876586 }]
			},
			{
				"id": 65432445,
				"title": "The Chamber",
				"rating": [4.0],
				"bookmark": []
			},
			{
				"id": 675465,
				"title": "Fracture",
				"rating": [5.0],
				"bookmark": [{ id: 432534, time: 65876586 }]
			}
		],

// How can you get an array of objects containing {id, title} pairs from the newReleases Array using forEach & map?
// The resulting answer should be something like [{id:"abc", title:"xyz"}] without changing newReleases array.

//*************** Using forEach() ****************

	idTitlePair = [];
	newReleases.forEach(function(items) {
		idTitlePair.push({ id: items.id, title: items.title });
	});
	return idTitlePair;

//*************** Using map() ********************

	var idTitlePair = newReleases.map(function (items) {
		return {id: items.id, title: items.title};
	});
return idTitlePair;
}
//**************** See the similarities and differences between the two ?? **********

// === forEach() & map() both iterate over all items in the original array & apply some function over every single item.
// === forEach() & map() both NEED an array of items to apply the function. The original array is untouched in the process.

// $$$ forEach() ---> It just iterates over the array and applies the user defined function over the items.
// It returns nothing. User has to specify what to do with the iterated items (eg. user had to use the push() method here)

// $$$ map() --> It iterates over the array, pushes the items into a new array after applying the function on them.
// It always returns an array containing items worked upon by callback function (here the function just returns object)
