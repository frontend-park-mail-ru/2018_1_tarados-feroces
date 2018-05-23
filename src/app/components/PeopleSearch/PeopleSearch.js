import './PeopleSearch.scss';
import BaseComponent from '../BaseComponent/BaseComponent';

export default class PeopleSearch extends BaseComponent {

    render(context) {
        this.template = require('./PeopleSearch.handlebars');
        super.render(context);
    }
}
