'use strict';

class BaseComponent {

    constructor(template) {
        this._element = null;
        this.template = template;
        this.events = ['click', 'focus', 'blur'];
        this.functionExp = /\s*\(([\w, ]*)\)\n*\t*\s*{(.*)}/i;
    }

    render(context) {
        const div = document.createElement('div');
        div.innerHTML = templateManager.getHTML(context, this.template);
        this._element = div.lastChild;
        console.log('1', div.innerHTML);
        this.addListeners(context);
        return this._element;
    }

    appendChild(component) {
        this._element.appendChild(component);
    }

    element() {
        return this._element;
    }

    addListeners(context) {
        this.events.forEach((item) => {
            if (context[item]) {
                const func = context[item].match(this.functionExp);
                this._element.addEventListener(item, new Function(func[1], func[2]));
            }
        });
    }
}
