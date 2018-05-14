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
    doGet(url, headers = [{name: HEADER_CONTENT_TYPE, value: JSON_CONTENT_TYPE}]) {
        return this.send(GET, url, headers);
    }

    /**
     * Делает POST-запрос
     * @param {string} url
     * @param {Object} data
     * @param {Object} headers
     * @return {Promise<any>}
     */
    doPost(url, data = null, headers = [{name: HEADER_CONTENT_TYPE, value: JSON_CONTENT_TYPE}]) {
        return this.send(POST, url, data, headers);
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
     send(method, url = '/', data = null, headers = []) {
        const options = {
            method: method,
            mode: 'cors',
            credentials: 'include'
        };

        if (method === POST) {
            options.body = JSON.stringify(data);
            options.headers = headers;
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

const httpModule = new HttpModule();
export default httpModule;
