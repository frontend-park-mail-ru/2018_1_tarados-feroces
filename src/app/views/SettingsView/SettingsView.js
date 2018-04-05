import BaseView from '../BaseView/BaseView'
import httpModule from '../../modules/HttpModule/HttpModule'
import router from '../../modules/Router/Router'

export default class SettingsView extends BaseView {

    preRender() {
        return httpModule.doGet('/me').then(
            (response) => {
                this.context = response;
                if (!this.context.avatar.length) {
                    this.context.avatar = '../images/user-logo.jpg'
                }
            }
        );
    }

    render() {
        return `<div class="main-page">
                        <Header class="auth-page__header header">
                            <div class="header-logo">
                                <Image class="header-logo-content" src="../images/Deadlinez.png"></Image>
                            </div>
                            <div class="button button-play">
                                <p class="button-play__value">PLAY</p>
                            </div>
                            <UserInfo login="{{login}}" coins="645" points="1080" avatar="{{avatar}}">
                                <SettingsButton click="(){goToSettings();}"></SettingsButton>
                                <SignoutButton click="(){signOut();}"></SignoutButton>
                            </UserInfo>
                        </Header>
                        
                        <div class="form-block login">
                            <div class="form-block-content">
                                <div click="(event){ event.preventDefault(); goToUser(); }" class="form-block-content__back">
                                    <Image class="form-block-content__back-icon" src="images/back.png"></Image>
                                </div>
                                <Form>
                                    <Label>Settings</Label>
                                    <div class="settings">
                                        <div class="settings-avatar">
                                            <Image class="settings-avatar__user-avatar" src="{{avatar}}"></Image>
                                        </div>
                                       
                                        <div class="form-block-content-inputs">
                                            <InputFile change="(){ changeAvatar(); }" file-class="file-avatar"></InputFile>
                                            <Input 
                                                block-class="user-name"
                                                type="text" 
                                                placeholder="Login"
                                                value="{{login}}"
                                                focus="() { validateFocusSettingsInput(document.querySelector('.settings').getElementsByClassName('input-block')[0]) }"
                                                blur="() { validateBlurSettingsInput(document.querySelector('.settings').getElementsByClassName('input-block')[0]) }">
                                            </Input>
                                            <Input 
                                                block-class="user-email" 
                                                type="text"
                                                placeholder="E-mail"
                                                value="{{email}}"
                                                focus="() { validateFocusSettingsInput(document.querySelector('.settings').getElementsByClassName('input-block')[1]) }"
                                                blur="() { validateBlurSettingsInput(document.querySelector('.settings').getElementsByClassName('input-block')[1]) }">
                                            </Input>
                                            <Button 
                                            click="(){ validateSettings(); }"
                                            class="login-button">
                                            Save
                                            </Button>
                                         </div>
                                     </div>
                                </Form>
                            </div>
                        </div>
                    </div>`;
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
        (responseText) => {
            router.clearUrlElement('/user/');
            router.clearUrlElement('/settings/');
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

window.validateFocusSettingsInput = (block) => block.querySelector('input').classList.remove('input-block__input_error');

window.validateBlurSettingsInput = (block) => {
    const input = block.querySelector('input');

    if (input.value === '') {
        input.classList.add('input-block__input_error');
    }
};

window.goToUser = () => router.go('/user/');
