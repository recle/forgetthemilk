/*
	Unit Test - common-test.js
	Test js/common.js functions
*/

module("Common utility test - js/common.js");

/*
	Test - fmt.getSigniture
*/
test("Test get API signiture - fmt.getSigniture", function() {

    equal(ftm.getSigniture(null), "3fb967f893daba495c27aa94bd47ce45", "Null parameters");
    equal(ftm.getSigniture({}), "3fb967f893daba495c27aa94bd47ce45", "Empty parameters");
    equal(ftm.getSigniture({api_key: "487xyz", method: "getToken"}), "aac40f6ba3f465d6dc2231cfebe01c88", "Normal parameters");
    equal(ftm.getSigniture({method: "getToken", api_key: "487xyz"}), "aac40f6ba3f465d6dc2231cfebe01c88", "Normal parameters no order");
    equal(ftm.getSigniture({c: "d", a: "b", j: "k"}), "28305a27585892f711c973dd37ff1b37", "Normal parameters no order 2");

});

/*
	Test - fmt.getUrl
*/
test("Test get URL - fmt.getUrl", function() {

	equal(ftm.getUrl("http://example.com/", {simple: "true", count: 1}, false, false), "http://example.com/?simple=true&count=1", "No API key, no signiture");
	equal(ftm.getUrl("http://example.com/", {}, false, false), "http://example.com/", "No params");
	equal(ftm.getUrl("http://example.com/", {}, true, false), "http://example.com/?api_key=12614411f8275adf7f290ed73088dfae", "No signiture");
	equal(ftm.getUrl("http://example.com/", {}, true, true), "http://example.com/?api_key=12614411f8275adf7f290ed73088dfae&api_sig=72d317a4ad47f685e84b3f2464206e09", "Simple signiture");
    equal(ftm.getUrl(ftm.authUrl, {perms: "delete"}, true, true), ftm.authUrl + "?perms=delete&api_key=12614411f8275adf7f290ed73088dfae&api_sig=ff34a67f4b60f43578717a70be0e910f", "Auth URL");
    equal(ftm.getUrl(ftm.apiUrl, {method: "rtm.auth.getToken", frob: "96286411c93e908eb75a35e75f8056fac19f2f7b"}, true, true), 
    	ftm.apiUrl + "?method=rtm.auth.getToken&frob=96286411c93e908eb75a35e75f8056fac19f2f7b&api_key=12614411f8275adf7f290ed73088dfae&api_sig=1272aabf3f126ac53219edbe6ed31fc1", "API URL");

});

/*

*/
test("Test login", function() {

	ftm.getToken();
	ok(true, "");

});