
class Button extends BaseComponent {
    constructor(data) {
        super('div', data);
        // this.setText(text);
    }
}

const buttonTemplate = '<div class={{className}}>' +
    '{{text}}' +
    '</div>';

// const tm = new TemplateManager(buttonTemplate);

// const button = new Button(templateManager.getHTML({className: 'login-block__login-button', text: 'lol'}, buttonTemplate));
