import BaseComponent from '../BaseComponent/BaseComponent'


export default class SettingsButton extends BaseComponent {

    render(context) {
        this.template = `<div class="header__user-info-settings">
                            <div class="header__user-info-settings-value logout">
                                <img class="header__user-info-settings-value" src="../images/logout.png">
                            </div>
                        </div>`;
        super.render(context);
    }
}

