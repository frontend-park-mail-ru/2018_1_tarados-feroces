class Router {

    constructor() {
        this.manager = new TemplateManager('');
        this.urls = {};
    }

    addUrl(url, templateId, context = {}) {
        this.manager.changeTemplate(templateId);
        const element = this.manager.getElement(context);
        element.classList.add('hidden');
        this.urls[url] = element;
        document.body.appendChild(element);
    }

    go(url) {
        if (!this.urls[url]) {
            return false;
        }

        history.pushState({}, '', url);
        this.hideAll();
        this.showPage(url);

        return true;
    }

    showPage(url) {
        this.urls[url].classList.remove('hidden');
    }

    hideAll() {
        for (let url in this.urls) {
            this.urls[url].classList.add('hidden');
        }
    }
}
