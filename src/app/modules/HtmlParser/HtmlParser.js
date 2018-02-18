'use strict';

class HtmlParser {
    constructor() {
        this.regExp = /<[a-z0-9 _\-"=(){};.]+>|<\/[a-z0-9 _\-"=(){};.]+>/ig;
        this.regExpBegin = /<([a-z0-9 _\-"=(){};.]+)>/i;
        this.objects = [];
        this.tagStack = [];

        this.componentFactory = {
            Button: () => new Button(),
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
        input = input.replace('\n', '');
        console.log(input);
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
            let currentPos = i;

            while (str[currentPos][str[currentPos].length - 1] !== '"') {
                currentPos++;
            }

            const newValues = str.slice(i + 1, currentPos + 1);
            const spaceBetween = newValues.length ? ' ' : '';
            currentPropValue += spaceBetween + newValues.join(' ');
            i = currentPos;

            object.attributes[currentPropName] = currentPropValue.slice(1, -1);
        }

        if (!object.children.length) {
            return object;
        }

        object.children.forEach((obj) => this.performObject(obj));
    }

    getHtml(template) {
        this.stringToObject(template);
        let html = '';
        this.objects.forEach((item) => html += this.objectToHtmlString(item));
        return html;
    }

    stringToObject(input) {
        this.parseHtml(input);
        console.log(this.objects[0].children);
        this.objects.map((obj) => this.performObject(obj));

        return this.objects;
    }

    objectToHtmlString(object) {
        object.attributes.children = '';

        object.children.forEach((item) => {
            object.attributes.children += this.objectToHtmlString(item);
        });

        const component = this.componentFactory[object.tag]();
        console.log(object.attributes);
        return component.render(object.attributes);
    }
}

const htmlParser = new HtmlParser();
