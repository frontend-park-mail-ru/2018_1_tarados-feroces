class Router {
    constructor() {
        this.manager = new TemplateManager('');
        this.insertionBlock = document.body;
        this.lastElement = 0;
        this.urls = {};
    }

    addUrl(url, element, insertionElement = document.body, context = {}) {
        this.insertionBlock = insertionElement;

        element.classList.add('hidden');

        this.urls[url] = {
            element,
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
            this.insertionBlock.appendChild(this.urls[url].element);
            this.showPage(url);
        } else {
            this.showPage(url);
        }

        this.lastElement = this.urls[url].element;

        return true;
    }

    showPage(url) {
        this.urls[url].element.classList.remove('hidden');
    }

    hideLast() {
        this.lastElement && this.lastElement.classList.add('hidden');
    }
}
