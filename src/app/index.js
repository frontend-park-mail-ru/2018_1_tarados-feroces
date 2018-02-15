'use strict';

const router = new Router();

// const loginComponent = new BaseComponent('div', templateManager.getHTML({}, loginTemplate));

// loginComponent.hide();


router.addUrl(
    '/login/',
    new BaseComponent('div', templateManager.getHTML({}, loginTemplate)),
    document.querySelector('.root')
);

router.addUrl(
    '/auth/',
    new BaseComponent('div', templateManager.getHTML({}, authorizedTemplate)),
    document.querySelector('.root'));

router.go(document.location.pathname);
