var page = require('webpage').create();
var loadInProgress = false;
var testindex = 0;

// Route "console.log()" calls from within the Page context to the main Phantom context (i.e. current "this")
page.onConsoleMessage = function(msg) {
    console.log(msg);
};

page.onAlert = function(msg) {
    console.log('alert!!> ' + msg);
};

page.onLoadStarted = function() {
    loadInProgress = true;
    console.log("load started");
};

page.onLoadFinished = function(status) {
    loadInProgress = false;
    if (status !== 'success') {
        console.log('Unable to access network');
        phantom.exit();
    } else {
        console.log("load finished");
    }
};

var steps = [
    function() {
        page.open('https://accounts.google.com/o/oauth2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fanalytics.readonly&response_type=code&client_id=376957746053-ugavtp8a0pmru0dabhn5vnrt1jovi2n1.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A5050');
    },

    function() {
        page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
            page.evaluate(function() {
                document.getElementById("Email").value = "analytics@foxtailmarketing.com";
                $('#next').click();
                console.log('JQ: ' + $().jquery);
                console.log('Clicked');
            });
        });
    },
    function() {
        console.log('password form')
        page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
            page.render('images/passwordPage.png');
            page.evaluate(function() {
                console.log(document.getElementById("Passwd"));
                document.getElementById("Passwd").value = "q1w3e5r7t9";
                $('#signIn').click();
            });
        });
    },
    function () {
        console.log('testing a delay here');
        page.render('images/testdelay.png');
    },
    function() {
        console.log('click allow:'); // This function is for navigating deeper than the first-level form submission
        page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
            page.render('images/clickallow.png');
            page.evaluate(function() {
                $('#submit_approve_access').click();
                console.log("allow clicked");
            });
        });
    },
    function() {
        page.render('images/complete3.png');
        console.log(page);
        console.log('Exiting');
    }
];

interval = setInterval(function() {
    if (!loadInProgress && typeof steps[testindex] == "function") {
        console.log("step " + (testindex + 1));
        steps[testindex]();
        testindex++;
    }
    if (typeof steps[testindex] != "function") {
        console.log("test complete!");
        phantom.exit();
    }
}, 4000);
