class BaseView {
    constructor(template) {
        this.template = template;
        this.element = null;
    }

    render(context) {
        this.element = htmlParser.getHTML(templateManager.getHTML(context, this.template));
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

    // appendChild(element) {
    //     if (this.element) {
    //         this.element.appendChild(element);
    //     }
    // }
}

