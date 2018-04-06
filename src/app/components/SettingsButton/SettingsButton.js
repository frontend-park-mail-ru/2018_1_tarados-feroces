import BaseComponent from '../BaseComponent/BaseComponent'


export default class SettingsButton extends BaseComponent {

    render(context) {
        this.template = require('./SettingsButton.handlebars');
        super.render(context);
    }
}

