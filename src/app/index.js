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

router.go(document.location.pathname);
