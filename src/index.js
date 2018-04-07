'use strict';
import userService from './app/modules/UserService/UserService';
import router from './app/modules/Router/Router';
import serviceWorkerRegister from './app/modules/ServiceWorker/ServiceWorker';

import LoginView from './app/views/LoginView/LoginView';
import MainPageView from './app/views/MainPageView/MainPageView';
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
    .addUrl(/leaderboard/,
        new LeaderboardView(),
        'modal-data'
    )
    .addUrl(/settings/,
        new SettingsView()
    );

// debugger;

if (userService.isAuthorized === undefined) {

    router.showLoading();
    userService.checkSession()
    .then(
        (response) => {
            router.go(document.location.pathname);
            router.hideLoading();
        },
        (reject) => {
            router.go(document.location.pathname);
            router.hideLoading();
            }
    );
} else {
    router.go(document.location.pathname);
}

