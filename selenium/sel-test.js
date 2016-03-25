var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;
var fs = require('fs');
var driver = new webdriver.Builder()
	.forBrowser('chrome')
	.build();
var url = "https://accounts.google.com/o/oauth2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fanalytics.readonly&response_type=code&client_id=376957746053-ugavtp8a0pmru0dabhn5vnrt1jovi2n1.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A5000";

webdriver.WebDriver.prototype.saveScreenshot = function(filename) {
    return driver.takeScreenshot().then(function(data) {
        fs.writeFile(filename, data.replace(/^data:image\/png;base64,/,''), 'base64', function(err) {
            if(err) throw err;
        });
    })
};

driver.get(url);
driver.saveScreenshot('test.png');
var enterEmail = function() {
	driver.findElement(By.id('Email')).sendKeys('analytics@foxtailmarketing.com');
	driver.findElement(By.id('next')).click();	
}
var enterPass = function() {
	driver.findElement(By.id('Passwd')).sendKeys('q1w3e5r7t9');
	driver.findElement(By.id('signIn')).click();
}
var allowClick = function() {

}
var functions = [enterEmail, enterPass, allowClick], i = 0, timer = setInterval(callFuncs, 1000);

function callFuncs() {
    funcs[i++]();
    if (i === funcs.length) clearInterval(timer);
}

//driver.wait(until.titleIs('webdriver - Google Search'), 1000);
//driver.quit();