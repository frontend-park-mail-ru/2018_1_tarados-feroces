import './ConfirmGame.scss';
import BaseComponent from '../BaseComponent/BaseComponent';

export default class ConfirmGame extends BaseComponent {

    render(context) {
        this.template = require('./ConfirmGame.handlebars');
        super.render(context);
    }
}
