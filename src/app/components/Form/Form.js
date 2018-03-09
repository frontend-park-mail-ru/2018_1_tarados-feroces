(function() {
    'use strict';

    class Form extends BaseComponent {

        render(context) {
            this.template = `<form method="{{method}}"></form>`;
            super.render(context);
        }
    }

    window.Form = Form;
})();
