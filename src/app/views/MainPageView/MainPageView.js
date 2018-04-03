import BaseView from '../BaseView/BaseView'
import router from '../../modules/Router/Router'

export default class MainPageView extends BaseView {

    render() {
        return `<div class="main-page">
                    <Header class="main-page__header">
                        <div class="header-logo">
                            <div class="header-logo-content"></div>
                        </div>
                    </Header>   
                    <div class="main-page__content">
                        <div class="main-page__content-row">
                            <Menu>
                                <MenuPoint>Play</MenuPoint>
                                <MenuPoint>Sign In</MenuPoint>
                                <MenuPoint>Sign Up</MenuPoint>
                            </Menu>
                            <div class="scroll">
                                <div class="scroll-icon"></div>
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
                       <div class="main-page__content-row"
                           <div class="main-page__content-trailer">
                                <Trailer src="https://www.youtube.com/embed/L3Mg6lk6yyA" frameborder="0" allow="autoplay; encrypted-media"></Trailer>
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
