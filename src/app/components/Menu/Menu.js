import './Menu.scss';
import BaseComponent from '../BaseComponent/BaseComponent';

export default class Menu extends BaseComponent {

    render(context) {
        this.template = require('./Menu.handlebars');
        super.render(context);
    }
}
