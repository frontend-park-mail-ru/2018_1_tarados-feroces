import BaseComponent from '../BaseComponent/BaseComponent';

export default class StandartComponent extends BaseComponent {

    render(context) {
        this.template = require('./StandartComponent.handlebars');
        super.render(context);
    }
}
