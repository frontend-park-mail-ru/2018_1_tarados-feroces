
class Button extends BaseComponent {
    constructor() {
        super(buttonTemplate);
        // this.setText(text);
    }
}

const buttonTemplate = '<div class={{className}}>' +
    '{{text}}' +
    '</div>';

// const tm = new TemplateManager(buttonTemplate);
