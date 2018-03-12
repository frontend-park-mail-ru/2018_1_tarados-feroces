(function() {
    'use strict';

    /**
     * Класс, отвечающий за отправку запросов на сервер
     * @module HttpModule
     */
    class HttpModule {

        /**
         * @constructor
         */
        constructor() {
            this.domen = httpDomen;
        }

        /**
         * Делает GET-запрос
         * @param {string} url
         * @param {Object} headers
         * @return {Promise<any>}
         */
        doGet(url, headers = [{name: HEADER_CONTENT_TYPE, value: JSON_CONTENT_TYPE}]) {
            return this.doRequest(GET, url, headers);
        }

        /**
         * Делает POST-запрос
         * @param {string} url
         * @param {Object} data
         * @param {Object} headers
         * @return {Promise<any>}
         */
        doPost(url, data = null, headers = [{name: HEADER_CONTENT_TYPE, value: JSON_CONTENT_TYPE}]) {
            return this.doRequest(POST, url, data, headers);
        }

        /**
         * Отправляет запрос указанного типа
         * @param {string} method
         * @param {string} url
         * @param {Object} data
         * @param {Object} headers
         * @return {Promise<any>}
         * @private
         */
        doRequest(method = GET, url = '/', data = null, headers = []) {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open(method, `${this.domen}${url}`, true);

                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText);

                    if (xhr.status < 300) {
                        resolve(response);
                    } else {
                        reject(response.message);
                    }
                });

                xhr.addEventListener('error', () => {
                    reject(new Error('Network error'));
                });

                headers.forEach((current) => xhr.setRequestHeader(current.name, current.value));

                xhr.withCredentials = true;

                data ? xhr.send(JSON.stringify(data)) : xhr.send();
            });
        }

    }

    window.httpModule = new HttpModule();
})();
