import BaseComponent from '../BaseComponent/BaseComponent'

export default class MenuPoint extends BaseComponent {

    render(context) {
        this.template = require('./MenuPoint.handlebars');
        super.render(context);
    }
}
