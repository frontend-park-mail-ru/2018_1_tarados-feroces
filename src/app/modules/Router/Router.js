(function() {
    'use strict';

    /**
     * Класс, отвечающий за переход по url
     * @module Router
     */
    class Router {

        /**
         * @constructor
         */
        constructor() {
            this.lastView = null;
            this.urls = {};
            this.insertionElement = document.querySelector('.root');
            this.loadingElement = new LoadingView().__render();
            this.loadingElement.classList.add('hidden');
            this.insertionElement.appendChild(this.loadingElement);
            this.start();
        }

        /**
         * Регистрирует url в роутере
         * @param {string} url
         * @param {BaseView} view
         * @return {Router}
         */
        addUrl(url, view) {
            this.urls[url] = {
                view,
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
        go(url, insertionElement = this.insertionElement) {
            if (!this.urls[url]) {
                return false;
            }

            this.showLoading();
            url = this.checkAuth(url);
            this.route(url, insertionElement);
            window.history.pushState({path: url}, url, url);
        }

        /**
         * Отрисовывает привязанную к url вью
         * @param {string} url
         * @param {Node} insertionElement
         * @private
         */
        route(url, insertionElement = this.insertionElement) {

            if (!this.urls[url].loaded) {
                this.urls[url].loaded = true;
                this.urls[url].view.preRender().then(
                    (response) => {
                        this.urls[url].view.__render();
                        insertionElement.appendChild(this.urls[url].view.element);

                        this.pageUpdate(url);
                    }
                );
            } else {
                this.pageUpdate(url);
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
         * Показывает текущую вью
         * @param {string} url
         * @private
         */
        showPage(url) {
            this.urls[url].view.show();
        }

        /**
         * Скрывает предыдущую вью
         * @private
         */
        hideLast() {
            this.lastView && this.lastView.hide();
        }

        /**
         * Удаляет последнюю вью из DOM
         * @return {Node}
         * @private
         */
        deleteLast() {
            if (this.lastView.element) {
                const parent = this.lastView.element.parentNode;
                parent.removeChild(this.lastView.element);
                return parent;
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
                return '/';
            } else if (!this.urls[url].view.needAuthorization() && userService.isAuthorized) {
                return '/user/';
            }

            return url;
        }

        /**
         * Скрывает последнюю вью и выводит текущую
         * @param {string} url
         * @private
         */
        pageUpdate(url) {
            // this.hideLast();
            this.hideLoading();
            this.lastView = this.urls[url].view;
            this.showPage(url);
        }

        /**
         * Отображает вью загрузки
         */
        showLoading() {
            this.hideLast();
            this.loadingElement.classList.remove('hidden');
        }

        hideLoading() {
            this.loadingElement.classList.add('hidden');
        }
    }

    window.router = new Router();
})();
