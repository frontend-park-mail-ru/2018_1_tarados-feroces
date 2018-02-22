class LoginView extends BaseView {
    constructor() {
        super(loginTemplate);
    }
}

const loginTemplate = '<div class="page">' +
    '<Header>Login</Header>' +
    '<div class="registration-block">' +
    '<Form>' +
    '<Input label-text="Full name:" type="text" placeholder="Enter name"></Input>' +
    '<Input label-text="Password:" type="password" placeholder="Enter password"></Input>' +
    '<div class="button-container">' +
    '<Button class="button large" click="function() {alert(1);}">Log In!</Button>' +
    '<Button class="button large" click="(event){ event.preventDefault(); goBack();  }">Back</Button>' +
    '</div>' +
    '</Form>' +
    '</div>' +
    '</div>';
