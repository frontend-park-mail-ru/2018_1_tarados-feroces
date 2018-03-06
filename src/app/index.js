'use strict';

import router from './modules/Router/Router.js';
import LoginView from './views/LoginView/LoginView.js';
import MenuView from './views/MenuView/MenuView.js';
import RegisterView from './views/RegisterView/RegisterView.js';
import AuthorizedView from './views/AuthorizedView/AuthorizedView.js';
import LeaderboardView from './views/LeaderboardView/LeaderboardView.js';


router
    .addUrl(
        '/login/',
        new LoginView()
    )
    .addUrl(
        '/',
        new MenuView()
    )
    .addUrl(
        '/signup/',
        new RegisterView()
    )
    .addUrl(
        '/user/',
        new AuthorizedView()
    )
    .addUrl(/leaderboard/,
        new LeaderboardView()
    );

router.go(document.location.pathname);
