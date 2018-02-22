class MenuView extends BaseView {
    constructor() {
        super(menuTemplate);
    }
}

const menuTemplate = '<div class="{{menuClass}}">' +
    '<Header>Menu</Header>' +
    '<div class="{{pointsClass}}">' +
    '<ul>' +
    '<MenuPoint href="registration.html">SignUp</MenuPoint>' +
    '<MenuPoint href="login.html">SignIn</MenuPoint>' +
    '</ul>' +
    '</div>' +
    '</div>';
