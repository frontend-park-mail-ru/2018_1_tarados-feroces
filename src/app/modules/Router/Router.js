import userService from '../UserService/UserService';
import LoadingView from '../../views/LoadingView/LoadingView';

/**
 * Класс, отвечающий за переход по url
 * @module Router
 */
class Router {

    /**
     * @constructor
     */
    constructor() {
        this.lastView = {};
        this.urls = {};
        this.loadingElement = new LoadingView().__render();
        this.loadingElement.classList.add('hidden');
        const body = document.getElementsByTagName('body')[0];
        body.appendChild(this.loadingElement);
        this.start();
    }

    /**
     * Регистрирует url в роутере
     * @param {string} url
     * @param {BaseView} view
     * @return {Router}
     */
    addUrl(url, view, id = 'root') {
        this.urls[url] = {
            view,
            insertElemId: id,
            loaded: false,
        };
        return this;
    }

    /**
     * Обновляет и перерисовывает вью в DOM
     * @param {Object} context
     */
    //TODO
    viewUpdate(url, context) {
        this.urls[url].view.update(context);
        const parent = this.deleteLast(this.urls[url]);
        this.urls[url].view.__render();
        parent.appendChild(this.urls[url].view.element);
        this.urls[url].view.show();
    }

    /**
     * Переходит на новый url
     * @param {string} url
     * @return {boolean}
     */
    go(url) {
        if (!this.urls[url]) {
            return false;
        }
        this.showLoading();
        url = this.checkAuth(url);
        if (this.urls[url].insertElemId !== 'root' && !this.urls['/user/'].loaded) {
            this.route('/user/').then(
                (response) => {
                    this.route(url);
                }
            );
        } else {
            this.route(url);
        }
        window.history.pushState({path: url}, url, url);
    }

    /**
     * Отрисовывает привязанную к url вью
     * @param {string} url
     * @private
     */
    route(url) {
        const urlObject = this.urls[url];
        const insertionElement = document.getElementById(urlObject.insertElemId);

        if (urlObject.view.needUpdate()) {
            this.clearUrlElement(url);
        }

        if (!urlObject.loaded) {
            urlObject.loaded = true;
            return urlObject.view.preRender().then(
                (response) => {
                    urlObject.view.__render();
                    insertionElement.appendChild(urlObject.view.element);
                    this.pageUpdate(urlObject);
                }
            );
        } else {
            this.pageUpdate(urlObject);
        }
    }

    /**
     * Навешивает обработчик на popstate
     * @private
     */
    start() {
        window.addEventListener('popstate', (event) => {
            this.route(window.location.pathname);
        });
    }

    /**
     * Удаляет последнюю вью из DOM
     * @return {Node}
     * @private
     */
    deleteLast(urlObject) {
        if (this.lastView[urlObject.insertElemId].element) {
            const parent = this.lastView[urlObject.insertElemId].element.parentNode;
            parent.removeChild(this.lastView[urlObject.insertElemId].element);
            return parent;
        }
    }

    clearUrlElement(url) {
        if (this.urls[url].loaded) {
            this.urls[url].view.deleteElement();
            this.urls[url].loaded = false;
        }
    }

    /**
     * Преобразует url к нужному, согласно текущей сессии
     * @param {string} url
     * @return {string}
     * @private
     */
    checkAuth(url) {
        if (this.urls[url].view.needAuthorization() && !userService.isAuthorized) {
            this.lastView = {};
            return '/';
        } else if (!this.urls[url].view.needAuthorization() && userService.isAuthorized) {
            this.lastView = {};
            return '/user/';
        }

        return url;
    }

    /**
     * Скрывает последнюю вью и выводит текущую
     * @param {string} url
     * @private
     */
    pageUpdate(urlObject) {
        this.hideLoading();
        this.hideLast(urlObject);
        this.lastView[urlObject.insertElemId] = urlObject.view;
        this.showPage(urlObject);
    }

    /**
     * Показывает текущую вью
     * @param {string} url
     * @private
     */
    showPage(urlObject) {
        urlObject.view.show();
    }

    /**
     * Скрывает предыдущую вью
     * @private
     */
    hideLast(urlObject) {
        this.lastView[urlObject.insertElemId] && this.lastView[urlObject.insertElemId].hide();
    }

    /**
     * Отображает вью загрузки
     */
    showLoading() {
        // this.hideLast();
        this.loadingElement.classList.remove('hidden');
    }

    hideLoading() {
        this.loadingElement.classList.add('hidden');
    }
}

const router = new Router();
export default router;
