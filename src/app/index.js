'use strict';

const router = new Router();

router
    .addUrl(
        '/login/',
        new BaseComponent('div', templateManager.getHTML({}, loginTemplate)))
    .addUrl(
        '/auth/',
        new BaseComponent('div', templateManager.getHTML({}, authorizedTemplate)));

router.go(document.location.pathname);
