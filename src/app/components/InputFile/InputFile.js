import BaseComponent from '../BaseComponent/BaseComponent'

export default class InputFile extends BaseComponent {

    render(context) {
        this.template = require('./InputFile.handlebars');
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

