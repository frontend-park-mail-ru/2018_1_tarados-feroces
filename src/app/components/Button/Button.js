'use strict';

(function() {

    class Button extends BaseComponent {

        constructor() {
            super(buttonTemplate);
        }
    }

    const buttonTemplate = '<div class="button {{class}}"><p>{{text}}</p></div>';

    window.Button = Button;
})();
