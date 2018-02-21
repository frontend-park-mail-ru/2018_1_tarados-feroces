class Input extends BaseComponent {
    constructor() {
        super(inputTemplate);
    }
}

const inputTemplate = '<div class="input-block">' +
    '<label class="{{label-class}}">{{label-text}}</label> ' +
    '<input name="{{input-name}}" type={{type}} class="{{input-class}}" placeholder="{{placeholder}}"/>' +
    '</div>';
