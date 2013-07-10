/*
	requires - underscore.js
	         - md5.js
*/


var ftm = ftm || {};

ftm.getSigniture = function(params, secret) {

	if (!secret)
		return "";

	var allArgs = "";
	var args = _.keys(params || {}).sort();
	_.each(args, function(e, i, arr) {
		allArgs += (e + params[e]);
	})

	return md5(secret.toString() + allArgs);
}