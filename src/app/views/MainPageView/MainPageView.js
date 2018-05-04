import './MainPage.scss';
import BaseView from '../BaseView/BaseView';
import router from '../../modules/Router/Router';
import Ws from '../../modules/WebSocket/WebSocket';

export default class MainPageView extends BaseView {

    render() {
        this.template = require('./MainPageView.handlebars');
    }

    needAuthorization() {
        return false;
    }
}

window.scrollToContent = () => {
    const icon = document.querySelector('.scroll');
    const iconValue = document.querySelector('.scroll-icon');
    const header = document.querySelector('.main-page__header');

    if (iconValue.classList.contains('rotate-scroll-close')) {
        window.scrollTo(0, icon.getBoundingClientRect().top + window.scrollY - header.getBoundingClientRect().height);
        iconValue.classList.add('rotate-scroll-open');
        iconValue.style.transform = 'rotate(90deg)';
        iconValue.classList.remove('rotate-scroll-close');
    } else {
        window.scrollTo(0, 0);
        iconValue.classList.add('rotate-scroll-close');
        iconValue.style.transform = 'rotate(270deg)';
        iconValue.classList.remove('rotate-scroll-open');
    }
};

window.goToLogin = () => {
    router.go('/login/');
};

window.send = () => {
    Ws1.sendMessage('hi fucking retard');
};

window.goToGame = () => {
    router.go('/game/');
};

window.goToSignUp = () => {
    router.go('/signup/');
};

window.goBack = () => {
    router.go('/');
};
