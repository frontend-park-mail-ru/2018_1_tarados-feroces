class Input extends BaseComponent {
    constructor() {
        super(inputTemplate);
    }

    addListeners(context) {
        this.events.forEach((item) => {
            if (context[item]) {
                const func = context[item].match(this.functionExp);
                this._element.getElementsByTagName('input')[0].addEventListener(item, new Function(func[1], func[2]));
            }
        });
    }
}

const inputTemplate = '<div class="input-block">' +
    '<label class="{{label-class}}">{{label-text}}</label> ' +
    '<input name="{{input-name}}" type={{type}} class="{{input-class}}" placeholder="{{placeholder}}"/>' +
    '</div>';
