import BaseView from '../BaseView/BaseView';
import Validation from '../../modules/Validator/index';


export default class RegisterView extends BaseView {

    setContext() {
        this.context.validateRegistration = () => {
            const blocks = router.getLastView().inputBlocks;
            const inputs = blocks.map((block) => block.querySelector('input'));
            const errors = {};
            window.Validation(inputs, errors);
            for (let key in errors) {
                blocks.map((block) => {
                    const error = block.querySelector('p[name=' + key + ']');
                    if (error) {
                        error.textContent = errors[key];
                    }
                });
            }
            if (Object.keys(errors).length) {
                return;
            }

            if (blocks.reduce((result, current) => result + validateRegistrationInput(current), 0) === blocks.length) {
                window.httpModule.doPost('/signup',
                    {
                        login: blocks[0].querySelector('input').value,
                        email: blocks[1].querySelector('input').value,
                        password: blocks[2].querySelector('input').value,
                    }).then(
                    (responseText) => {
                        userService.userLogin();
                        userService.init().then(
                            (response) => {
                                window.router.go('/user/');
                            });
                        blocks.forEach((item) => item.querySelector('input').value = '');
                    },
                    (error) => {
                    }
                );
            }
        };

        this.context.validateFocusRegistrationInput = (block) => block.querySelector('input')
            .classList.remove('input-block__input_error');

        this.context.validateBlurRegistrationInput = (block) => {
            const input = block.querySelector('input');

            if (input.value === '') {
                input.classList.add('input-block__input_error');
            }
        };

        this.context.goBack = () => {
            window.router.go('/');
        };
    }

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
