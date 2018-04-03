import BaseView from '../BaseView/BaseView'
import router from "../../modules/Router/Router";
import userService from "../../modules/UserService/UserService";
import httpModule from "../../modules/HttpModule/HttpModule";

export default class LoginView extends BaseView {

    render() {
        return `<div class="main-page">
                        <Header class="main-page__header">
                            <div class="header-logo">
                                <div class="header-logo-content"></div>
                            </div>
                        </Header>
                        
                        <div class="form-block login">
                            <div class="form-block-content">
                                <div click="(event){ event.preventDefault(); goBack();  }" class="form-block-content__back">
                                    <Image class="form-block-content__back-icon" src="images/back.png"></Image>
                                </div>
                                <Form>
                                    <Label>Sign In</Label>
                                    <div class="form-block-content-inputs">
                                        <Input 
                                            block-class="user-name"
                                            type="text" 
                                            placeholder="Login"
                                            focus="() { validateFocusLoginInput(document.querySelector('.login').getElementsByClassName('input-block')[0]) }"
                                            blur="() { validateBlurLoginInput(document.querySelector('.login').getElementsByClassName('input-block')[0]) }">
                                        </Input>
                                        <Input 
                                            block-class="user-password" 
                                            type="password" 
                                            placeholder="Password"
                                            focus="() { validateFocusLoginInput(document.querySelector('.login').getElementsByClassName('input-block')[1]) }"
                                            blur="() { validateBlurLoginInput(document.querySelector('.login').getElementsByClassName('input-block')[1]) }">
                                        </Input>
                                        <Button 
                                        click="(){ validateLogin(); }"
                                        class="login-button">
                                        Sign In
                                        </Button>
                                     </div>
                                </Form>
                            </div>
                        </div>
                    </div>`;
    }

    needAuthorization() {
        return false;
    }
}

window.validateLogin = () => {
    const blocks = [...document.querySelector('.login').getElementsByClassName('input-block')];
    if (blocks.reduce((result, current) => result + validateLoginInput(current), 0) === blocks.length) {
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

    if (input.value === '') {
        input.classList.add('input-block__input_error');
        return false;
    } else {
        input.classList.remove('input-block__input_error');
        return true;
    }
};

window.validateFocusLoginInput = (block) => block.querySelector('input').classList.remove('input-block__input_error');

window.validateBlurLoginInput = (block) => {
    const input = block.querySelector('input');

    if (input.value === '') {
        input.classList.add('input-block__input_error');
    }
};