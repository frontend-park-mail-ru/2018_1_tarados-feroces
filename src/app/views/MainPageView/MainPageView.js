import BaseView from '../BaseView/BaseView'
import router from '../../modules/Router/Router'

export default class MainPageView extends BaseView {

    render() {
        return `<div class="menu">
                    <Header>Menu</Header>
                    <div class="points">
                        <ul>
                            <MenuPoint click="(event) {event.preventDefault(); goToSignUp();}">SignUp</MenuPoint>
                            <MenuPoint click="(event) {event.preventDefault(); goToLogin();}">SignIn</MenuPoint>
                        </ul>
                    </div>
                </div>`;
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

window.goToScore = () => {
    router.go('/leaderboard/');
};

window.goBack = () => {
    router.go('/');
};
