import BaseComponent from '../BaseComponent/BaseComponent'

export default class Form extends BaseComponent {

    render(context) {
        this.template = `<form method="{{method}}"></form>`;
        super.render(context);
    }
}

