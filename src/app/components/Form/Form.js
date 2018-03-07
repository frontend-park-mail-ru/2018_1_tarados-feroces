(function() {
    'use strict';

    class Form extends BaseComponent {

        constructor() {
            super(formTemplate);
        }
    }

    const formTemplate = '<form method="{{method}}"></form>';

    window.Form = Form;
})();
