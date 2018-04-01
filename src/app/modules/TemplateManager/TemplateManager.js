/**
 * Класс для работы с шаблонами
 * @module TemplateManager
 */
class TemplateManager {

    /**
     * @param {string} templateId - шаблон
     * @constructor
     */
    constructor(templateId = '') {
        if (!templateId) {
            return;
        }

        this.changeTemplate(templateId);
    }

    /**
     * Возвращает отрендеренный шаблон
     * @param {object} context - контекст шаблона
     * @param {string} templateId - шаблон
     * @return {*}
     */
    getHTML(context, templateId) {
        if (templateId) {
            this.changeTemplate(templateId);
        }
        return this.template(context);
    }

    /**
     * Компиляция шаблона
     * @param {string} templateId - шаблон
     */
    changeTemplate(templateId) {
        this.template = Handlebars.compile(templateId);
    }
}

const templateManager = new TemplateManager();
export default templateManager;
