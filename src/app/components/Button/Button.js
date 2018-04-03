import BaseComponent from '../BaseComponent/BaseComponent'


export default class Button extends BaseComponent {

    render(context) {
        this.template = `<div class="button {{class}}"><p class="button__value">{{text}}</p></div>`;
        super.render(context);
    }
}

