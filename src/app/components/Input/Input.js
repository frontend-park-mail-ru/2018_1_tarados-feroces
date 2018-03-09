(function() {
    'use strict';

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

    const inputTemplate = `<div class="input-block {{block-class}}">
        <label class="{{label-class}}">{{label-text}}</label>
        <div class="error {{error-class}}">{{error-text}}</div>
        <input name="{{input-name}}" focus="{{focus}}" blur="{{blur}}"
        type={{type}} class="{{input-class}}" placeholder="{{placeholder}}" value="{{value}}"/>
        </div>`;

    window.Input = Input;
})();
