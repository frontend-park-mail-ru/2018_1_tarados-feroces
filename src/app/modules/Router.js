class Router {
    constructor() {
        this.lastElement = 0;
        this.urls = {};
    }

    addUrl(url, element, insertionElement = document.body, context = {}) {
        element.classList.add('hidden');

        this.urls[url] = {
            insertionElement,
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
            this.urls[url].insertionElement.appendChild(this.urls[url].element);
        }
        
        this.showPage(url);
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
