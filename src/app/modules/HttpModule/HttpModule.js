'use strict';

class HttpModule {

    doRequest(method = 'GET', url = '/', data = null) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.onload = () => {
                if (this.status === 200) {
                    resolve(this.responseText);
                } else {
                    const error = new Error(this.statusText);
                    error.code = this.status;
                    reject(error);
                }
            };

            xhr.onerror = () => {
                reject(new Error('Network error'));
            };

            xhr.open(method, url, true);
            xhr.withCredentials = true;

            data ? xhr.send(JSON.stringify(data)) : xhr.send();
        });

    }
}

const httpModule = new HttpModule();
