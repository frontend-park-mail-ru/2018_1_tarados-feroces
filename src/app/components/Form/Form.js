import './Form.scss';
import BaseComponent from '../BaseComponent/BaseComponent';

export default class Form extends BaseComponent {

    render(context) {
        this.template = require('./Form.handlebars');
        super.render(context);
    }
}

