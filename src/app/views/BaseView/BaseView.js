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
      
        __render() {
            this.element = htmlParser.getHTML(templateManager.getHTML(this.context, this.render()));
            return this.element;
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
    }

    window.BaseView = BaseView;
})();
