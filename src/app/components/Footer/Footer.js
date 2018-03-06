'use strict';

import BaseComponent from '../BaseComponent/BaseComponent.js';

export default class Footer extends BaseComponent {
    constructor() {
        super(footerTemplate);
    }
}

const footerTemplate = '<div class="footer"><p>{{text}}</p></div>';
