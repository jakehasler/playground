'use strict'
let fs = require('fs');

let accounts = JSON.parse(fs.readFileSync('./res/facebookAccountsRes.json'));
const active = fs.readFileSync('./res/activeAccts.txt').toString().split('\n');

function parseAccounts() {
	let accts = {};
	accts.authorized = [];
	accts.unauthorized = [];
	console.log(accounts.data.length);
	accounts.data.forEach(acct => {
		let status = false;
		let newObj = {
			name: acct.name,
			id: acct.id
		}
		active.forEach(act => {
			if(acct.id == 'act_' + act) {	
				status = true;
				accts.authorized.push(newObj);
			}
		})
		if(!status) accts.unauthorized.push(newObj);
	})
	console.log('Authorized Accts: ', accts.authorized.length);
	console.log('Unauthorized Accts: ', accts.unauthorized.length);
	var stringified = JSON.stringify(accts, null, '\t');
	fs.writeFile('./res/fbAccts.json', stringified);
}

parseAccounts();