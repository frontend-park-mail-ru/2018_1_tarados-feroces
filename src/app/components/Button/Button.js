(function() {
    'use strict';

    class Button extends BaseComponent {

        render(context) {
            this.template = `<div class="button {{class}}"><p>{{text}}</p></div>`;
            super.render(context);
        }
    }

    window.Button = Button;
})();
