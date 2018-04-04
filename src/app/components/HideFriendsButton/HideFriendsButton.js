import BaseComponent from '../BaseComponent/BaseComponent'


export default class HideFriendsButton extends BaseComponent {

    render(context) {
        this.template = `<div class="auth-page__content-right-friends-icon">
                            <Image class="auth-page__content-right-friends-icon-value" src="../images/back.png"></Image>
                        </div>`;
        super.render(context);
    }
}

