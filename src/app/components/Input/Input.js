import './Input.scss';
import BaseComponent from '../BaseComponent/BaseComponent';

export default class Input extends BaseComponent {

    render(context) {
        this.template = require('./Input.handlebars');
        super.render(context);
    }

    addListeners(context) {
        this.events.forEach((item) => {
            if (context[item]) {
                const func = context[item].match(this.functionExp);
                console.log(this._element);
                this._element.getElementsByTagName('input')[0].addEventListener(item, new Function(func[1], func[2]));
            }
        });
    }
}

