(function() {
    'use strict';

    class HttpModule {

        constructor() {
            this.domen = httpDomen;
        }

        doGet(url) {
            return this.doRequest(GET, url);
        }

        doPost(url, data = null) {
            return this.doRequest(POST, url, data);
        }

        doRequest(method = GET, url = '/', data = null) {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open(method, `${this.domen}${url}`, true);

                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText);
                    console.log(response);

                    if (xhr.status < 300) {
                        resolve(response);
                    } else {
                        reject(response.message);
                    }
                });

                xhr.addEventListener('error', () => {
                    reject(new Error('Network error'));
                });

                xhr.setRequestHeader(HEADER_CONTENT_TYPE, JSON_CONTENT_TYPE);
                xhr.withCredentials = true;

                data ? xhr.send(JSON.stringify(data)) : xhr.send();
            });
        }

    }

    window.httpModule = new HttpModule();
})();
