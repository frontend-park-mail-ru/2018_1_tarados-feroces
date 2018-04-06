import BaseView from '../BaseView/BaseView';
import router from '../../modules/Router/Router';

export default class MainPageView extends BaseView {

    render() {
        this.template = require('./MainPageView.handlebars');
    }

    needAuthorization() {
        return false;
    }
}

window.scrollToContent = () => {
    const a = document.querySelector('.scroll');
    window.scrollTo(0, a.getBoundingClientRect().top + window.scrollY - a.getBoundingClientRect().height);
};

window.goToLogin = () => {
    router.go('/login/');
};

window.goToSignUp = () => {
    router.go('/signup/');
};

window.goBack = () => {
    router.go('/');
};
