'use strict';
import userService from './modules/UserService/UserService';
import router from './modules/Router/Router';
import LoginView from './views/LoginView/LoginView';
import MainPageView from './views/MainPageView/MainPageView';
import RegisterView from './views/RegisterView/RegisterView';
import AuthorizedView from './views/AuthorizedView/AuthorizedView';
import SettingsView from './views/SettingsView/SettingsView';
import LeaderboardView from './views/LeaderboardView/LeaderboardView';

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

userService.checkSession()
.then(
    () => router.go(document.location.pathname)
);
