(function() {
    'use strict';

    class Image extends BaseComponent {

        constructor() {
            super(imageTemplate);
        }
    }

    const imageTemplate = '<img class="{{class}}" src="{{src}}">';

    window.Image = Image;
})();
