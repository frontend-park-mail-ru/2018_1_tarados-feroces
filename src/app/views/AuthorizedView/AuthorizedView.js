import './AuthorizedView.scss';
import BaseView from '../BaseView/BaseView';
import httpModule from '../../modules/HttpModule/HttpModule';
import userService from '../../modules/UserService/UserService';
import router from '../../modules/Router/Router';
import Ws from '../../modules/WebSocket/WebSocket';
import {WS_ADDRESS} from '../../modules/HttpModule/HttpConstants';

export default class AuthorizedView extends BaseView {

    //TODO : get friends or all users
    update(context = {}) {
        getPeople().then(
            (response) => {
                this.context.people = response.people
            }
        );
    }

    //TODO : WSs or HTTPs?
    search(name) {

    }

    preRender() {

        this.context = userService.data;
        if (!this.context.avatar.length) {
            this.context.avatar = '../images/user-logo.jpg';
        }
        httpModule.doPost('/user/friends', {login: this.context.login}).then(
            (response) => {
                this.context.friends = response.friends;
            }
        );
    }

    render() {
        this.template = require('./AuthorizedView.handlebars');
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

window.getPeople = () => {
    return httpModule.doPost('/people');
};

window.hideFriends = () => {
    const hideValue = document.querySelector('.auth-page__content-right-hide-icon-value');

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
    const x = icon.getBoundingClientRect().x;
    const y = icon.getBoundingClientRect().y;
    console.log(icon.left);
    modal.style.left = `${x}px`;
    modal.style.top = `${y + icon.getBoundingClientRect().height}px`;
    modal.classList.toggle('hidden');
};

window.goToScore = () => {
    const score = document.querySelector('.leaderboard');
    if (score.classList.contains('modal-header__point_active')) {
        return;
    }
    router.go('/leaderboard/');
};

window.goToNews = () => {
    const news = document.querySelector('.news-header');
    if (news.classList.contains('modal-header__point_active')) {
        return;
    }
    router.go('/news/');
};

window.play = () => {
    const Ws1 = new Ws(
        WS_ADDRESS,
        (message) => console.log(message),
        (message) => console.log(message)
    );
    // Ws1.sendMessage('Sanya hello!');
};

