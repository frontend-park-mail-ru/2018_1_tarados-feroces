import BaseComponent from '../BaseComponent/BaseComponent'

export default class Header extends BaseComponent {

    render(context) {
        this.template = require('./Header.handlebars');
        super.render(context);
    }
}
