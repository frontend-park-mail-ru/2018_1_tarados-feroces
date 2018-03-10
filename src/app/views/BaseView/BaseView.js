(function() {
    'use strict';

    class BaseView {

        constructor() {
            this.element = null;
            this.context = {};
        }

        preRender() {
            return new Promise((resolve, reject) => resolve({}));
        }

        render() {
           return '';
        }

        needAuthorization() {
            return true;
        }

        update(context = {}) {
            return null;
        }

        hide() {
            if (this.element) {
                this.element.classList.add('hidden');
            }
        }

        show() {
            if (this.element) {
                this.element.classList.remove('hidden');
            }
        }

        __render() {
            this.element = htmlParser.getHTML(templateManager.getHTML(this.context, this.render()));
            return this.element;
        }
    }

    window.BaseView = BaseView;
})();
