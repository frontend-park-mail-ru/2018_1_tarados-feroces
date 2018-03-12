(function() {
    'use strict';

    class Header extends BaseComponent {

        render(context) {
            this.template = `<div class="header {{class}}">
                                <h1>{{text}}</h1>
                             </div>`;
            super.render(context);
        }
    }

    window.Header = Header;
})();
