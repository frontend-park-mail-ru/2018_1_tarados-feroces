class Router {
    constructor() {
        this.lastComponent = null;
        this.urls = {};
    }

    addUrl(url, component, insertionElement = document.body, context = {}) {
        component.hide();

        this.urls[url] = {
            insertionElement,
            component,
            loaded: false
        };
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
