var wkhtmltopdf = require('wkhtmltopdf');
var fs = require('fs');
var request = require('request');
 

// URL 
// wkhtmltopdf('http://espn.go.com', { pageSize: 'letter' })
//   .pipe(fs.createWriteStream('out.pdf'));
  
// // HTML 
wkhtmltopdf('<h1>Test</h1><p>Hello world</p>')
  .pipe(fs.createWriteStream('zzz.pdf'));
  
// // output to a file directly 
//wkhtmltopdf('http://wearetopsecret.com', { output: 'zzz.pdf'});
 
// // Optional callback 
// wkhtmltopdf('http://google.com/', { pageSize: 'letter' }, function (code, signal) {
// });
// wkhtmltopdf('http://google.com/', function (code, signal) {
// });