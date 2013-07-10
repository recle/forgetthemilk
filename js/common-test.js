module("Common utility test - js/common.js");

test("Test get API signiture - fmt.getSigniture", function() {

	var secret = "65a231ec9c93e197";

	equal(ftm.getSigniture({name: "1"}, ""), "", "Empty secret");
	equal(ftm.getSigniture({name: "code"}, undefined), "", "Undefined secret");
	equal(ftm.getSigniture({name: "code"}, null), "", "Null secret");
	equal(ftm.getSigniture({name: "code"}, {}), "3f1618b22eb967eb3b2639c7bf6ee423", "Empty object secret");
	equal(ftm.getSigniture(null, secret), "3fb967f893daba495c27aa94bd47ce45", "Null parameters");
	equal(ftm.getSigniture({}, secret), "3fb967f893daba495c27aa94bd47ce45", "Empty parameters");
	equal(ftm.getSigniture({api_key: "487xyz", method: "getToken"}, secret), "aac40f6ba3f465d6dc2231cfebe01c88", "Normal parameters");
	equal(ftm.getSigniture({method: "getToken", api_key: "487xyz"}, secret), "aac40f6ba3f465d6dc2231cfebe01c88", "Normal parameters no order");
	equal(ftm.getSigniture({c: "d", a: "b", j: "k"}, secret), "28305a27585892f711c973dd37ff1b37", "Normal parameters no order 2");
})