class MenuView extends BaseView {
    constructor() {
        super(menuTemplate);
    }
}

const menuTemplate = '<div class="menu">' +
    '<Header>Menu</Header>' +
    '<div class="points">' +
    '<ul>' +
    '<MenuPoint click="(event) {event.preventDefault(); goToSignUp();}">SignUp</MenuPoint>' +
    '<MenuPoint click="(event) {event.preventDefault(); goToLogin();}">SignIn</MenuPoint>' +
    '<MenuPoint>Scoreboard</MenuPoint>' +
    '</ul>' +
    '</div>' +
    '</div>';

const goToLogin = () => {
    router.go('/login/');
};

const goToSignUp = () => {
    router.go('/signup/');
};
