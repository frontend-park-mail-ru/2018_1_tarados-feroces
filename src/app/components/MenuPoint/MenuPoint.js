import BaseComponent from '../BaseComponent/BaseComponent'

export default class MenuPoint extends BaseComponent {

    render(context) {
        this.template = `<div class="menu-point {{class}}">
                            <p class="menu-point-text">{{text}}</p>
                        </div>`;
        super.render(context);
    }
}
