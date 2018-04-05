import BaseView from '../BaseView/BaseView'
import httpModule from '../../modules/HttpModule/HttpModule'
import userService from '../../modules/UserService/UserService'
import router from '../../modules/Router/Router'

export default class AuthorizedView extends BaseView {

    preRender() {
        return httpModule.doGet('/user').then(
            (response) => {
                this.context = response;
                if (!this.context.avatar.length) {
                    this.context.avatar = '../images/user-logo.jpg'
                }
            }
        );
    }

    render() {
        this.template = require('./AuthorizedView.handlebars');
        super.render();
    }
}

window.goToSettings = () => {
    router.go('/settings/');
};

window.signOut = () => {
    httpModule.doPost('/signout').then(
        (response) => {
            userService.userLogout();
            router.go('/');
        }
    );
};


window.hideFriends = () => {
    const hideValue = document.querySelector('.auth-page__content-right-friends-icon-value');

    document.querySelector('.friends').classList.toggle('hidden');
    if (hideValue.classList.contains('rotate-close')) {
        hideValue.classList.add('rotate-open');
        hideValue.style.transform = 'rotate(180deg)';
        hideValue.classList.remove('rotate-close');
    } else {
        hideValue.classList.add('rotate-close');
        hideValue.style.transform = 'rotate(0deg)';
        hideValue.classList.remove('rotate-open');
    }
    document.querySelector('.content-right-party').classList.toggle('hidden');
};



window.showFriendActions = (event) => {
    const modal = document.querySelector('.friends-modal');
    const icon = event.currentTarget;
    console.log(modal);
    console.log(icon);
    const x = icon.x - 200;
    console.log(icon.left);
    modal.style.left = `${x}px`;
    modal.style.top = `${icon.y}px`;
    modal.classList.toggle('hidden');
};

window.goToScore = () => {
    const score = document.querySelector('.leaderboard');
    if (score.classList.contains('modal-header__point_active')) {
        return;
    }
    router.go('/leaderboard/');
};