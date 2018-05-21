import BaseView from '../BaseView/BaseView';
import router from '../../modules/Router/Router';
import userService from '../../modules/UserService/UserService';
import httpModule from '../../modules/HttpModule/HttpModule';

export default class LoginView extends BaseView {

    setContext() {
        this.context.validateLogin = () => {
            const blocks = window.router.getLastView().inputBlocks;
            if (blocks.reduce((result, current) => result + this.validateLoginInput(current), 0) === blocks.length) {
                window.httpModule.doPost('/signin',
                    {
                        login: blocks[0].querySelector('input').value,
                        password: blocks[1].querySelector('input').value,
                    }).then(
                    (response) => {
                        window.userService.userLogin();
                        blocks.forEach((item) => item.querySelector('input').value = '');
                        return window.userService.init();
                    },
                    (error) => {
                        console.log(error);
                    }
                ).then(
                    (resolve) => {
                        window.router.go('/user/');
                    }
                );
            }
        };

        this.context.validateLogin.bind(this.context);

        this.context.validateLoginInput = (block) => {
            const input = block.querySelector('input');

            if (input.value === '') {
                input.classList.add('input-block__input_error');
                return false;
            } else {
                input.classList.remove('input-block__input_error');
                return true;
            }

        };

        this.context.validateBlurLoginInput = (event) => {
            const input = event.target;

            if (input.value === '') {
                input.classList.add('input-block__input_error');
            }
        };

        this.context.validateFocusLoginInput = (event) => {
            const input = event.target;
            input.classList.remove('input-block__input_error');
        };

        this.context.goBack = () => {
            window.router.go('/');
        };
    }

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
