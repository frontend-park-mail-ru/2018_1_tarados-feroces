'use strict';
import userService from './app/modules/UserService/UserService';
import router from './app/modules/Router/Router';
import serviceWorkerRegister from './app/modules/ServiceWorker/ServiceWorker';

import LoginView from './app/views/LoginView/LoginView';
import MainPageView from './app/views/MainPageView/MainPageView';
import GameView from './app/views/GameView/GameView';
import RegisterView from './app/views/RegisterView/RegisterView';
import AuthorizedView from './app/views/AuthorizedView/AuthorizedView';
import SettingsView from './app/views/SettingsView/SettingsView';
import LeaderboardView from './app/views/LeaderboardView/LeaderboardView';

serviceWorkerRegister();

router
    .addUrl(
        '/login/',
        new LoginView()
    )
    .addUrl(
        '/',
        new MainPageView()
    )
    .addUrl(
        '/signup/',
        new RegisterView()
    )
    .addUrl(
        '/user/',
        new AuthorizedView()
    )
    .addUrl(
        '/game/',
        new GameView()
    )
    .addUrl(
        '/leaderboard/',
        new LeaderboardView(),
        'modal-data'
    )
    .addUrl(
        '/settings/',
        new SettingsView()
    );

userService.checkSession()
    .then(
        (resolve) => {
            router.go(document.location.pathname);
        },
        (reject) => {
            console.log('error');
            router.go(document.location.pathname);
        }
    );

