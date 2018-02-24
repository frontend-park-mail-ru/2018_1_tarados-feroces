class RegisterView extends BaseView {
    constructor() {
        super(registerTemplate);
    }
}

const registerTemplate = '<div class="page">' +
    '<Header>Sign Up!</Header>' +
    '<div class="registration-block registration">' +
    '<Form>' +
    '<Input block-class="user-name" error-class="hidden" error-text="empty username" ' +
    'label-text="Full name:" type="text" placeholder="Enter login">' +
    '</Input>' +
    '<Input block-class="user-email" error-class="hidden" error-text="empty email" ' +
    'label-text="Full name:" type="text" placeholder="Enter e-mail">' +
    '</Input>' +
    '<Input block-class="user-password" error-class="hidden" error-text="empty password" ' +
    'label-text="Password:" type="password" placeholder="Enter password">' +
    '</Input>' +
    '<Input block-class="user-repeat-password" error-class="hidden" error-text="empty password" ' +
    'label-text="Repeat Password:" type="password" placeholder="Repeat password">' +
    '</Input>' +
    // '<Input label-text="Full name:" type="text" placeholder="Enter name"></Input>' +
    // '<Input label-text="Login:" type="text" placeholder="Enter login"></Input>' +
    // '<Input label-text="E-mail:" type="text" placeholder="Enter e-mail"></Input>' +
    // '<Input label-text="Password:" type="password" placeholder="Enter password"></Input>' +
    // '<Input label-text="Repeat Password:" type="password" placeholder="Repeat password"></Input>' +
    '<div class="button-container">' +
    '<Button class="button large" click="(){ validateRegistration(); }">Sign Up!</Button>' +
    '<Button class="button large" click="(event){ event.preventDefault(); goBack();  }">Back</Button>' +
    '</div>' +
    '</Form>' +
    '</div>' +
    '</div>';

const validateRegistration = () => {
    const blocks = [...document.querySelector('.registration').getElementsByClassName('input-block')];
    blocks.reduce((result, current) => result + validateRegistrationInput(current), 0) && alert('authorized');

};

const validateRegistrationInput = (block) => {
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
