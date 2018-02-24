class LoginView extends BaseView {
    constructor() {
        super(loginTemplate);
    }
}

const loginTemplate = '<div class="page">' +
    '<Header>Login</Header>' +
    '<div class="registration-block">' +
    '<Form>' +
    '<Input label-text="Full name:" type="text" placeholder="Enter name" blur="() {console.log(1000)};"></Input>' +
    '<Input label-text="Password:" type="password" placeholder="Enter password" blur="() {console.log(1000)};"></Input>' +
    '<div class="button-container">' +
    '<Button class="button large" click="() {alert(1);}">Log In!</Button>' +
    '<Button class="button large" click="(event){ event.preventDefault(); goBack();  }">Back</Button>' +
    '</div>' +
    '</Form>' +
    '</div>' +
    '</div>';
