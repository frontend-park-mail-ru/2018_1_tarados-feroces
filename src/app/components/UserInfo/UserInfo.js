import BaseComponent from '../BaseComponent/BaseComponent'


export default class UserInfo extends BaseComponent {

    render(context) {
        this.template = `<div class="header__user-info">
                            <div class="header__user-info-avatar">
                                <img class="header__user-info-avatar" src="{{avatar}}">
                            </div>
                            <div class="header__user-info-data-block">
                                <div class="header__user-info-data-block-login">
                                    <p class="header__user-info-data-block-login-value">{{login}}</p>
                                </div>
                                <div class="header__user-info-data-block-score">
                                    <img class="header__user-info-data-block-score-image" src="../images/coins.png">
                                    <div class="header__user-info-data-block-score-number">
                                        <p class="header__user-info-data-block-score-number-value">{{coins}}$</p>
                                    </div>
                                </div>
                                <div class="header__user-info-data-block-score">
                                    <img class="header__user-info-data-block-score-image" src="../images/points.png">
                                    <div class="header__user-info-data-block-score-number">
                                        <p class="header__user-info-data-block-score-number-value">{{points}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>`;
        super.render(context);
    }
}

