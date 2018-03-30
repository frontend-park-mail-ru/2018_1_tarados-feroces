(function() {
    'use strict';

    class LoadingView extends BaseView {

        render() {
            return `<Header>Loading...</Header>`;
        }
    }

    window.LoadingView = LoadingView;
})();
