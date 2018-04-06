import BaseComponent from '../BaseComponent/BaseComponent'


export default class AuthContent extends BaseComponent {

    render(context) {
        this.template = require('./AuthContent.handlebars');
        super.render(context);
    }
}

