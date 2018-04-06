import BaseComponent from '../BaseComponent/BaseComponent'


export default class SettingsButton extends BaseComponent {

    render(context) {
        this.template = require('./SignoutButton.handlebars');
        super.render(context);
    }
}

