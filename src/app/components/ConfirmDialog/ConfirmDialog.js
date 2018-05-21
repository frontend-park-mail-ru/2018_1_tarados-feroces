import './ConfirmDialog.scss';
import BaseComponent from '../BaseComponent/BaseComponent';

export default class ConfirmDialog extends BaseComponent {

    render(context) {
        this.template = require('./ConfirmDialog.handlebars');
        super.render(context);
    }
}
