import BaseComponent from '../BaseComponent/BaseComponent'

export default class Label extends BaseComponent {

    render(context) {
        this.template = `<div class="label {{class}}">
                            <p class="label-text">{{text}}</p>
                        </div>`;
        super.render(context);
    }
}
