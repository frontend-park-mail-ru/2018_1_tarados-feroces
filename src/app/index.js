'use strict';

const router = new Router();

router
    .addUrl(
        '/login/',
        new BaseComponent('div', templateManager.getHTML({attributes: 'class\=\"login-block__input-block\"'},
            loginTemplate)))
    .addUrl(
        '/auth/',
        new BaseComponent('div', templateManager.getHTML({}, authorizedTemplate)));

router.go(document.location.pathname);

