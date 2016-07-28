var text = require('textbelt');

function sendText(){	
	text.sendText('3853099172', 'A sample text message!', 'us', function(err) {
	  if (err) {
	    console.log(err);
	  }
	});
}


setInterval(function() {
	sendText();
}, 1000);