'use strict';

class HttpModule {

    constructor() {
        this.domen = 'http://deadlinez.herokuapp.com/alexalone';
    }

    doGet(url) {
        return new Promise((resolve, reject) => {
            const xhr = this.doRequest('GET', url);

            xhr.onload = () => {
                const response = JSON.parse(xhr.responseText);
                console.log(response);

                if (xhr.status === 200) {
                    resolve(response);
                } else {
                    reject(response.message);
                }
            };

            xhr.onerror = () => {
                reject(new Error('Network error'));
            };

            xhr.send();
        });
    }

    doPost(url, data = {}) {
        return new Promise((resolve, reject) => {
            const xhr = this.doRequest('POST', url);

            xhr.onload = () => {
                const response = JSON.parse(xhr.responseText);
                console.log(response);

                if (xhr.status === 200) {
                    resolve(response);
                } else {
                    reject(response.message);
                }
            };

            xhr.onerror = () => {
                reject(new Error('Network error'));
            };

            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

            xhr.send(JSON.stringify(data));
        });
    }

    doRequest(method = 'GET', url = '/') {
        const xhr = new XMLHttpRequest();
        xhr.open(method, `${this.domen}${url}`, true);
        xhr.withCredentials = true;

        return xhr;
    }

}

const httpModule = new HttpModule();
