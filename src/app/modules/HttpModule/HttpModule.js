'use strict';

class HttpModule {

    doGet({url = '/', callback = () => null} = {}) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onreadystatechange = this.requestDone(xhr, callback);

        xhr.withCredentials = true;

        xhr.send();
    }

    doPost({url = '/', callback = () => null, data = {}} = {}) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);

        xhr.onreadystatechange = this.requestDone(xhr, callback);

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.withCredentials = true;

        xhr.send(JSON.stringify(data));


    }

    requestDone(xhr, callback) {
        if (xhr.readyState !== 4) {
            return;
        }

        if (xhr.status < 300) {
            const responseText = xhr.responseText;
            try {
                const response = JSON.parse(responseText);
                callback(null, response);
            } catch (err) {
                console.log('request error: ', err);
                callback(err);
            }
        } else {
            callback(xhr);
        }
    }
}

const httpModule = new HttpModule();
