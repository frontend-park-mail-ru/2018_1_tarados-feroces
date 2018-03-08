(function() {
    'use strict';

    class SettingsView extends BaseView {

        render() {
            return `<div class="page">
                        <Header>Settings</Header>
                        <div class="form-block registration">
                            <Image class="main-avatar" src="../../static/1.jpg"></Image>
                            <Form>
                                <Input block-class="user-name" error-class="hidden" error-text="empty username"
                                label-text="Login:" type="text" value="{{login}}"
                                focus="() { validateFocusRegistrationInput(document.querySelector('.registration').getElementsByClassName('input-block')[0]) }"
                                blur="() { validateBlurRegistrationInput(document.querySelector('.registration').getElementsByClassName('input-block')[0]) }">
                                </Input>
                                <Input block-class="user-email" error-class="hidden" error-text="empty email"
                                label-text="E-mail:" type="text" value="{{email}}" 
                                focus="() { validateFocusRegistrationInput(document.querySelector('.registration').getElementsByClassName('input-block')[1]) }"
                                blur="() { validateBlurRegistrationInput(document.querySelector('.registration').getElementsByClassName('input-block')[1]) }">
                                </Input>
                                <Input error-class="hidden" error-text="empty email"
                                label-text="Avatar:" type="file">
                                </Input>
                                <div class="button-container">
                                    <Button class="button large" click="(){ validateRegistration(); }">Save</Button>
                                    <Button class="button large" click="(event){ event.preventDefault(); goBack();  }">Back</Button>
                                </div>
                            </Form>
                        </div>
                    </div>`;
        }

    }

    window.SettingsView = SettingsView;
})();
