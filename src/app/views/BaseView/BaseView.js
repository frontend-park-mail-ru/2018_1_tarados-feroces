class BaseView {
    constructor(template) {
        this.template = template;
    }

    render(context) {
        return htmlParser.getHTML(templateManager.getHTML(context, this.template));
    }
}
