'use strict';

class HttpModule {
    doGet({url = '/', callback = () => null} = {}) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4) {
                return;
            }

            if (xhr.status === 200) {
                const responseText = xhr.responseText;
                console.log(responseText);
                try {
                    const response = JSON.parse(responseText);
                    callback(null, response);
                } catch (err) {
                    console.log('doGet error: ', err);
                    callback(err);
                }
            } else {
                callback(xhr);
            }

        };

        xhr.withCredentials = true;

        xhr.send();
    }

    goPost({url = '/', callback = () => null, data = {}} = {}) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);

        xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4) {
                return;
            }

            if (xhr.status < 300) {
                const responseText = xhr.responseText;
                try {
                    const response = JSON.parse(responseText);
                    callback(null, response);
                } catch (err) {
                    console.log('doPost error: ', err);
                    callback(err);
                }
            } else {
                callback(xhr);
            }

        };

        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.withCredentials = true;

        xhr.send(JSON.stringify(data));
    }
}

const httpModule = new HttpModule();
