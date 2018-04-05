import htmlParser from '../../modules/HtmlParser/HtmlParser'
import templateManager from '../../modules/TemplateManager/TemplateManager'

/**
 * Базовый класс вьюх
 * @module BaseView
 */
export default class BaseView {

    /**
     * @constructor
     */
    constructor() {
        this.element = null;
        this.context = {};
    }

    /**
     * Получает параметры шаблона для вьюхи
     * @return {Promise<any>}
     */
    preRender() {
        return new Promise((resolve, reject) => resolve({}));
    }

    /**
     * Возвращает шаблон вьюхи
     * @return {template}
     */
    render() {
       return this.template(this.context);
    }

    /**
     * Удаляет элемент вьюхи из DOM
     * @return {Node}
     */
    deleteElement() {
        if (this.element) {
            const parent = this.element.parentNode;
            parent.removeChild(this.element);
            return parent;
        }
    }

    /**
     * Сообщает, нужна ли авторизация для отрисовки вьюхи
     * @return {boolean}
     */
    needAuthorization() {
        return true;
    }

    needUpdate() {
        return false;
    }

    /**
     * Обновляет контекст вьюхи согласно новому контескту
     * @param {Object} context
     * @return {null}
     */
    update(context = {}) {
        return null;
    }

    /**
     * Скрывает элемент вью
     */
    hide() {
        if (this.element) {
            this.element.classList.add('hidden');
        }
    }

    /**
     * Показывает элемент вью
     */
    show() {
        if (this.element) {
            this.element.classList.remove('hidden');
        }
    }

    /**
     * Получает DOM-элемент вью
     * @return {Node}
     */
    __render() {
        this.element = htmlParser.getHTML(this.render());
        return this.element;
    }
}
