'use strict';
// Twilio Credentials 
var accountSid = 'ACca4e1b27f6e4456ddf58c46e697584f8'; 
var authToken = 'f0e0e4dab36d8c46afbb3271c8c7996e';
var client = require('twilio')(accountSid, authToken); 
var fs = require('fs');
var ProgressBar = require('progress'); 

var cats = JSON.parse(fs.readFileSync('./cats.json'));
var catCounter = 0;
var totalMsg = 50;
var numberToSend = "3852252608"
var success = '';

var bar = new ProgressBar('  Processing [:bar] :percent :etas', {
		complete: '=',
		incomplete: ' ',
		width: 50,
		total: totalMsg
	});

console.log("Sending to: ", numberToSend);

function sendCat(fact) {	
	client.messages.create({ 
		to: numberToSend, 
		from: "+19892624099", 
		body: "RealCatFacts: " + fact,   
	}, function(err, message) {
		success += message + '\n';
		//console.log(message.sid); 
	});
}

var interval = setInterval(function() {
	if(catCounter < totalMsg) {	
		bar.tick();	
		sendCat(cats.facts[catCounter]);
		catCounter++;
	} else {
		fs.writeFile('success.txt', success);
		clearInterval(interval);
	} 
}, 500)
