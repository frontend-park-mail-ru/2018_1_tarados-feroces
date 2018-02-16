'use strict';

class HtmlParser {
    constructor() {
        this.regExp = /<[a-z0-9 _\-"=(){}]+>|<\/[a-z0-9 _\-"=(){}]+>/ig;
        this.regExpBegin = /<([a-z0-9 _\-"=(){}]+)>/i;
        this.parsedHtml = [];
        this.tagStack = [];

        this.tagToComponent = {
            Button: button,
        };
    }

    handleCloseTag() {
        let obj = this.tagStack.pop();
        if (this.tagStack.length === 0) {
            this.parsedHtml.push(obj);
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

    parseObject(object) {
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

        object.children.forEach((obj) => this.parseObject(obj));
    }

    getHtmlObject(object) {
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
            element.appendChild(this.getHtmlObject(item));
        });

        return element;
    }

    getHtml(template) {
        let html = document.createElement('div');
        this.parse(template);

        console.log(this.getHtmlObject(this.parsedHtml[0]).innerHTML);
        html.appendChild(this.getHtmlObject(this.parsedHtml[0]));

        return html;
    }
    parse(input) {
        this.parseHtml(input);
        this.parsedHtml.map((obj) => this.parseObject(obj));

        return this.parsedHtml;
    }
}

const htmlParser = new HtmlParser();

// const testStr = '<a class="login-block cool" id="kk">abc<b><c class="login-block"></c></b><d><f></f></d><e></e></a>';
// const parser = new HtmlParser();
//
// parser.parse(testStr);
//
// console.log(parser.parsedHtml);
