"use strict";

class TemplateManager {

    constructor(templateId) {
        const source = document.getElementById(templateId).innerHTML;
        this.template = Handlebars.compile(source);
    }

    getElement(context, className) {
        const html = this.template(context);

        let element = document.createElement("div");

        element.classList.add(className);
        element.innerHTML = html;

        return element;
    };

    getHTML(context) {
        return this.template(context);
    }

    set changeTemplate(templateId) {
        const source = document.getElementById(templateId).innerHTML;
        this.template = Handlebars.compile(source);
    }
}
