import './Post.scss';
import BaseComponent from '../BaseComponent/BaseComponent';

export default class Post extends BaseComponent {

    render(context) {
        this.template = require('./Post.handlebars');
        super.render(context);
    }
}
