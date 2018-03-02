'use strict';

class Header extends BaseComponent {

    constructor() {
        super(headerTemplate);
    }
}

const headerTemplate = '<div class="header {{class}}">' +
    '<h1>{{text}}</h1>' +
    '</div>';
