/** Базовый класс компоненты
 * @module BaseComponent
 */
export default class BaseComponent {
    /**
     * @param {string} [template] - шаблон компоненты
     * @constructor
     */
    constructor(template) {
        this._element = null;
        this.template = template;
        // this.events = ['click', 'focus', 'blur', 'change'];
        this.functionExp = /\s*\(([\w, ]*)\)\n*\t*\s*{(.*)}/i;
    }

    /**
     * Создание элемента по шаблона с контекстом
     * @param {object} context - контекст шаблона
     */
    render(context) {
        const div = document.createElement('div');
        div.innerHTML = this.template(context);
        this._element = div.lastChild;
        // this.addListeners(context);
    }

    /**
     * Добавление дочерней компоненты
     * @param {BaseComponent} component
     */
    appendChild(component) {
        this._element.appendChild(component);
    }

    /**
     * Возращает элемент компоненты
     * @return {HTMLElement}
     */
    element() {
        return this._element;
    }

    /**
     * Добавление обработчиков событий
     * @param {object} context
     */
    // addListeners(context) {
    //     this.events.forEach((item) => {
    //         if (context[item]) {
    //             const func = context[item].match(this.functionExp);
    //             this._element.addEventListener(item, new Function(func[1], func[2]));
    //         }
    //     });
    // }
}
