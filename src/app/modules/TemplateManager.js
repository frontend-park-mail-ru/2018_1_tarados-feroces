'use strict';

class TemplateManager {
    constructor(templateId) {
        if (!templateId.length) {
            return;
        }

        this.changeTemplate(templateId);
    }

    getElement(context) {
        const html = this.template(context);
        const element = document.createElement('div');

        element.innerHTML = html;

        return element;
    };

    getHTML(context) {
        return this.template(context);
    }

    changeTemplate(templateId) {
        const source = document.getElementById(templateId).innerHTML;
        this.template = Handlebars.compile(source);
    }
}
