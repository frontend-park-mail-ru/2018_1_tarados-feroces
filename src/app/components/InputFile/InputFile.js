import BaseComponent from '../BaseComponent/BaseComponent'

export default class InputFile extends BaseComponent {

    render(context) {
        this.template = `<div class="file-upload {{class}}">
                            <label class="file-upload-label">
                                <input type="file" name="file" class="{{file-class}}">
                                <span>Выберите файл</span>
                            </label>
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

