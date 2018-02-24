'use strict';

const router = new Router();

const context = {rows: [['Toha', 'rus', '100'], ['Sanya', 'uzb', '1']], headers: ['Name', 'Region', 'Score']};

router
    .addUrl(
        '/login/',
        new LoginView())
    .addUrl(
        '/',
        new MenuView())
    .addUrl(
        '/signup/',
        new RegisterView())
    .addUrl(/leaderboard/,
        new LeaderboardView(context));

router.go(document.location.pathname);
