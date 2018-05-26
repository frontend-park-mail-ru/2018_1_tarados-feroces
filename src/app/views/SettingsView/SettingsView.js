import './SettingsView.scss';
import BaseView from '../BaseView/BaseView';
// import httpModule from '../../modules/HttpModule/HttpModule';
// import router from '../../modules/Router/Router';
// import userService from '../../modules/UserService/UserService';

export default class SettingsView extends BaseView {

    setContext() {
        window.reader = new FileReader();

        this.context.goToSettings = () => {
            router.go('/settings/');
        };

        this.context.signOut = () => {
            httpModule.doPost('/signout').then(
                (response) => {
                    userService.userLogout();
                    router.go('/');
                }
            );
        };

        this.context.changeAvatar = () => {
            const files = document.querySelector('.file-avatar').files;
            const file = files[files.length - 1];
            reader.readAsDataURL(file);
            reader.onload = changeImage;
        };

        this.context.validateSettings = () => {
            const blocks = window.router.getLastView().inputBlocks;
            if (blocks.reduce((result, current) => result + validateSettingsInput(current), 0) === blocks.length) {
                const files = document.querySelector('.file-avatar').files;
                const file = files[files.length - 1];
                if (!file) {
                    settings(false);
                } else {
                    reader.readAsDataURL(file);
                    reader.onload = settings;
                }
            }
        };

        this.context.validateFocusSettingsInput = (event) => {
            const input = event.target;
            input.classList.remove('input-block__input_error');
        };

        this.context.validateBlurSettingsInput = (event) => {
            const input = event.target;

            if (input.value === '') {
                input.classList.add('input-block__input_error');
            }
        };

        this.context.goToUser = () => router.go('/user/');
    }

    preRender() {

        this.context = userService.data;
        if (!this.context.avatar.length) {
            this.context.avatar = '../images/user-logo.jpg';
        }
        
        return super.preRender();
    }

    render() {
        return this.template = require('./SettingsView.handlebars');
    }

    getDOMDependensies() {
        this.inputBlocks = [...document.querySelector('.settings').getElementsByClassName('input-block')];
        console.log(this.inputBlocks);
    }
}

window.validateSettingsInput = (block) => {
    const input = block.querySelector('input');

    if (input.value === '') {
        input.classList.add('input-block__input_error');
        return false;
    } else {
        input.classList.remove('input-block__input_error');
        return true;
    }
};

window.changeImage = () => {
    const field = document.querySelector('.settings-avatar__user-avatar');
    field.src = reader.result;
};

window.settings = (notAvatar = true) => {
    const blocks = window.router.getLastView().inputBlocks;
    const data = {
        login: blocks[0].querySelector('input').value,
        email: blocks[1].querySelector('input').value
    };
    if (notAvatar) {
        data.avatar = reader.result;
    }

    httpModule.doPost('/user/update', data)
        .then(
            (response) => {
                router.clearUrlElement('/user/');
                router.clearUrlElement('/settings/');
                userService.update()
                    .then((response) => {
                            router.go('/user/');
                        }
                    );

            },
            (error) => {

            }
        );
};
