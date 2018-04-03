import BaseView from '../BaseView/BaseView'
import router from '../../modules/Router/Router'

export default class MainPageView extends BaseView {

    render() {
        return `<div class="main-page">
                    <Header class="main-page__header">
                        <div class="header-logo">
                            <img class="header-logo-content" src="../src/static/images/Deadlinez.png">
                        </div>
                    </Header>
                                    
                    <div class="main-page__content">
                        <div class="main-page__content-row">
                            <Menu>
                                <MenuPoint class="try">Play</MenuPoint>
                                <MenuPoint class="signin">Sign in</MenuPoint>
                                <MenuPoint class="signup">Sign up</MenuPoint>
                            </Menu>
                            <div class="scroll">
                                <img class="scroll-icon" src="../back.png">
                            </div>
                        </div>
            
                        <div class="main-page__content-row main-page__content-row_low-height">
                            <div class="main-page__content-description">
                                <div class="text">
                                    <p class="text__data">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                        </p>
                                </div>
            
                            </div>
                        </div>
            
                        <div class="main-page__content-row main-page__content-row_low-height">
                            <div class="main-page__content-trailer">
                                <iframe src="https://www.youtube.com/embed/L3Mg6lk6yyA" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                            </div>
                        </div>
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
