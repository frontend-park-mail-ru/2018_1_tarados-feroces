'use strict';

class HttpModule {

    doRequest(method = 'GET', url = '/', data = null) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(method, url, true);

            xhr.onload = () => {

                const response = JSON.parse(xhr.responseText);
                console.log(response);

                if (xhr.status === 200) {
                    resolve(response);
                } else {
                    // const error = new Error(response.message);
                    // error.code = xhr.status;
                    reject(response['message']);
                }
            };

            xhr.onerror = () => {
                reject(new Error('Network error'));

            };

            xhr.withCredentials = true;

            if (method === 'POST') {
                xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                xhr.send(JSON.stringify(data));
            } else {
                xhr.send();
            }


        });
    }
}

const httpModule = new HttpModule();
