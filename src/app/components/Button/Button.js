
class Button extends BaseComponent {
    constructor() {
        super(buttonTemplate);
        // this.setText(text);
    }
}

const buttonTemplate = '<div class={{class}}>' +
    '{{text}}' +
    '{{{children}}}' +
    '</div>';

// const tm = new TemplateManager(buttonTemplate);
