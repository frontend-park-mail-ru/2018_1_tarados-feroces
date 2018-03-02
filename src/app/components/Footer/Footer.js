'use strict';

class Footer extends BaseComponent {
    constructor() {
        super(footerTemplate);
    }
}

const footerTemplate = '<div class="footer"><p>{{text}}</p></div>';
