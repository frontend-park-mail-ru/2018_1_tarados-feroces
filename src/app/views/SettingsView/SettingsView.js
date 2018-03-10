(function() {
    'use strict';

    class SettingsView extends BaseView {

        preRender() {
            return httpModule.doGet('/me').then(
                (response) => {
                    this.context = response;
                }
            );
        }

        render() {
            return `<div class="page">
                        <Header>Settings</Header>
                        <div class="form-block registration">
                            <Image class="main-avatar" src="../../static/images/mainAvatar.jpg"></Image>
                            <Form>
                                <Input block-class="user-name" error-class="hidden" error-text="empty username"
                                label-text="Login:" type="text" value="{{login}}"
                                focus="() { validateFocusRegistrationInput(document.querySelector('.registration').getElementsByClassName('input-block')[0]) }"
                                blur="() { validateBlurRegistrationInput(document.querySelector('.registration').getElementsByClassName('input-block')[0]) }">
                                </Input>
                                <Input block-class="user-email" error-class="hidden" error-text="empty email"
                                label-text="Email:" type="text" value="{{email}}"
                                focus="() { validateFocusRegistrationInput(document.querySelector('.registration').getElementsByClassName('input-block')[1]) }"
                                blur="() { validateBlurRegistrationInput(document.querySelector('.registration').getElementsByClassName('input-block')[1]) }">
                                </Input>
                                <Input error-class="hidden"
                                label-text="Avatar:" type="file">
                                </Input>
                                <div class="button-container">
                                    <Button class="button large" click="(){ validateRegistration(); }">Save</Button>
                                    <Button class="button large" click="(event){ event.preventDefault(); goToUser();  }">Back</Button>
                                </div>
                            </Form>
                        </div>
                    </div>`;
        }

    }

    window.goToUser = () => router.go('/user/');

    window.SettingsView = SettingsView;
})();
