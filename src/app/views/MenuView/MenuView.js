class MenuView extends BaseView {
    constructor() {
        super(menuTemplate);
    }
}

const menuTemplate = '<div class="menu">' +
    '<Header>Menu</Header>' +
    '<div class="points">' +
    '<ul>' +
    '<MenuPoint click="function() {goToSignUp();}">SignUp</MenuPoint>' +
    '<MenuPoint click="function() {goToLogin();}">SignIn</MenuPoint>' +
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
