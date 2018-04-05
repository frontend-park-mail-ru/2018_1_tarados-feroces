import BaseComponent from '../BaseComponent/BaseComponent'


export default class Image extends BaseComponent {

    render(context) {
        this.template = require('./Image.handlebars');
        super.render(context);
    }
}
