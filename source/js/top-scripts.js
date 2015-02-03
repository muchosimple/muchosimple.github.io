function TiiAd_isSecure() {
    return (document.location.protocol == "https:");
}

/**
 * @description - A Function to turn on HAT for the sites
 * @function
 * @param {string} sitename
 */
function TimeHatConfig(sitename){
        var js = document.createElement('script');
        js.type = 'text/javascript';
        if (TiiAd_isSecure()) {
            js.src = 'https://a248.e.akamai.net/f/1016/606/2d/img5.timeinc.net/hat/js/time-hat.js';
        } else {
            js.src = 'http://img5.timeinc.net/hat/js/time-hat.js';
        }
        document.getElementsByTagName('head')[0].appendChild(js);
        var css = document.createElement("link");
        css.type = 'text/css';
        css.rel = 'stylesheet';
        if (TiiAd_isSecure()) {
            css.href = 'https://a248.e.akamai.net/f/1016/606/2d/img5.timeinc.net/hat/css/style.min.css';
        } else {
            css.href = 'http://img5.timeinc.net/hat/css/style.min.css';
        }
        document.getElementsByTagName("head")[0].appendChild(css);
        var hatId = document.getElementById('time_inc_hat');
        var hatUrl;
        if (TiiAd_isSecure()) {
            hatUrl = "https://a248.e.akamai.net/f/1016/606/2d/img5.timeinc.net/hat/" + sitename + ".html";
        } else {
            hatUrl = "http://img5.timeinc.net/hat/" + sitename + ".html";
        }
        if(hatId && sitename) {
            try {
                var request;
                request = new XMLHttpRequest();
                if ("withCredentials" in request) {
                    request.open('GET', hatUrl, true);
                }
                else if (typeof XDomainRequest !== "undefined") {
                    request.open('GET', hatUrl, true);
                }
                else {
                    request = null;
                }
                if(!request){
                    console.log("Error");
                    hatId.style.display = "none";
                    return;
                }
                request.onload = function() {
                    var response = request.responseText;
                    var responseBody = response.match('<body[^>]*>((?:.|\n)*)<\/body>')[0];
                    hatId.innerHTML = responseBody;
                };
                request.onerror = function() {
                    hatId.style.display = "none";
                    console.log("Error");
                };
                console.log('Sending the Request');
                request.send();
            }
            catch(e){
                console.log(e);
                hatId.style.display = "none";
            }
        }
}
