class MenuView extends BaseView {
    constructor() {
        super(menuTemplate);
    }
}

const menuTemplate = '<div class="menu">' +
    '<Header>Menu</Header>' +
    '<div class="points">' +
    '<ul>' +
    '<MenuPoint>SignUp</MenuPoint>' +
    '<MenuPoint>SignIn</MenuPoint>' +
    '<MenuPoint>Scoreboard</MenuPoint>' +
    '</ul>' +
    '</div>' +
    '</div>';
