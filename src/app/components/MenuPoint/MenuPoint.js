'use strict';

(function() {

    class MenuPoint extends BaseComponent {

        constructor() {
            super(menuPointTemplate);
        }
    }

    const menuPointTemplate = '<li><a href="{{href}}">{{text}}</a></li>';

    window.MenuPoint = MenuPoint;
})();
