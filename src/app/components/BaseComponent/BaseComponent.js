'use strict';

class BaseComponent {

    constructor(template) {
        this.element = null;
        this.template = template;
    }

    render(context) {
        const div = document.createElement('div');
        div.innerHTML = templateManager.getHTML(context, this.template);
        this.element = div.lastChild;
        return this.element;
    }

    appendChild(component) {
        this.element.appendChild(component);
    }
}
