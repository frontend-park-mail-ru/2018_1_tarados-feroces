import BaseComponent from '../BaseComponent/BaseComponent'

export default class StandartComponent extends BaseComponent {

    render(context) {
        this.template = `<{{tag}} class="{{class}}">{{text}}</{{tag}}>`;
        super.render(context);
    }
}
