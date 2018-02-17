'use strict';

class HtmlParser {
    constructor() {
        this.regExp = /<[a-z0-9 _\-"=(){}]+>|<\/[a-z0-9 _\-"=(){}]+>/ig;
        this.regExpBegin = /<([a-z0-9 _\-"=(){}]+)>/i;
        this.objects = [];
        this.tagStack = [];

        this.componentFactory = {
            Button: (context) => new Button(context),
        };
    }

    handleCloseTag() {
        let obj = this.tagStack.pop();
        if (this.tagStack.length === 0) {
            this.objects.push(obj);
            return;
        }

        this.tagStack[this.tagStack.length - 1].children.push(obj);
    }

    handleOpenTag(tag) {
        let obj = {
            object: tag.slice(1, -1),
            children: [],
        };

        this.tagStack.push(obj);
    }

    handleTag(tag) {
        let result = this.regExpBegin.exec(tag);
        result ? this.handleOpenTag(tag) : this.handleCloseTag(tag);
    }

    parseHtml(input) {
        let compareResult = '';
        let previousIndex = 0;

        while (compareResult = this.regExp.exec(input)) {
            if (previousIndex < compareResult.index) {
                this.tagStack[this.tagStack.length - 1].text = input.slice(previousIndex, compareResult.index);
            }

            this.handleTag(compareResult[0]);

            previousIndex = compareResult.index + compareResult[0].length;
        }
    }

    performObject(object) {
        if (!object || !object.object) {
            return object;
        }

        const str = object.object.split(' ');
        object.tag = str[0];
        object.attributes = {};

        for (let i = 1; i < str.length; ++i) {
            if (!str[i].length) {
                continue;
            }

            let [currentPropName, currentPropValue] = str[i].split('=');
            if (currentPropName === 'class') {
                object.attributes[currentPropName] = [];
                currentPropValue = currentPropValue.slice(1, currentPropValue.length);
                while (currentPropValue[currentPropValue.length - 1] !== '"') {
                    if (currentPropValue.length) {
                        object.attributes[currentPropName].push(currentPropValue);
                    }
                    currentPropValue = str[++i];
                }
                object.attributes[currentPropName].push(currentPropValue.slice(0, -1));
            } else {
                object.attributes[currentPropName] = currentPropValue.slice(1, -1);
            }
        }

        if (!object.children.length) {
            return object;
        }

        object.children.forEach((obj) => this.performObject(obj));
    }

    objectToElement(object) {
        let component = this.tagToComponent[object['tag']];
        component.setAttrs(object.attributes);
        if (object.attributes.class) {
            object.attributes.class.forEach((item) => {
                component.addClass(item);
            });
        }

        let element = document.createElement('div');
        element.innerHTML = component.getClearHtml().innerHTML;
        console.log(element);

        object.children.forEach((item) => {
            element.lastChild.appendChild(this.objectToElement(item));
        });

        return element;
    }

    getHtmlElement(template, tagName = 'div') {
        let html = document.createElement(tagName);
        this.stringToObject(template);

        console.log(this.objectToElement(this.objects[0]).innerHTML);
        html.appendChild(this.objectToElement(this.objects[0]));

        return html;
    }

    stringToObject(input) {
        this.parseHtml(input);
        this.objects.map((obj) => this.performObject(obj));

        return this.objects;
    }
}

const htmlParser = new HtmlParser();

