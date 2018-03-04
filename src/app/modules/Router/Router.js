'use strict';

class Router {

    constructor() {
        this.lastView = null;
        this.urls = {};
        this.insertionElement = document.querySelector('.root');

    }

    addUrl(url, view) {
        this.urls[url] = {
            view,
            loaded: false,
        };

        return this;
    }

    go(url, insertionElement = this.insertionElement) {
        if (!this.urls[url]) {
            return false;
        }

        history.pushState({path: url}, '', url);

        if (!this.urls[url].loaded) {
            this.urls[url].loaded = true;
            this.urls[url].view.preRender().then(
                (response) => {
                    this.urls[url].view.__render();
                    insertionElement.appendChild(this.urls[url].view.element);
                    this.hideLast();

                    this.lastView = this.urls[url].view;

                    console.log(this);

                    this.showPage(url);
                }
            );
        }

        this.hideLast();

        this.lastView = this.urls[url].view;

        // console.log(this);

        this.showPage(url);

        return true;
    }

    showPage(url) {
        this.urls[url].view.show();
    }

    hideLast() {
        this.lastView && this.lastView.hide();
    }
}
