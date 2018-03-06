'use strict';

(function() {

    class MenuView extends BaseView {

        render() {
            return `<div class="menu">
                        <Header>Menu</Header>
                        <div class="points">
                            <ul>
                                <MenuPoint click="(event) {event.preventDefault(); goToSignUp();}">SignUp</MenuPoint>
                                <MenuPoint click="(event) {event.preventDefault(); goToLogin();}">SignIn</MenuPoint>
                                <MenuPoint click="(event) {event.preventDefault(); goToScore();}">Scoreboard</MenuPoint>
                            </ul>
                        </div>
                    </div>`;
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

    window.MenuView = MenuView;
})();
