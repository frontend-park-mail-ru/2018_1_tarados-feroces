'use strict';

class BaseComponent {

    constructor(template) {
        this._element = null;
        this.template = template;
    }

    render(context) {
        const div = document.createElement('div');
        div.innerHTML = templateManager.getHTML(context, this.template);
        this._element = div.lastChild;
        return this._element;
    }

    appendChild(component) {
        this._element.appendChild(component);
    }

    get element() {
        return this._element;
    }
}
