class Input extends BaseComponent {
    constructor() {
        super(inputTemplate);
    }
}

const inputTemplate = '<div class="{{class}}">' +
    '<label class="{{error-class}}">{{error-text}}</label>' +
    '<label class="{{label-class}}">{{label-text}}</label> ' +
    '<input name="{{input-name}}" class="{{input-class}}" placeholder="{{input-placeholder}}"/>' +
    '</div>';
