import BaseView from '../BaseView/BaseView'
import router from "../../modules/Router/Router";
import userService from "../../modules/UserService/UserService";
import httpModule from "../../modules/HttpModule/HttpModule";

export default class RegisterView extends BaseView {

    render() {
        return `<div class="main-page">
                        <Header class="main-page__header">
                            <div class="header-logo">
                                <div class="header-logo-content"></div>
                            </div>
                        </Header>
                        
                        <div class="form-block registration">
                            <div class="form-block-content">
                                <div click="(event){ event.preventDefault(); goBack();  }" class="form-block-content__back">
                                    <Image class="form-block-content__back-icon" src="images/back.png"></Image>
                                </div>
                                <Form>
                                    <Label>Sign Up</Label>
                                    <div class="form-block-content-inputs">
                                        <Input 
                                            block-class="user-name"
                                            type="text" 
                                            placeholder="Login"
                                            focus="() { validateFocusRegistrationInput(document.querySelector('.registration').getElementsByClassName('input-block')[0]) }"
                                            blur="() { validateBlurRegistrationInput(document.querySelector('.registration').getElementsByClassName('input-block')[0]) }">
                                        </Input>
                                        <Input 
                                            block-class="user-email" 
                                            type="password" 
                                            placeholder="E-mail"
                                            focus="() { validateFocusRegistrationInput(document.querySelector('.registration').getElementsByClassName('input-block')[1]) }"
                                            blur="() { validateBlurRegistrationInput(document.querySelector('.registration').getElementsByClassName('input-block')[1]) }">
                                        </Input>
                                        <Input 
                                            block-class="user-password" 
                                            type="password" 
                                            placeholder="Password"
                                            focus="() { validateFocusRegistrationInput(document.querySelector('.registration').getElementsByClassName('input-block')[2]) }"
                                            blur="() { validateBlurRegistrationInput(document.querySelector('.registration').getElementsByClassName('input-block')[2]) }">
                                        </Input>
                                        <Input 
                                            block-class="user-repeat-password" 
                                            type="password" 
                                            placeholder="Repeat password"
                                            focus="() { validateFocusRegistrationInput(document.querySelector('.registration').getElementsByClassName('input-block')[3]) }"
                                            blur="() { validateBlurRegistrationInput(document.querySelector('.registration').getElementsByClassName('input-block')[3]) }">
                                        </Input>
                                        <Button 
                                        click="(){ validateRegistration(); }"
                                        class="signup-button">
                                        Sign Up
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

window.validateRegistration = () => {
    const blocks = [...document.querySelector('.registration').getElementsByClassName('input-block')];
    if (blocks.reduce((result, current) => result + validateRegistrationInput(current), 0) == blocks.length) {
        httpModule.doPost('/signup',
            {
                login: blocks[0].querySelector('input').value,
                email: blocks[1].querySelector('input').value,
                password: blocks[2].querySelector('input').value,
            }).then(
            (responseText) => {
                userService.userLogin();
                router.go('/user/');
                blocks.forEach((item) => item.querySelector('input').value = '');
            },
            (error) => {
                document.querySelector('.registration').getElementsByClassName('input-block')[0].querySelector('.error').innerText = error;
                document.querySelector('.registration').getElementsByClassName('input-block')[0].querySelector('.error').classList.remove('hidden');
            }
        );
    }
};

window.validateRegistrationInput = (block) => {
    const input = block.querySelector('input');

    if (input.value === '') {
        input.classList.add('input-block__input_error');
        return false;
    } else {
        input.classList.remove('input-block__input_error');
        return true;
    }
};

window.validateFocusRegistrationInput = (block) => block.querySelector('input').classList.remove('input-block__input_error');

window.validateBlurRegistrationInput = (block) => {
    const input = block.querySelector('input');

    if (input.value === '') {
        input.classList.add('input-block__input_error');
    }
};
