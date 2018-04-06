import BaseComponent from '../BaseComponent/BaseComponent';

export default class AuthHeaderPoint extends BaseComponent {

    render(context) {
        this.template = require('./AuthHeaderPoint.handlebars');
        super.render(context);
    }
}

