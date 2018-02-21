class LoginView extends BaseView {
    constructor() {
        super(loginTemplate);
    }
}

const loginTemplate = '<Input error-text="Login error" label-text="Login:" input-placeholder="Enter login"></Input>' +
    '<Input error-text="Password error" label-text="Password:" input-placeholder="Enter password"></Input>' +
    '<Button class="login-block__login-button">Go!</Button>';
