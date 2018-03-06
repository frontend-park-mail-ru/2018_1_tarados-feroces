'use strict';

import BaseView from '../BaseView/BaseView.js'

export default class AuthorizedView extends BaseView {

    preRender() {
        httpModule.doGet('/me').then(
            (response) => {
                this.context = response;
            }
        );
    }

    render() {
        return '<Header>Hello, {{username}}</Header>' +
                '<Button class="button large" click="(event){ event.preventDefault(); goBack();  }">Back</Button>';
    }
}
