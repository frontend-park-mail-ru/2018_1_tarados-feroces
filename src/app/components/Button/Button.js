'use strict';

import BaseComponent from '../BaseComponent/BaseComponent.js';

export default class Button extends BaseComponent {

    constructor() {
        super(buttonTemplate);
    }
}

const buttonTemplate = '<div class="button {{class}}"><p>{{text}}</p></div>';
