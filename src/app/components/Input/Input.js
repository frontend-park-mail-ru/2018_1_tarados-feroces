class Input extends BaseComponent {
    constructor() {
        super(inputTemplate);
    }
}

const inputTemplate = '<div class="input-block {{block-class}}">' +
    '<label class="{{label-class}}">{{label-text}}</label> ' +
    '<div class="error {{error-class}}">{{error-text}}</div> ' +
    '<input name="{{input-name}}" focus="{{focus}}" blur="{{blur}}" type={{type}} class="{{input-class}}" placeholder="{{placeholder}}"/>' +
    '</div>';
