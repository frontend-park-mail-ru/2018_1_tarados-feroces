'use strict';

class BaseComponent {
    constructor(tagName, data) {
        this._component = document.createElement(tagName);
        this._component.innerHTML = data;
    }

    hide() {
        this._component.classList.add('hidden');
    }

    makeVisible() {
        this._component.classList.remove('hidden');
    }

    addChild(childNode) {
        this._component.appendChild(childNode);
    }

    addClass(className) {
        this._component.classList.add(className);
    }

    remove() {
        this._component.children.clear();
        document.removeChild(this._component);
    }

    removeChild(childNode) {
        this._component.removeChild(childNode);
    }
}