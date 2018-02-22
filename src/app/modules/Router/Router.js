class Router {
    constructor() {
        this.lastComponent = null;
        this.urls = {};
        this.insertionElement = document.querySelector('.root');

    }

    addUrl(url, component, context = {}) {
        this.urls[url] = {
            component,
            context,
            loaded: false,
        };

        return this;
    }

    go(url, insertionElement = this.insertionElement) {
        if (!this.urls[url]) {
            return false;
        }
        history.pushState({path: url}, '', url);

        this.hideLast();


        if (!this.urls[url].loaded) {
            this.urls[url].loaded = true;
            this.urls[url].component.render(this.urls[url].context);
            insertionElement.appendChild(this.urls[url].component.element);
        }

        this.showPage(url);
        this.lastComponent = this.urls[url].component;

        return true;
    }

    showPage(url) {
        this.urls[url].component.show();
    }

    hideLast() {
        this.lastComponent && this.lastComponent.hide();
    }
}
