import BaseView from '../BaseView/BaseView';
import router from '../../modules/Router/Router';
import userService from '../../modules/UserService/UserService';
import httpModule from '../../modules/HttpModule/HttpModule';

export default class RegisterView extends BaseView {

    render() {
        this.template = require('./RegisterView.handlebars');
    }

    getDOMDependensies() {
        this.inputBlocks = [...document.querySelector('.registration').getElementsByClassName('input-block')];
    }

    needAuthorization() {
        return false;
    }
}

window.validateRegistration = () => {
    const blocks = router.getLastView().inputBlocks;
    if (blocks.reduce((result, current) => result + validateRegistrationInput(current), 0) === blocks.length) {
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

window.validateFocusRegistrationInput = (block) => block.querySelector('input')
    .classList.remove('input-block__input_error');

window.validateBlurRegistrationInput = (block) => {
    const input = block.querySelector('input');

    if (input.value === '') {
        input.classList.add('input-block__input_error');
    }
};
