import BaseComponent from '../BaseComponent/BaseComponent';

export default class Footer extends BaseComponent {

    render(context) {
        this.template = `<div class="footer"><p>{{text}}</p></div>`;
        super.render(context);
    }
}
