(function() {
    'use strict';

    class StandartComponent extends BaseComponent {

        render(context) {
            this.template = `<{{tag}} class="{{class}}">{{text}}</{{tag}}>`;
            super.render(context);
        }
    }

    window.StandartComponent = StandartComponent;
})();
