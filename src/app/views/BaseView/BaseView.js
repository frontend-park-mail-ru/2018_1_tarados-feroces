class BaseView {
    constructor(template) {
        this.template = template;
        this.element = null;
    }

    render(context) {
        return htmlParser.getHTML(templateManager.getHTML(context, this.template));
    }
}
