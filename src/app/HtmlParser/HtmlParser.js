'use strict';

class HtmlParser {
    constructor() {
        this.regExp = /<[a-z0-9 _\-"=(){}]+>|<\/[a-z0-9 _\-"=(){}]+>/ig;
        this.regExpBegin = /<([a-z0-9 _\-"=(){}]+)>/i;
// const regExpEnd = /<\/([a-z0-9 _\-"=(){}]+)>/i;

        this.parsedHtml = [];
        this.tagStack = [];
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
            toString: function() {
                return 'name: ' + this.object + '[' + this.children.forEach((item) => item) + ']';
            },
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
            console.log(compareResult[0]);
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
        object['tag'] = str[0];

        for (let i = 1; i < str.length; ++i) {
            const currentProp = str[i].split('=');
            object[currentProp[0]] = currentProp[1].slice(1, -1);
        }

        if (!object.children.length) {
            return object;
        }

        object.children.forEach((obj) => this.parseObject(obj));
    }

    parse(input) {
        this.parseHtml(input);
        this.parsedHtml.map((obj) => this.parseObject(obj));
    }
}

const testStr = '<a class="login-block">abc<b><c class="login-block"></c></b><d><f></f></d><e></e></a>';
const parser = new HtmlParser();

parser.parse(testStr);

console.log(parser.parsedHtml);
