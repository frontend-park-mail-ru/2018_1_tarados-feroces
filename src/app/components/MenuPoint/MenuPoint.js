'use strict';

import BaseComponent from '../BaseComponent/BaseComponent.js';

export default class MenuPoint extends BaseComponent {

    constructor() {
        super(menuPointTemplate);
    }
}

const menuPointTemplate = '<li><a href="{{href}}">{{text}}</a></li>';
