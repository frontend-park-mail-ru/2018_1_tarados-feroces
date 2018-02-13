class Router {

    constructor() {
        this.manager = new TemplateManager('');
        this.urls = {};
    }

    setUrlToTemplate(url, templateId, className = '', context = {}) {
        this.manager.changeTemplate(templateId);
        const element = this.manager.getElement(context, className);
        element.classList.add('hidden');
        this.urls[url] = element;
        document.body.appendChild(element);
    }

    go(url) {
        if (!(url in this.urls)) {
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
