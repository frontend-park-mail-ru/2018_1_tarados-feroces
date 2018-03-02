'use strict';

class MenuPoint extends BaseComponent {

    constructor() {
        super(menuPointTemplate);
    }
}

const menuPointTemplate = '<li><a href="{{href}}">{{text}}</a></li>';
