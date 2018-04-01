import BaseComponent from '../BaseComponent/BaseComponent'

export default class MenuPoint extends BaseComponent {

    render(context) {
        this.template = `<li><a href="{{href}}">{{text}}</a></li>`;
        super.render(context);
    }
}
