import BaseComponent from '../BaseComponent/BaseComponent';

export default class Button extends BaseComponent {

    render(context) {
        this.template = require('./Button.handlebars');
        // super.render(context);
        const div = document.createElement('div');
        div.innerHTML = this.template(context);
        this._element = div.lastChild;
        this.addListeners(context);
    }
}

