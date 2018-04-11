import BaseComponent from '../BaseComponent/BaseComponent';

export default class Friend extends BaseComponent {

    render(context) {
        this.template = require('./Friend.handlebars');
        super.render(context);
    }
}

