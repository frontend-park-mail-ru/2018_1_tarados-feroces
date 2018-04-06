import BaseComponent from '../BaseComponent/BaseComponent';

export default class HideFriendsButton extends BaseComponent {

    render(context) {
        this.template = require('./HideFriendsButton.handlebars');
        super.render(context);
    }
}

