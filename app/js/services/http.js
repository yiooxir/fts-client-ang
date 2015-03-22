/**
 * Created by sergey on 11.03.15.
 */


module.exports = function($resource) {
console.log('init resource');

    function ajax(url, type, data) {
        $.ajax({
            url: "http://127.0.0.1:3000/users/login",
            type:'POST',
            data: JSON.stringify({username: 'admin', password: '123'}),
            dataType: 'json',
            //crossDomain: true,
            contentType: 'application/json',
            headers: {
                Accept: "application/json, text/javascript, */*",
                "X-Requested-With": "XMLHttpRequest"
                // Set any custom headers here.
                // If you set any non-simple headers, your server must include these
                // headers in the 'Access-Control-Allow-Headers' response header.
            },
            xhrFields: {
                // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
                // This can be used to set the 'withCredentials' property.
                // Set the value to 'true' if you'd like to pass cookies to the server.
                // If this is enabled, your server must respond with the header
                // 'Access-Control-Allow-Credentials: true'.
                withCredentials: false
            },
            success: function(res) {
                console.log('success', res);
            },
            error: function(err) {
                console.log('error', err)

            }
        })
    }

    function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {

            // Check if the XMLHttpRequest object has a "withCredentials" property.
            // "withCredentials" only exists on XMLHTTPRequest2 objects.
            xhr.open(method, url, true);

        } else if (typeof XDomainRequest != "undefined") {

            // Otherwise, check if XDomainRequest.
            // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
            xhr = new XDomainRequest();
            xhr.open(method, url);

        } else {

            // Otherwise, CORS is not supported by the browser.
            xhr = null;

        }
        return xhr;
    }



    return {
        login: function() {
            ajax();
            return
            var xhr = createCORSRequest('POST', "http://127.0.0.1:3000/users/login/");
            if (!xhr) {
                throw new Error('CORS not supported');
            }
            function getTitle(text) {
                return text.match('<title>(.*)?</title>')[1];
            }

            xhr.onload = function() {
                var text = xhr.responseText;
                var title = getTitle(text);
                alert('Response from CORS request to ' + url + ': ' + title);
            };

            xhr.onerror = function() {
                alert('Woops, there was an error making the request.');
            };

            xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
            xhr.send({password: '123', 'username': 'admin'});
        }
    }
};