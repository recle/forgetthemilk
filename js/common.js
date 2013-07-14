/*
    Common utilities
    Requires: underscore.js, md5.js
*/

/*
    Namespace
*/
var ftm = ftm || {};


/*
    Constants
*/

ftm.authUrl = "http://www.rememberthemilk.com/services/auth/";
ftm.apiUrl = "https://api.rememberthemilk.com/services/rest/";

ftm.apiKey = "12614411f8275adf7f290ed73088dfae";
ftm.secret = "65a231ec9c93e197";

/* 
    Gets the RTM API signiture
*/
ftm.getSigniture = function(params) {

    var allArgs = "";
    var args = _.keys(params || {}).sort();
    _.each(args, function(e, i) {
        allArgs += (e + params[e]);
    });

    return md5(ftm.secret.toString() + allArgs);
}

/*
    Builds request URL  
*/
ftm.getUrl = function (base, params, withApiKey, withApiSig) {

    if (!base)
        return "";

    params = params || {};
    if (withApiKey)
        params.api_key = ftm.apiKey;

    var url = base;
    var start = true;
    _.each(params, function(v, k) {
        url += start ? ("?" + k + "=" + v) : ("&" + k + "=" + v);
        start = start ? false : start;
    });

    if (withApiSig) {
        var sig = ftm.getSigniture(params);
        url += _.isEmpty(params) ? ("?api_sig=" + sig) : ("&api_sig=" + sig);
    }

    return url;
}

ftm.getToken = function (succeeded) {

    ftm.token = sessionStorage.getItem("ftm.token");
    if (ftm.token && ftm.token.length > 0)
        return true;

    var frob = sessionStorage.getItem("ftm.frob");
    // alert(frob);
    if (!frob || frob.length == 0) {

        var getFrobUrl = ftm.getUrl(ftm.apiUrl, {method: "rtm.auth.getFrob"}, true, true);
        console.log(getFrobUrl);

        $.get(getFrobUrl, function(data) {
            
            // Get frob
            if ($("rsp", data).attr("stat") == "ok") {
                frob = $("frob", data).text();
                console.log(frob);
                sessionStorage.setItem("ftm.frob", frob);

                // Authorize
                // alert("go: " + frob);
                window.location = ftm.getUrl(ftm.authUrl, {perms: "delete", "frob": frob}, true, true);
            }
        });


    }

    else {

        // alert("godeep: " + ftm.token);
        $.get(ftm.getUrl(ftm.apiUrl, {method: "rtm.auth.getToken", "frob": frob}, true, true), function(data) {

            if ($("rsp", data).attr("stat") == "ok") {
                ftm.token = $("token", data).text();
                sessionStorage.setItem("ftm.token", ftm.token);
                var $user = $("user", data);
                ftm.user = $user.attr("username");
                ftm.userName = $user.attr("fullname");
                ftm.userId = $user.attr("id");
                sessionStorage.setItem("ftm.user", ftm.user);
                sessionStorage.setItem("ftm.userName", ftm.userName);
                sessionStorage.setItem("ftm.userId", ftm.userId);
                console.log("token: " + ftm.token);
                // alert("token: "+ ftm.token);

                if (succeeded)
                    succeeded.apply(this);
            }

        });

    }

    return false;
}
