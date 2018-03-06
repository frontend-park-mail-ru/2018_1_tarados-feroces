'use strict';

class RegisterView extends BaseView {

    render() {
        return `<div class="page">
                    <Header>Sign Up!</Header>
                    <div class="form-block registration">
                        <Form>
                            <Input block-class="user-name" error-class="hidden" error-text="empty username"
                            label-text="Full name:" type="text" placeholder="Enter login"
                            focus="() { validateFocusRegistrationInput(document.querySelector('.registration').getElementsByClassName('input-block')[0]) }"
                            blur="() { validateBlurRegistrationInput(document.querySelector('.registration').getElementsByClassName('input-block')[0]) }">
                            </Input>
                            <Input block-class="user-email" error-class="hidden" error-text="empty email"
                            label-text="E-mail:" type="text" placeholder="Enter E-mail"
                            focus="() { validateFocusRegistrationInput(document.querySelector('.registration').getElementsByClassName('input-block')[1]) }"
                            blur="() { validateBlurRegistrationInput(document.querySelector('.registration').getElementsByClassName('input-block')[1]) }">
                            </Input>
                            <Input block-class="user-password" error-class="hidden" error-text="empty password"
                            label-text="Password:" type="text" placeholder="Enter password"
                            focus="() { validateFocusRegistrationInput(document.querySelector('.registration').getElementsByClassName('input-block')[2]) }"
                            blur="() { validateBlurRegistrationInput(document.querySelector('.registration').getElementsByClassName('input-block')[2]) }">
                            </Input>
                            <Input block-class="user-repeat-password" error-class="hidden" error-text="empty password"
                            label-text="Repeat password:" type="text" placeholder="Enter password"
                            focus="() { validateFocusRegistrationInput(document.querySelector('.registration').getElementsByClassName('input-block')[3]) }"
                            blur="() { validateBlurRegistrationInput(document.querySelector('.registration').getElementsByClassName('input-block')[3]) }">
                            </Input>
                            <div class="button-container">
                                <Button class="button large" click="(){ validateRegistration(); }">Sign Up!</Button>
                                <Button class="button large" click="(event){ event.preventDefault(); goBack();  }">Back</Button>
                            </div>
                        </Form>
                    </div>
                </div>`;
    }
}

const validateRegistration = () => {
    const blocks = [...document.querySelector('.registration').getElementsByClassName('input-block')];
    if (blocks.reduce((result, current) => result + validateRegistrationInput(current), 0) == blocks.length) {
        alert('authorized');
    }
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

const validateFocusRegistrationInput = (block) => {
    block.querySelector('input').classList.remove('input-error');
    block.querySelector('.error').classList.add('hidden');
};

const validateBlurRegistrationInput = (block) => {
    const input = block.querySelector('input');
    const error = block.querySelector('.error');

    if (input.value === '') {
        input.classList.add('input-error');
        error.classList.remove('hidden');
    }
};
