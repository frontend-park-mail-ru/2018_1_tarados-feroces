import BaseComponent from '../BaseComponent/BaseComponent'


export default class SettingsButton extends BaseComponent {

    render(context) {
        this.template = `<div class="header__user-info-settings">
                            <div class="header__user-info-settings-value">
                                <img class="header__user-info-settings-value" src="../images/settings.svg">
                            </div>
                        </div>`;
        super.render(context);
    }
}

