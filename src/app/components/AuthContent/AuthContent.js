import BaseComponent from '../BaseComponent/BaseComponent'


export default class AuthContent extends BaseComponent {

    render(context) {
        this.template = `
 
                            <div class="auth-page__content-left-modal-data"></div>`;
        super.render(context);
    }
}

