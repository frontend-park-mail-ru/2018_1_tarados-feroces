(function() {
    'use strict';

    class Image extends BaseComponent {

        constructor() {
            super(imageTemplate);
        }
    }

    const imageTemplate = '<img class="{{class}}" src="{{source}}"></img>';

    window.Image = Image;
})();
