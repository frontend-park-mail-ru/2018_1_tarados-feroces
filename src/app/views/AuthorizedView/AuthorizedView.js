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
                        <Image class="main-avatar" src="data:image/gif;base64,{{avatar}}"></Image>
                        <div class="button-container">
                            <Button class="button large" click="(event){ event.preventDefault(); goToSettings();  }">Settings</Button>
                            <Button class="button large" click="(event){ event.preventDefault(); goToScore();  }">Leaderboard</Button>
                            <Button class="button large" click="(event){ event.preventDefault(); signOut();  }">Sign out</Button>
                        </div>
                    </div>`;
        }
    }

    window.goToSettings = () => router.go('/settings/');

    window.signOut = () => {
        httpModule.doPost('/signout').then(
            (response) => {
                userService.userLogout();
                router.go('/');
            }
        );
    };

    window.AuthorizedView = AuthorizedView;
})();
