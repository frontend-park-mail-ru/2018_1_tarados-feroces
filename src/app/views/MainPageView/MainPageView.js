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

window.goToLogin = () => {
    router.go('/login/');
};

window.goToSignUp = () => {
    router.go('/signup/');
};

window.goBack = () => {
    router.go('/');
};
