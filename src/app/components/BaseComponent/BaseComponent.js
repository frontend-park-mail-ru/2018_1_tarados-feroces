'use strict';

class BaseComponent {

    // hasn`t ever been tested
    constructor(context, template) {
        this.template = templateManager.getHTML(context, template);
    }

    // hide() {
    //     this._component.classList.add('hidden');
    // }
    //
    // getClearHtml() {
    //     return this._component;
    // }
    //
    // setTemplate(template) {
    //     this._component.innerHTML = template;
    // }
    //
    // makeVisible() {
    //     this._component.classList.remove('hidden');
    // }
    //
    // addChild(childNode) {
    //     this._component.lastChild.appendChild(childNode);
    // }
    //
    // addClass(className) {
    //     this._component.lastChild.classList.add(className);
    // }
    //
    // remove() {
    //     this._component.children.clear();
    //     document.removeChild(this._component);
    // }
    //
    // setAttrs(attrs) {
    //     let block = this._component.lastChild;
    //
    //     for (let key in attrs) {
    //         block[key] = attrs[key];
    //     }
    // }
    //
    // setText(text) {
    //     this._component.value = text;
    // }
    //
    // removeChild(childNode) {
    //     this._component.lastChild.removeChild(childNode);
    // }
}
