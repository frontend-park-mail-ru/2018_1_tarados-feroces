import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import Header from '../../components/Header/Header'
import MenuPoint from '../../components/MenuPoint/MenuPoint'
import Menu from '../../components/Menu/Menu'
import Form from '../../components/Form/Form'
import Footer from '../../components/Footer/Footer'
import Image from '../../components/Image/Image'
import Trailer from '../../components/Trailer/Trailer'
import Label from '../../components/Label/Label'
import StandartComponent from '../../components/StandartComponent/StandartComponent'


/** Класс для парсинга html тэгов
 * @module HtmlParser
 */
class HtmlParser {

    /**
     * @constructor
     */
    constructor() {
        this.regExp = /<[a-z0-9 _\-"'=(){}\[\],;:.@!?\/+]+>|<\/[a-z0-9 _\-"'=(){}\[\],;:.@!?]+>/ig;
        this.regExpEnd = /<\/[a-z0-9 _\-"'=(){}\[\],;:.@!?]+>/i;
        this.objects = [];
        this.tagStack = [];

        this.componentFactory = {
            Button: () => new Button(),
            Input: () => new Input(),
            Header: () => new Header(),
            MenuPoint: () => new MenuPoint(),
            Menu: () => new Menu(),
            Form: () => new Form(),
            Footer: () => new Footer(),
            Image: () => new Image(),
            Trailer: () => new Trailer(),
            Label: () => new Label(),
            div: () => new StandartComponent(),
            a: () => new StandartComponent(),
            p: () => new StandartComponent(),
            img: () => new StandartComponent(),
            ul: () => new StandartComponent(),
        };
    }

    /**
     * Возвращает отрендеренный HTMLElement
     * @param {string} template - шаблон для парсинга
     * @return {HTMLDivElement}
     */
    getHTML(template) {
        this.stringToObject(template);
        const html = document.createElement('div');
        this.objects.forEach((item) => {
            if (item) {
                html.appendChild(this.getElement(item));
            }
        });
        this.objects = [];
        return html;

    }

    /**
     * Обрабатывает закрывающие тэги
     */
    handleCloseTag() {
        const obj = this.tagStack.pop();
        if (this.tagStack.length === 0) {
            this.objects.push(obj);
            return;
        }

        this.tagStack[this.tagStack.length - 1].children.push(obj);
    }

    /**
     * Обрабатывает открывающий тэг
     * @param {string} tag - входной тэг
     */
    handleOpenTag(tag) {
        const obj = {
            object: tag.slice(1, -1),
            children: [],
        };

        this.tagStack.push(obj);
    }

    /**
     * Обрабатывает тэг
     * @param {string} tag - входной тэг
     */
    handleTag(tag) {
        const result = this.regExpEnd.exec(tag);
        result ? this.handleCloseTag(tag) : this.handleOpenTag(tag);
    }

    /**
     * Парсит строку шаблона по руглярным выражениям
     * @param {string} input - входной шаблон
     */
    parseHtml(input) {
        // debugger;
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

    /**
     * Добавляет свойства элементу объекта после парснга
     * @param {object} object - объект после парсинга
     */
    setObjectAttributes(object) {
        const str = object.object.split(' ');
        object.tag = str[0];
        object.attributes = {};
        object.attributes.text = object.text;
        object.attributes.tag = object.tag;

        let currentProp = '';
        const propExp = /([\w-_]+)="([^"]*)"/gi;
        while (currentProp = propExp.exec(object.object)) {
            object.attributes[currentProp[1]] = currentProp[2];
        }
    }

    /**
     * Обрабатывает объект после парсинга
     * @param {object} object - объект после парсинга
     * @return {object}
     */
    performObject(object) {
        if (!object || !object.object) {
            return object;
        }

        this.setObjectAttributes(object);

        if (!object.children.length) {
            return object;
        }

        object.children.forEach((obj) => this.performObject(obj));
    }

    /**
     * Парсит и возвращает готовый массив элементов
     * @param {string} input - входной шаблон
     * @return {Array}
     */
    stringToObject(input) {
        this.parseHtml(input);
        this.objects.map((obj) => this.performObject(obj));

        return this.objects;
    }

    /**
     * Возвращает элемент компоненты по тэгу
     * @param {object} object
     * @return {HTMLElement}
     */
    getElement(object) {
        const component = this.componentFactory[object.tag]();
        component.render(object.attributes);

        object.children.forEach((item) => component.appendChild(this.getElement(item)));

        return component.element();
    }
}

const htmlParser = new HtmlParser();
export default htmlParser;

