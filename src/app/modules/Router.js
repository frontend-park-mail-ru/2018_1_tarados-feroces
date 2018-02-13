class Router {

    constructor() {
        this.manager = new TemplateManager('');
        this.insertionBlock = document.body;
        this.lastElement = 0;
        this.urls = {};
    }

    addUrl(url, templateId, context = {}) {
        this.manager.changeTemplate(templateId);
        const element = this.manager.getElement(context);

        element.classList.add('hidden');

        this.urls[url] = element;
        this.insertionBlock.appendChild(element);
    }

    changeInsertionBlock(element = document.body) {
        this.insertionBlock = element;
    }

    go(url) {
        if (!this.urls[url]) {
            return false;
        }

        history.pushState({}, '', url);
        this.hideLast();
        this.showPage(url);

        this.lastElement = this.urls[url];

        return true;
    }

    showPage(url) {
        this.urls[url].classList.remove('hidden');
    }

    hideLast() {
        this.lastElement && this.lastElement.classList.add('hidden');
    }
}
