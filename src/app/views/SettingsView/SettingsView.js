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
                        <div class="form-block settings">
                            <Image class="main-avatar" src="../../static/images/mainAvatar.jpg"></Image>
                            <Form>
                                <Input block-class="user-name" error-class="hidden" error-text="empty username"
                                label-text="Login:" type="text" value="{{login}}"
                                focus="() { validateFocusSettingsInput(document.querySelector('.settings').getElementsByClassName('input-block')[0]) }"
                                blur="() { validateBlurSettingsInput(document.querySelector('.settings').getElementsByClassName('input-block')[0]) }">
                                </Input>
                                <Input block-class="user-email" error-class="hidden" error-text="empty email"
                                label-text="Email:" type="text" value="{{email}}"
                                focus="() { validateFocusSettingsInput(document.querySelector('.settings').getElementsByClassName('input-block')[1]) }"
                                blur="() { validateBlurSettingsInput(document.querySelector('.settings').getElementsByClassName('input-block')[1]) }">
                                </Input>
                                <Input error-class="hidden"
                                label-text="Avatar:" type="file">
                                </Input>
                                <div class="button-container">
                                    <Button class="button large" click="(){ validateSettings(); }">Save</Button>
                                    <Button class="button large" click="(event){ event.preventDefault(); goToUser();  }">Back</Button>
                                </div>
                            </Form>
                        </div>
                    </div>`;
        }

    }

    const settings = (file) => {
        const blocks = [...document.querySelector('.settings').getElementsByClassName('input-block')];
        console.log(file.currentTarget.result);
        httpModule.doPost('/user/update',
            {
                login: blocks[0].querySelector('input').value,
                email: blocks[1].querySelector('input').value,
                avatar: file.currentTarget.result,
            }).then(
            (responseText) => {
                router.go('/user/');
                blocks.forEach((item) => item.querySelector('input').value = '');
            },
            (error) => {
                document.querySelector('.settings').getElementsByClassName('input-block')[0].querySelector('.error').innerText = error;
                document.querySelector('.settings').getElementsByClassName('input-block')[0].querySelector('.error').classList.remove('hidden');
            }
        );
    };

    const test = (event) => {
        let file = event.currentTarget.result;
        file = btoa((encodeURIComponent(file)));
        const img = document.createElement('img');
        img.src = `data:image/gif;base64,${file}`;
        document.body.appendChild(img);
    };

    window.validateSettings = () => {
        const blocks = [...document.querySelector('.settings').getElementsByClassName('input-block')];
        const reader = new FileReader();
        if (blocks.reduce((result, current) => result + validateSettingsInput(current), 0) == blocks.length) {
            const file = blocks[2].querySelector('input').files[0];
            reader.onload = settings;
            reader.readAsText(file);
        }
    };

    window.validateSettingsInput = (block) => {
        const input = block.querySelector('input');
        const error = block.querySelector('.error');

        if (input.value === '') {
            input.classList.add('input-error');
            error.classList.remove('hidden');
            return false;
        } else {
            input.classList.remove('input-error');
            error.classList.add('hidden');
            return true;
        }
    };

    window.validateFocusSettingsInput = (block) => {
        block.querySelector('input').classList.remove('input-error');
        block.querySelector('.error').classList.add('hidden');
    };

    window.validateBlurSettingsInput = (block) => {
        const input = block.querySelector('input');
        const error = block.querySelector('.error');

        if (input.value === '') {
            input.classList.add('input-error');
            error.classList.remove('hidden');
        }
    };

    window.goToUser = () => router.go('/user/');

    window.SettingsView = SettingsView;
})();
