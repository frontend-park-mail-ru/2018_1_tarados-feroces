import {HTTP_DOMEN, HEADER_CONTENT_TYPE, JSON_CONTENT_TYPE, POST, GET} from '../../constants/HttpConstants';

/**
 * Класс, отвечающий за отправку запросов на сервер
 * @module HttpModule
 */
class Transport {

    private domen: any = HTTP_DOMEN;

    /**
     * Делает GET-запрос
     * @param {string} url
     * @param {Object} headers
     * @return {Promise<any>}
     */
    public async doGet(url: string) {
        return this.send(GET, url);
    }

    /**
     * Делает POST-запрос
     * @param {string} url
     * @param {Object} data
     * @param {Object} headers
     * @return {Promise<any>}
     */
    public async doPost(url: string, data: any = {}) {
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
    private async send(method: string, url: string = '/', data: any = {}, headers: any = []) {
        const options: any = {
            method: method,
            mode: 'cors',
            credentials: 'include'
        };

        if (method === POST) {
            options.body = JSON.stringify(data);
            const headers = new Headers();
            headers.append(HEADER_CONTENT_TYPE, JSON_CONTENT_TYPE);

            options.headers = headers;
        }

        return fetch(`${this.domen}${url}`, options)
            .then((response) => {
                return response;
            });
    }
}

const transport: any = new Transport();
export default transport;
