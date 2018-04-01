import BaseComponent from '../BaseComponent/BaseComponent'

export default class Button extends BaseComponent {

    render(context) {
        this.template = `<div class="button {{class}}"><p>{{text}}</p></div>`;
        super.render(context);
    }
}

