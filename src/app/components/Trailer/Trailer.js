import BaseComponent from '../BaseComponent/BaseComponent'

export default class Trailer extends BaseComponent {

    render(context) {
        this.template = require('./Trailer.handlebars');
        super.render(context);
    }
}
