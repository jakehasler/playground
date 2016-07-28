// //get cats
var axios = require('axios');

axios.get('http://catfacts-api.appspot.com/api/facts')
	.then(function(res) {
		console.log(res);
	})
