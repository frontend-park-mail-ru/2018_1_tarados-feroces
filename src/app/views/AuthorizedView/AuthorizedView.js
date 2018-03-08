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
            return `<Header>Hello, {{login}}</Header>
                    <Button class="button large" click="(event){ event.preventDefault(); goBack();  }">Back</Button>`;
        }
    }

    window.AuthorizedView = AuthorizedView;
})();

