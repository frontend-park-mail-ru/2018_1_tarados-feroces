(function() {
    'use strict';

    class Image extends BaseComponent {

        render(context) {
            this.template = `<img class="{{class}}" src="{{src}}">`;
            super.render(context);
        }
    }

    window.Image = Image;
})();
