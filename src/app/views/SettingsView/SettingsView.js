import './SettingsView.scss';
import BaseView from '../BaseView/BaseView';
import httpModule from '../../modules/HttpModule/HttpModule';
import router from '../../modules/Router/Router';
import userService from '../../modules/UserService/UserService';

export default class SettingsView extends BaseView {

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
}

window.reader = new FileReader();

window.changeAvatar = () => {
    const files = document.querySelector('.file-avatar').files;
    const file = files[files.length - 1];
    reader.readAsDataURL(file);
    reader.onload = changeImage;
};

const changeImage = () => {
    const field = document.querySelector('.settings-avatar__user-avatar');
    field.src = reader.result;
};

const settings = (notAvatar = true) => {
    const blocks = [...document.querySelector('.settings').getElementsByClassName('input-block')];
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
            userService.update(data);
            router.go('/user/');
        },
        (error) => {

        }
    );
};

window.validateSettings = () => {
    const blocks = [...document.querySelector('.settings').getElementsByClassName('input-block')];
    if (blocks.reduce((result, current) => result + validateSettingsInput(current), 0) === blocks.length) {
        const files = document.querySelector('.file-avatar').files;
        const file = files[files.length - 1];
        if (!file) {
            settings(false);
        }
        reader.readAsDataURL(file);
        reader.onload = settings;
    }
};

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

window.validateFocusSettingsInput = (block) => block.querySelector('input')
    .classList.remove('input-block__input_error');

window.validateBlurSettingsInput = (block) => {
    const input = block.querySelector('input');

    if (input.value === '') {
        input.classList.add('input-block__input_error');
    }
};

window.goToUser = () => router.go('/user/');
