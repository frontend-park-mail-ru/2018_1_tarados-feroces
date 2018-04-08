import './Button.scss';
import BaseComponent from '../BaseComponent/BaseComponent';

export default class Button extends BaseComponent {

    render(context) {
        this.template = require('./Button.handlebars');
        super.render(context);
    }
}

