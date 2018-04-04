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
        // this.loadingElement = new LoadingView().__render();
        // this.loadingElement.classList.add('hidden');
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
    viewUpdate(context) {
        this.lastView.update(context);
        const parent = this.deleteLast();
        this.lastView.__render();
        parent.appendChild(this.lastView.element);
        this.lastView.show();
    }

    /**
     * Переходит на новый url
     * @param {string} url
     * @param {Node} insertionElement
     * @return {boolean}
     */
    go(url) {
        if (!this.urls[url]) {
            return false;
        }

        url = this.checkAuth(url);
        const urlObject = this.urls[url];
        if (urlObject.insertElemId !== 'root' && !this.urls['/user/'].loaded) {
            this.route(this.urls['/user/']).then(
                (response) => {
                    this.route(urlObject);
                }
            );
        } else {
            this.route(urlObject);
        }
        window.history.pushState({path: url}, url, url);
    }

    /**
     * Отрисовывает привязанную к url вью
     * @param {string} url
     * @param {Node} insertionElement
     * @private
     */
    route(urlObject) {
        const insertionElement = document.getElementById(urlObject.insertElemId);

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
        if (router.urls[url].loaded) {
            router.urls[url].view.deleteElement();
            router.urls[url].loaded = false;
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
        this.hideLast(urlObject);
        // this.hideLoading();
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
        // this.loadingElement.classList.remove('hidden');
    }

    hideLoading() {
        // this.loadingElement.classList.add('hidden');
    }
}

const router = new Router();
export default router;
