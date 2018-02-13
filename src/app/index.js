'use strict';

const router = new Router();

window.addEventListener('popstate', () => {
    router.go(document.location.pathname);
});

router.addUrl('/login/', 'login-template', document.querySelector('.root'));
router.addUrl('/auth/', 'authorized-template', document.querySelector('.root'));

router.go(document.location.pathname);
