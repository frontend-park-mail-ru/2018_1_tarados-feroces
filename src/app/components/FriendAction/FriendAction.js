import BaseComponent from '../BaseComponent/BaseComponent'


export default class FriendAction extends BaseComponent {

    render(context) {
        this.template = require('./FriendAction.handlebars');
        super.render(context);
    }
}

