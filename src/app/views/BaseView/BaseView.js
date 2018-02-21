class BaseView {
    constructor(template) {
        this.template = template;
        this.element = null;
    }

    render(context) {
        this.element = htmlParser.getHTML(templateManager.getHTML(context, this.template));
    }
}
