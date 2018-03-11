'use strict';

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

