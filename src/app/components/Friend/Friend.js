import BaseComponent from '../BaseComponent/BaseComponent'


export default class Friend extends BaseComponent {

    render(context) {
        this.template = `<div class="friends-item">
                            <img class="friends-item-avatar" src="{{avatar}}">
                            <div class="friends-item-login">
                                <p class="friends-item-login-value">{{login}}</p>
                            </div>
                            <img class="friends-item-image" src="../images/menu.png">
                        </div>`;
        super.render(context);
    }
}

