'use strict';

import BaseComponent from '../BaseComponent/BaseComponent.js';

export default class Form extends BaseComponent {

    constructor() {
        super(formTemplate);
    }
}

const formTemplate = '<form method="{{method}}"></form>';
