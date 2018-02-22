class RegisterView extends BaseView {
    constructor() {
        super(registerTemplate);
    }
}

const registerTemplate = '<div class="page">' +
    '<Header>Sign Up!</Header>' +
    '<div class="registration-block">' +
    '<Form>' +
    '<Input label-text="Full name:" type="text" placeholder="Enter name"></Input>' +
    '<Input label-text="Login:" type="text" placeholder="Enter login"></Input>' +
    '<Input label-text="E-mail:" type="text" placeholder="Enter e-mail"></Input>' +
    '<Input label-text="Password:" type="password" placeholder="Enter password"></Input>' +
    '<Input label-text="Repeat Password:" type="password" placeholder="Repeat password"></Input>' +
    '<div class="button-container">' +
    '<Button class="button large" click="function(){ alert(2); }">Log In!</Button>' +
    '</div>' +
    '</Form>' +
    '</div>' +
    '</div>';
