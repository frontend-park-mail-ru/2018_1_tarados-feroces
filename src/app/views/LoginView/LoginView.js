class LoginView extends BaseView {
    constructor() {
        super(loginTemplate);
    }
}

const loginTemplate = '<div class="page">' +
    '<Header>Login</Header>' +
    '<div class="registration-block">' +
    '<Form>' +
    '<Input input-class="user-name-input" label-text="Full name:" type="text" placeholder="Enter name">' +
    '</Input>' +
    '<Input input-class="user-password-input" label-text="Password:" type="password" placeholder="Enter password">' +
    '</Input>' +
    '<div class="button-container">' +
    '<Button class="button large" click="function() {validate();}">Log In!</Button>' +
    '<Button class="button large" click="(event){ event.preventDefault(); goBack();  }">Back</Button>' +
    '</div>' +
    '</Form>' +
    '</div>' +
    '</div>';

const validate = () => {
    const username = document.querySelector('.user-name-input');
    const password = document.querySelector('.user-password-input');
    let validationControl = 0;

    if (username.value === '') {
       alert('empty username');
    } else {
        validationControl += 1;
    }

    if (password.value === '') {
        alert('empty password');
    } else {
        validationControl += 1;
    }

    if (validationControl === 2) {
        alert('1');
    }
};
