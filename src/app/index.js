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

router.go(document.location.pathname);
