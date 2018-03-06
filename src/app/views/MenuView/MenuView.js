'use strict';

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

// const menuTemplate = '<div class="menu">' +
//     '<Header>Menu</Header>' +
//     '<div class="points">' +
//     '<ul>' +
//     '<MenuPoint click="(event) {event.preventDefault(); goToSignUp();}">SignUp</MenuPoint>' +
//     '<MenuPoint click="(event) {event.preventDefault(); goToLogin();}">SignIn</MenuPoint>' +
//     '<MenuPoint click="(event) {event.preventDefault(); goToScore();}">Scoreboard</MenuPoint>' +
//     '</ul>' +
//     '</div>' +
//     '</div>';

const goToLogin = () => {
    router.go('/login/');
};

const goToSignUp = () => {
    router.go('/signup/');
};

const goToScore = () => {
    router.go('/leaderboard/');
};

const goBack = () => {
    router.go('/');
};
