import './Party.scss';
import BaseComponent from '../BaseComponent/BaseComponent';

export default class Party extends BaseComponent {

    render(context) {
        this.template = require('./Party.handlebars');
        super.render(context);
    }
}
