import BaseComponent from '../BaseComponent/BaseComponent'

export default class Label extends BaseComponent {

    render(context) {
        this.template = require('./Label.handlebars');
        super.render(context);
    }
}
