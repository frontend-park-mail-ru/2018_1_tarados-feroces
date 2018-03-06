'use strict';

(function() {

    class HtmlParser {

        constructor() {
            this.regExp = /<[a-z0-9 _\-"'=(){}\[\],;:.!?]+>|<\/[a-z0-9 _\-"'=(){}\[\],;:.!?]+>/ig;
            this.regExpBegin = /<([a-z0-9 _\-"'=(){}\[\],;:.!?]+)>/i;
            this.objects = [];
            this.tagStack = [];

            this.componentFactory = {
                Button: () => new Button(),
                Input: () => new Input(),
                Header: () => new Header(),
                MenuPoint: () => new MenuPoint(),
                Form: () => new Form(),
                Footer: () => new Footer(),
                div: () => new StandartComponent(),
                a: () => new StandartComponent(),
                p: () => new StandartComponent(),
                ul: () => new StandartComponent(),
                table: () => new StandartComponent(),
                tr: () => new StandartComponent(),
                th: ()=> new StandartComponent(),
                td: ()=> new StandartComponent(),
            };
        }

        handleCloseTag() {
            const obj = this.tagStack.pop();
            if (this.tagStack.length === 0) {
                this.objects.push(obj);
                return;
            }

            this.tagStack[this.tagStack.length - 1].children.push(obj);
        }

        handleOpenTag(tag) {
            const obj = {
                object: tag.slice(1, -1),
                children: [],
            };

            this.tagStack.push(obj);
        }

        handleTag(tag) {
            const result = this.regExpBegin.exec(tag);
            result ? this.handleOpenTag(tag) : this.handleCloseTag(tag);
        }

        parseHtml(input) {
            let compareResult = '';
            let previousIndex = 0;
            input = input.replace(/\n/g, ' ');
            while (compareResult = this.regExp.exec(input)) {
                if (previousIndex < compareResult.index) {
                    if (this.tagStack.length) {
                        this.tagStack[this.tagStack.length - 1].text = input.slice(previousIndex, compareResult.index);
                    }
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
            object.attributes.text = object.text;
            object.attributes.tag = object.tag;

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

        getHTML(template) {
            this.stringToObject(template);
            const html = document.createElement('div');
            this.objects.forEach((item) => html.appendChild(this.getElement(item)));
            this.objects = [];
            return html;

        }

        stringToObject(input) {
            this.parseHtml(input);
            this.objects.map((obj) => this.performObject(obj));

            return this.objects;
        }

        getElement(object) {
            const component = this.componentFactory[object.tag]();
            component.render(object.attributes);

            object.children.forEach((item) => {
                if (item) {
                    component.appendChild(this.getElement(item));
                }
            });

            return component.element();
        }
    }

    window.htmlParser = new HtmlParser();
})();
