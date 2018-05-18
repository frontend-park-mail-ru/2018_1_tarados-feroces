import BaseView from '../BaseView/BaseView';
import router from '../../modules/Router/Router';
import userService from '../../modules/UserService/UserService';
import httpModule from '../../modules/HttpModule/HttpModule';

export default class LoginView extends BaseView {

    render() {
        this.template = require('./LoginView.handlebars');
    }

    getDOMDependensies() {
        this.inputBlocks = [...document.querySelector('.login').getElementsByClassName('input-block')];
    }

    needAuthorization() {
        return false;
    }
}

window.validateLogin = () => {
    const blocks = router.getLastView().inputBlocks;
    if (blocks.reduce((result, current) => result + validateLoginInput(current), 0) === blocks.length) {
        httpModule.doPost('/signin',
            {
                login: blocks[0].querySelector('input').value,
                password: blocks[1].querySelector('input').value,
            }).then(
            (response) => {
                userService.userLogin();
                blocks.forEach((item) => item.querySelector('input').value = '');
                return userService.init();
            },
            (error) => {
                alert(error);
            }
        ).then(
            (resolve) => {
                console.log('go');
                router.go('/user/');
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
