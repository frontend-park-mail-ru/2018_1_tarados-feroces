import BaseComponent from '../BaseComponent/BaseComponent'

export default class Trailer extends BaseComponent {

    render(context) {
        this.template = `<iframe class="{{class}}" src="{{src}}" frameborder="{{frameborder}}" allow="{{allow}}" allowfullscreen></iframe>`;
        super.render(context);
    }
}
