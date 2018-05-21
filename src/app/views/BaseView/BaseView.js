import htmlParser from '../../modules/HtmlParser/HtmlParser';
import router from '../../modules/Router/Router';

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
        // this.router = router.bind(this);
    }

    /**
     * Получает параметры шаблона для вьюхи
     * @return {Promise<any>}
     */
    preRender() {
        return new Promise((resolve, reject) => resolve({}));
    }

    getDOMDependensies() {
        return true;
    }

    setContext() {
        this.context = {}
    }

    /**
     * Возвращает шаблон вьюхи
     *
     */
    render() {
        this.template = null;
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
        this.render();
        this.setContext();
        this.element = htmlParser.getHTML(this.template(this.context));
        return this.element;
    }
}
