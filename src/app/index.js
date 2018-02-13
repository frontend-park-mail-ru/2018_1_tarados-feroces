'use strict';

const router = new Router();

router.setUrlToTemplate('/login/', 'login-template', 'login-block');
router.setUrlToTemplate('/auth/', 'authorized-template');

router.go(document.location.pathname);

