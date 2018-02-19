class Button extends BaseComponent {
    constructor() {
        super(buttonTemplate);
    }
}

const buttonTemplate = '<div class="{{class}}">' +
    '{{text}}' +
    '</div>';
