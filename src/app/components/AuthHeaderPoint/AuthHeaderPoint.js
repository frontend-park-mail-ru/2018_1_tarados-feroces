import BaseComponent from '../BaseComponent/BaseComponent'


export default class AuthHeaderPoint extends BaseComponent {

    render(context) {
        this.template = `<div class="modal-header__point point-score {{class}}">
                            <p class="modal-header__point-value">{{text}}</p>
                        </div>`;
        super.render(context);
    }
}

