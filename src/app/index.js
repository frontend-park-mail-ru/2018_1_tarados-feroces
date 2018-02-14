'use strict';

const router = new Router();

router.addUrl('/login/', loginTemplate, document.querySelector('.root'));
router.addUrl('/auth/', authorizedTemplate, document.querySelector('.root'));

router.go(document.location.pathname);
