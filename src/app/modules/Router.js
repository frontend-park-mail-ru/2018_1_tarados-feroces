"use strict";

class Router {

    idCreator(templateName){
        return `${templateName.split(".")[0]}-template`;
    }

    constructor() {
        this.manager = new TemplateManager('');

        this.urls = {
            "/login": "login.html"
        };
    }

    go(data, url, context, handler) {
        history.pushState(data, '', url);
        console.log(this.idCreator(this.urls[url]));
        this.manager.changeTemplate(this.idCreator(this.urls[url]));
        this.element = this.manager.getElement(context, "");
        this.hide();
        this.showPage();
    }

    //Отображает страницу
    showPage() {
        document.body.appendChild(this.element);
    }

    hide() {
        document.body.removeChild(document.body.lastChild);
    }
}
