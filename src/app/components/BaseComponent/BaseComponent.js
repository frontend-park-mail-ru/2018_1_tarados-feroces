'use strict';

class BaseComponent {

    constructor(template) {
        this.template = template;
    }

    render(context) {
        return templateManager.getHTML(context, this.template);
    }
}
