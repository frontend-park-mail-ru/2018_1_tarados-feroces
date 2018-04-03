import BaseComponent from '../BaseComponent/BaseComponent'

export default class Header extends BaseComponent {

    render(context) {
        this.template = `<div class="header {{class}}">
                         </div>`;
        super.render(context);
    }
}
