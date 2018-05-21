import {httpDomen, HEADER_CONTENT_TYPE, JSON_CONTENT_TYPE, POST, GET} from './HttpConstants';

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
    doGet(url) {
        return this.send(GET, url);
    }

    /**
     * Делает POST-запрос
     * @param {string} url
     * @param {Object} data
     * @param {Object} headers
     * @return {Promise<any>}
     */
    doPost(url, data = {}) {
        return this.send(POST, url, data);
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
     send(method, url = '/', data = {}, headers = []) {
        const options = {
            method: method,
            mode: 'cors',
            credentials: 'include'
        };

        if (method === POST) {
            options.body = JSON.stringify(data);
            const _headers = new Headers();
            _headers.append(HEADER_CONTENT_TYPE, JSON_CONTENT_TYPE);

            options.headers = _headers;
        }

        return fetch(`${this.domen}${url}`, options)
            .then((response) => {
                if (response.status >= 400) {
                    throw response;
                }
                return response.json();
            });
    }
}

window.httpModule = new HttpModule();
export default httpModule;
