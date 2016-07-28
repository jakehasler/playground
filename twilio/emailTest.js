var nodemailer = require('nodemailer');
var fs = require('fs');
var async = require('async');

var ProgressBar = require('progress'); 

var cats = JSON.parse(fs.readFileSync('./cats.json'));
var catCounter = 0;
var totalMsg = 5;
var numberToSend = "4804663906"
var success = '';

var bar = new ProgressBar('  Processing [:bar] :percent :etas', {
		complete: '=',
		incomplete: ' ',
		width: 50,
		total: totalMsg
	});

var sender = {};

var toSend = "3853099172@txt.att.net"

sender.sendEmail = function(fact) {;

	var transporter = nodemailer.createTransport({
	    service: 'Gmail',
	    auth: {
	        user: 'analytics@foxtailmarketing.com',
	        pass: 'q1w3e5r7t9'
	    }
	});

	var mailOptions =  {
		from: "REAL CAT FACTS", 
		to: toSend, 
		subject: '', 
		text: fact,
		html: fact
	};

	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return error;
	    }
	    success += info.response + '\n';
	    return info;
	});
}

var interval = setInterval(function() {
	if(catCounter < totalMsg) {	
		bar.tick();	
		sender.sendEmail(cats.facts[catCounter]);
		catCounter++;
	} else {
		fs.writeFile('success.txt', success);
		clearInterval(interval);
	} 
}, 500)