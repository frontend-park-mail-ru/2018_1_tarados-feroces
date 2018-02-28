class BaseView {

    constructor() {
        this.element = null;
        this.context = {};
    }

    render(context = this.context) {
       return '';
    }

    __render() {
        this.element = htmlParser.getHTML(templateManager.getHTML(context, this.render()));
        return this.element;
    }

    hide() {
        if (this.element) {
            this.element.classList.add('hidden');
        }
    }

    show() {
        if (this.element) {
            this.element.classList.remove('hidden');
        }
    }
}

