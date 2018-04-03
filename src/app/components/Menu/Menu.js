import BaseComponent from '../BaseComponent/BaseComponent'

export default class Menu extends BaseComponent {

    render(context) {
        this.template = `<div class="menu {{class}}></div>"`;
        super.render(context);
    }
}
