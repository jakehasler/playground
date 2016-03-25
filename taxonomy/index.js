"use strict"
let fs = require('fs');

let tax = fs.readFileSync('./taxonomy.en-US.txt', 'utf8');

function readTaxonomy() {
	let lines = tax.split('\n');
	let masterArray = [];

	// filling master array with each row of values
	lines.forEach(line => {
		let arr = line.split(" > ");
		masterArray.push(arr);
	});

	/**
	 * @return {Array} unique The initial list of array
	 */
	function getInitial() {	
		let unique = [];
		masterArray.forEach(arr => {
			let exists = true;
			unique.forEach(nik => {
				if(arr[0] == nik) exists = false;
			})
			if(exists) unique.push(arr[0]);
		});
		return unique;
	}

	/**
	 * @param  {String} selectedVal => 
	 * @param  {Integer} x => The level of hierarchy that you want to search
	 * @return {Array} unique => Returns an array of the unique values of that hierarchy level
	 */
	function getLevelX(selectedVal, x) {
		x = x-1;
		let unique = [];
		masterArray.forEach(arr => {
			if(arr[x-1] == selectedVal) {
				if(arr[x]) {
					let exists = true;
					unique.forEach(nik => {
						if(arr[x] == nik) exists = false;
					})
					if(exists) unique.push(arr[x]);
				}
			}
		});
		return unique;
	}

	let levelOne = getInitial();
	let levelTwo = getLevelX("Business & Industrial", 2);
	let levelThree = getLevelX("Medical", 3);
	let levelFour = getLevelX("Medical Equipment", 4);
	console.log(levelThree);
}

readTaxonomy();