(function() {
    'use strict';

    class Footer extends BaseComponent {

        render(context) {
            this.template = `<div class="footer"><p>{{text}}</p></div>`;
            super.render(context);
        }
    }

    window.Footer = Footer;
})();
