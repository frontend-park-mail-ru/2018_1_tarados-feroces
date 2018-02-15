'use strict';

const router = new Router();


router.addUrl('/login/', templateManager.getElement({}, loginTemplate), document.querySelector('.root'));
router.addUrl('/auth/', templateManager.getElement({}, authorizedTemplate), document.querySelector('.root'));

router.go(document.location.pathname);
