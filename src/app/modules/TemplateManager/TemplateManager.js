'use strict';

class TemplateManager {

    constructor(templateId) {
        if (!templateId) {
            return;
        }

        this.changeTemplate(templateId);
    }

    getElement(context, templateId) {
        if (templateId) {
            this.changeTemplate(templateId);
        }
        const html = this.template(context);
        const element = document.createElement('div');

        element.innerHTML = html;

        return element;
    };

    getHTML(context, templateId) {
        if (templateId) {
            this.changeTemplate(templateId);
        }
        return this.template(context);
    }

    changeTemplate(templateId) {
        this.template = Handlebars.compile(templateId);
    }
}

const templateManager = new TemplateManager();
