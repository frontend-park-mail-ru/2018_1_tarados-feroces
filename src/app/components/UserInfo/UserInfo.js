import BaseComponent from '../BaseComponent/BaseComponent';

export default class UserInfo extends BaseComponent {

    render(context) {
        this.template = require('./UserInfo.handlebars');
        super.render(context);
    }
}

