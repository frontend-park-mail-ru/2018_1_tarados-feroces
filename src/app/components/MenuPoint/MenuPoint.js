(function() {
    'use strict';

    class MenuPoint extends BaseComponent {

        render(context) {
            this.template = `<li><a href="{{href}}">{{text}}</a></li>`;
            super.render(context);
        }
    }

    window.MenuPoint = MenuPoint;
})();
