import BaseComponent from '../BaseComponent/BaseComponent'


export default class Image extends BaseComponent {

    render(context) {
        this.template = `<img class="{{class}}" src="{{src}}">`;
        super.render(context);
    }
}
