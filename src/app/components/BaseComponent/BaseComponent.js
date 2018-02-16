'use strict';

class BaseComponent {
    constructor(tagName, data) {
        this._component = document.createElement(tagName);
        // for (let key in data) {
        //     this._component.key = data[key];
        // }

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
        this._component.appendChild(childNode);
    }

    addClass(className) {
        this._component.classList.add(className);
    }

    remove() {
        this._component.children.clear();
        document.removeChild(this._component);
    }

    setAttrs(attrs) {

        let block = this._component.lastChild;
        console.log(block.innerHTML);

        for (let key in attrs) {

            console.log(block[key]);
            block[key] = attrs[key];
            console.log(block[key]);
        }
    }

    setText(text) {
        this._component.value = text;
    }

    removeChild(childNode) {
        this._component.removeChild(childNode);
    }
}
