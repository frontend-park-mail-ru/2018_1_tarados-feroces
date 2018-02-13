class Router {

    constructor() {
        this.manager = new TemplateManager('');
        this.insertionBlock = document.body;
        this.lastElement = 0;
        this.urls = {};
    }

    addUrl(url, templateId, insertionElement = document.body, context = {}) {
        this.insertionBlock = insertionElement;

        this.manager.changeTemplate(templateId);
        const element = this.manager.getElement(context);

        element.classList.add('hidden');

        this.urls[url] = {'element': element, 'loaded': false};
    }

    go(url) {
        if (!this.urls[url]) {
            return false;
        }

        history.pushState({}, '', url);
        this.hideLast();

        if (this.urls[url].loaded) {
            this.insertionBlock.childList.add(this.urls[url].element);
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
