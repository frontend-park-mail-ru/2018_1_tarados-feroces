'use strict';

class LoginView extends BaseView {

    render() {
        return `<div class="page">
                        <Header>Login</Header>
                        <div class="form-block login">
                            <Form>
                                <Input block-class="user-name" error-class="hidden" error-text="empty username"
                                label-text="Full name:" type="text" placeholder="Enter name"
                                focus="() { validateFocusLoginInput(document.querySelector('.login').getElementsByClassName('input-block')[0]) }">
                                </Input>
                                <Input block-class="user-password"  error-class="hidden" error-text="empty password"
                                label-text="Password:" type="password" placeholder="Enter password"
                                focus="() { validateFocusLoginInput(document.querySelector('.login').getElementsByClassName('input-block')[1]) }"
                                blur="() { validateBlurLoginInput(document.querySelector('.login').getElementsByClassName('input-block')[1]) }">
                                </Input>
                                <div class="button-container">
                                    <Button class="button large" click="() {validateLogin();}">Log In!</Button>
                                    <Button class="button large" click="(event){ event.preventDefault(); goBack();  }">Back</Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <Footer>Made by Tarados Feroces</Footer>`;
    }
}

const validateLogin = () => {
    const blocks = [...document.querySelector('.login').getElementsByClassName('input-block')];
    if (blocks.reduce((result, current) => result + validateLoginInput(current), 0) == blocks.length) {

        httpModule.doPost('/signin',
            {
                login: blocks[0].querySelector('input').value,
                password: blocks[1].querySelector('input').value,
            }).then(
            (responseText) => {
                router.go('/user/');
            },
            (error) => {
                document.querySelector('.login').getElementsByClassName('input-block')[0].querySelector('.error').innerText = error;
                document.querySelector('.login').getElementsByClassName('input-block')[0].querySelector('.error').classList.remove('hidden');
            }
            );

    }
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

const validateFocusLoginInput = (block) => {
    block.querySelector('input').classList.remove('input-error');
    block.querySelector('.error').classList.add('hidden');
};

const validateBlurLoginInput = (block) => {
    const input = block.querySelector('input');
    const error = block.querySelector('.error');

    if (input.value === '') {
        input.classList.add('input-error');
        error.classList.remove('hidden');
    }
};
