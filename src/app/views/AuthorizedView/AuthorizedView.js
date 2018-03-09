(function() {
    'use strict';

    class AuthorizedView extends BaseView {

        preRender() {
            return httpModule.doGet('/me').then(
                (response) => {
                    this.context = response;
                }
            );
        }

        render() {
            return `<div class="page">
                        <Header>Hello, {{login}}</Header>
                        <Image class="main-avatar" src="../../static/images/1.jpg"></Image>
                        <div class="button-container">
                            <Button class="button large" click="(event){ event.preventDefault(); goToSettings();  }">Settings</Button>
                            <Button class="button large" click="(event){ event.preventDefault(); signOut();  }">Sign out</Button>
                            <Button class="button large" click="(event){ event.preventDefault(); goBack();  }">Back</Button>
                        </div>
                    </div>`;
        }
    }

    window.goToSettings = () => router.go('/settings/');

    window.AuthorizedView = AuthorizedView;
})();

