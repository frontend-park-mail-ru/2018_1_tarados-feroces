import BaseComponent from '../BaseComponent/BaseComponent'

export default class Input extends BaseComponent {

    render(context) {
        this.template = `<div class="input-block {{block-class}}">
                            <input 
                            name="{{input-name}}" 
                            focus="{{focus}}" 
                            blur="{{blur}}" 
                            type={{type}} 
                            class="input-block__input {{input-class}}" 
                            placeholder="{{placeholder}}" 
                            value="{{value}}"/>
                         </div>`;
        super.render(context);
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

