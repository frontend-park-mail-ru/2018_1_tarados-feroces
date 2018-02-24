class LoginView extends BaseView {
    constructor() {
        super(loginTemplate);
    }
}

const loginTemplate = '<div class="page">' +
    '<Header>Login</Header>' +
    '<div class="registration-block">' +
    '<Form>' +
    '<Input block-class="user-name" error-class="hidden" error-text="empty username" ' +
    'label-text="Full name:" type="text" placeholder="Enter name">' +
    '</Input>' +
    '<Input block-class="user-password" error-class="hidden" error-text="empty password" ' +
    'label-text="Password:" type="password" placeholder="Enter password">' +
    '</Input>' +
    '<div class="button-container">' +
    '<Button class="button large" click="function() {validate();}">Log In!</Button>' +
    '<Button class="button large" click="(event){ event.preventDefault(); goBack();  }">Back</Button>' +
    '</div>' +
    '</Form>' +
    '</div>' +
    '</div>';

const validate = () => {
    const username = document.querySelector('.user-name');
    const password = document.querySelector('.user-password');
    validateLoginInput(username) + validateLoginInput(password) && alert('authorized');

};

const validateLoginInput = (block) => {
    const input = block.querySelector('input');
    const error = block.querySelector('.error');

    if (input.value === '') {
        input.classList.add('input-error');
        error.classList.remove('hidden');
        return false;
    } else {
        input.classList.remove('input-error');
        error.classList.add('hidden');
        return true;
    }
};
