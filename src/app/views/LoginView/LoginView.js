import BaseView from '../BaseView/BaseView'
import router from "../../modules/Router/Router";
import userService from "../../modules/UserService/UserService";
import httpModule from "../../modules/HttpModule/HttpModule";

export default class LoginView extends BaseView {

    render() {
        return `<div class="page">
                        <Header>Login</Header>
                        <div class="form-block login">
                            <Form>
                                <Input block-class="user-name" error-class="hidden" error-text="empty username"
                                label-text="Enter login:" type="text" placeholder="Enter login"
                                focus="() { validateFocusLoginInput(document.querySelector('.login').getElementsByClassName('input-block')[0]) }"
                                blur="() { validateBlurLoginInput(document.querySelector('.login').getElementsByClassName('input-block')[0]) }">
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

    needAuthorization() {
        return false;
    }
}

window.validateLogin = () => {
    const blocks = [...document.querySelector('.login').getElementsByClassName('input-block')];
    if (blocks.reduce((result, current) => result + validateLoginInput(current), 0) == blocks.length) {
        httpModule.doPost('/signin',
            {
                login: blocks[0].querySelector('input').value,
                password: blocks[1].querySelector('input').value,
            }).then(
            (responseText) => {
                userService.userLogin();
                router.go('/user/');
                blocks.forEach((item) => item.querySelector('input').value = '');
            },
            (error) => {
                alert(error);
            }
        );
    }
};

window.validateLoginInput = (block) => {
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

window.validateFocusLoginInput = (block) => {
    block.querySelector('input').classList.remove('input-error');
    block.querySelector('.error').classList.add('hidden');
};

window.validateBlurLoginInput = (block) => {
    const input = block.querySelector('input');
    const error = block.querySelector('.error');

    if (input.value === '') {
        input.classList.add('input-error');
        error.classList.remove('hidden');
    }
};