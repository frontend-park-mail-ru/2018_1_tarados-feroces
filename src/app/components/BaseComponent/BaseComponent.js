'use strict';

class BaseComponent {
    constructor(tagName, data) {
        this._component = document.createElement(tagName);


        this._component.innerHTML = data;
    }

    hide() {
        this._component.classList.add('hidden');
    }

    getClearHtml() {
        return this._component;
    }

    setTemplate(template) {
        this._component.innerHTML = template;
    }

    makeVisible() {
        this._component.classList.remove('hidden');
    }

    addChild(childNode) {
        this._component.lastChild.appendChild(childNode);
    }

    addClass(className) {
        this._component.lastChild.classList.add(className);
    }

    remove() {
        this._component.children.clear();
        document.removeChild(this._component);
    }

    setAttrs(attrs) {
        const block = this._component.lastChild;

        for (const key in attrs) {
            block[key] = attrs[key];
        }
    }

    setText(text) {
        this._component.value = text;
    }

    removeChild(childNode) {
        this._component.lastChild.removeChild(childNode);
    }
}
