import './MainPage.scss';
import BaseView from '../BaseView/BaseView';
import router from '../../modules/Router/Router';
import Ws from '../../modules/WebSocket/WebSocket';

export default class MainPageView extends BaseView {

    preRender() {
        this.context.goToLogin = () => {
            window.router.go('/login/');
        };

        this.context.goToGame = () => {
            window.router.go('/game/');
        };

        this.context.scrollToContent = () => {
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

        this.context.goToSignUp = () => {
            window.router.go('/signup/');
        };

        this.context.goBack = () => {
            window.router.go('/');
        };

        return super.preRender();
    };

    render() {
        this.template = require('./MainPageView.handlebars');
    }

    needAuthorization() {
        return false;
    }
}
