'use strict';

(function() {

    class Router {

        constructor() {
            this.lastView = null;
            this.urls = {};
            this.insertionElement = document.querySelector('.root');
            this.start();
        }

        addUrl(url, view) {
            this.urls[url] = {
                view,
                loaded: false,
            };
            return this;
        }

        viewUpdate(context) {
            this.lastView.update(context);
            const parent = this.lastView.element.parentNode;
            parent.removeChild(this.lastView.element);
            this.lastView.__render();
            parent.appendChild(this.lastView.element);
            this.lastView.show();
        }

        pageUpdate(url) {
            this.hideLast();

            this.lastView = this.urls[url].view;

            this.showPage(url);
        }

        route(url, insertionElement = this.insertionElement) {
            if (!this.urls[url]) {
                return false;
            }

            if (!this.urls[url].loaded) {
                this.urls[url].loaded = true;
                this.urls[url].view.preRender().then(
                    (response) => {
                        this.urls[url].view.__render();
                        insertionElement.appendChild(this.urls[url].view.element);

                        this.pageUpdate(url);
                    }
                );
            }

            this.pageUpdate(url);

            return true;

        }

        go(url, insertionElement = this.insertionElement) {
            if (this.route(url, insertionElement)) {
                window.history.pushState({path: url}, url, url);
            }

            return true;
        }

        showPage(url) {
            this.urls[url].view.show();
        }

        hideLast() {
            this.lastView && this.lastView.hide();
        }

        start() {
            window.addEventListener('popstate', (event) => {
                this.route(window.location.pathname);
            });
        }
    }

    window.router = new Router();

})();
