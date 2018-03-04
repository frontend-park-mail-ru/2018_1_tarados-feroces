'use strict';

class AuthorizedView extends BaseView {

    preRender() {
        httpModule.doRequest('POST', 'http://deadlinez.herokuapp.com/alexalone/me'.then(
            (response) => {
                this.context = response;
            }
        ));
    }

    render() {
        return '<Header>Hello, {{username}}</Header>' +
                '<Button class="button large" click="(event){ event.preventDefault(); goBack();  }">Back</Button>';
    }
}
