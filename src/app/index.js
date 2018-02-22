'use strict';

const router = new Router();

router
    .addUrl(
        '/login/',
        new LoginView());
    // .addUrl(
    //     '/auth/',
    //     new BaseComponent('div', templateManager.getHTML({}, authorizedTemplate)))
    // .addUrl(
    //     '/test/',
    //     new Button(templateManager.getHTML({className: 'registrationButton', text: 'lol'}, buttonTemplate)));

router.go(document.location.pathname);

