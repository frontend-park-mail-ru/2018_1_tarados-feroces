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

    set changeTemplate(templateId) {
        const source = document.getElementById(templateId).innerHTML;
        this.template = Handlebars.compile(source);
    }
}
