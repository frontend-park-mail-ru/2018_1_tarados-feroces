class AuthorizedView extends BaseView {

    constructor() {
        super(authorizedTemplate);
    }
}

const authorizedTemplate = '<Header>Hello, {{username}}</Header>' +
    '<Button class="button large" click="(event){ event.preventDefault(); goBack();  }">Back</Button>';

