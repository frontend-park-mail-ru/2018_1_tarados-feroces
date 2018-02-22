'use strict';

const router = new Router();

router
    .addUrl(
        '/login/',
        new LoginView())
    .addUrl(
        '/menu/',
        new MenuView())
    .addUrl(
        '/signup/',
        new RegisterView());
    // .addUrl(
    //     '/auth/',
    //     new BaseComponent('div', templateManager.getHTML({}, authorizedTemplate)))
    // .addUrl(
    //     '/test/',
    //     new Button(templateManager.getHTML({className: 'registrationButton', text: 'lol'}, buttonTemplate)));

router.go(document.location.pathname);

