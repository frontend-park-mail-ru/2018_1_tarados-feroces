import {httpDomen, HEADER_CONTENT_TYPE, JSON_CONTENT_TYPE, POST, GET} from '../../constants/HttpConstants';

/**
 * Класс, отвечающий за отправку запросов на сервер
 * @module HttpModule
 */
class Transport {

    private domen: any = httpDomen;

    /**
     * Делает GET-запрос
     * @param {string} url
     * @param {Object} headers
     * @return {Promise<any>}
     */
    public doGet(url: string) {
        return this.send(GET, url);
    }

    /**
     * Делает POST-запрос
     * @param {string} url
     * @param {Object} data
     * @param {Object} headers
     * @return {Promise<any>}
     */
    public doPost(url: string, data: any = {}) {
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
    private send(method: string, url: string = '/', data: any = {}, headers: any = []) {
        const options: any = {
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

const transport: any = new Transport();
export default transport;
