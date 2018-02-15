class Router {
    constructor() {
        this.lastComponent = null;
        this.urls = {};
        this.insertionElement = document.querySelector('.root');

    }

    addUrl(url, component, insertionElement = this.insertionElement, context = {}) {
        component.hide();

        this.urls[url] = {
            insertionElement,
            component,
            loaded: false
        };

        return this;
    }

    go(url) {
        if (!this.urls[url]) {
            return false;
        }
        history.pushState({path: url}, '', url);

        this.hideLast();

        if (!this.urls[url].loaded) {
            this.urls[url].loaded = true;
            this.urls[url].insertionElement.appendChild(this.urls[url].component._component);
        }

        this.showPage(url);
        this.lastComponent = this.urls[url].component;

        return true;
    }

    showPage(url) {
        this.urls[url].component.makeVisible();
    }

    hideLast() {
        this.lastComponent && this.lastComponent.hide();
    }
}
