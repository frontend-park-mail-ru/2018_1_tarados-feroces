'use strict';
import userService from './modules/UserService/UserService'
import router from './modules/Router/Router'
import LoginView from './views/LoginView/LoginView'
import MenuView from './views/MenuView/MenuView'
import RegisterView from './views/RegisterView/RegisterView'
import AuthorizedView from './views/AuthorizedView/AuthorizedView'
import SettingsView from './views/SettingsView/SettingsView'
import LeaderboardView from './views/LeaderboardView/LeaderboardView'

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
    )
    .addUrl(/settings/,
        new SettingsView());

if (userService.isAuthorized === undefined) {
    userService.checkSession()
    .then(
        (response) => router.go(document.location.pathname),
        (reject) => router.go(document.location.pathname)
    );
} else {
    router.go(document.location.pathname);
}

