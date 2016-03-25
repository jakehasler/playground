var https = require('https');
var machine = require('machine');
var FacebookAds = require('./custom_modules/machinepack-facebookads');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var ProgressBar = require('progress');
var clientModel = require('./models/clientModel.js');
var fs  = require('fs');

var APP_ID = '1640288612910911';
var APP_SECRET = '9a835641d4921bec52b9081468f75462';
var ACCOUNT_ID = '872959096096234';
var CURR_TOKEN = 'CAAXT1XQaBz8BAHNIebN0eSbLvsH6toHGJZApEgOe7IOp1RpADtHEla8lrCXMTjQ8H5ZCiDyNhhIftCIu3VnW9Ipc7UZAUHR15FQFjkBoH2r8JZCS2Vtzp5co6thoVI3SYRVtEH5DyaOKCkRrBvfRfnO1KnjmZBQsbvI62gGYru15wGeIri9qEwy99L427SvNlwgX1eojktgZDZD';
// expires 1459553791 (Fri Apr 01 2016 17:36:31 GMT-0600 (MDT)
var SIXTY_DAY_TOKEN = 'CAAXT1XQaBz8BAGFJ4Byo1fTR55ubZB8QbOGeeV4VrN7UE4V80XazKZAVikdBcw4Nbk105N2uTBCr88ZClZAmnMLPgVjVlljs4feCF5RufjFUhiBbtpG01sMacvxyS9K1AsTgOk7ZAT9FsC77o2eLF0eAgv9eZAZBhTm9vbkL7fmKx506cJVjIywHoTZBycZBclZBoZD';

var userIds = [10153028226269938, 23542000, 1483302155239055, 1715234668763409];
var counter = 0;
var totalCounter = 0;
var totalCalls = 500;
var bar = new ProgressBar('Processing [:bar] :percent :etas', {
	complete: '=',
	incomplete: ' ',
	width: 50,
	total: totalCalls
});

console.log('Making Calls on Ad Data');
var adsTest = function(userId) {
	// console.log("Getting ads for: ", userId);
	FacebookAds.getAds({
	adAccountId: 'act_' + userId,
	accessToken: SIXTY_DAY_TOKEN,
	}).exec({
	// An unexpected error occurred.
	error: function (err){
		console.log(err);
	},
	// OK.
	success: function (res){
	 	var fbObj = [];
		//fbObj = res.data;
		res.data.forEach(function(object) {
			if(object.configured_status === 'ACTIVE') {
				fbObj.push(object);
			}
		});
		var stringified = JSON.stringify(fbObj, null, '\t');
		fs.writeFile('./res/adsJson' + userIds[counter] + '.json', stringified);
		//console.log(fbObj);
	 	return fbObj;
	},
	});
	totalCounter++;
	bar.tick();
}

var timer = setInterval(function() {
	adsTest(userIds[counter]);
	if(counter < 3) counter++;
	else counter = 0;
	if(totalCounter == totalCalls) clearInterval(timer);
}, 2000);