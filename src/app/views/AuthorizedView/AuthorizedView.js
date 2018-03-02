'use strict';

class AuthorizedView extends BaseView {

    render() {
        return '<Header>Hello, {{username}}</Header>' +
                '<Button class="button large" click="(event){ event.preventDefault(); goBack();  }">Back</Button>';
    }
}
