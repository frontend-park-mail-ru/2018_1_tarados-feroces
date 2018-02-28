'use strict';

const router = new Router();

const loginCallback = () => {
    httpModule.doPost({url: 'http://deadlinez.herokuapp.com/alexalone/signup', callback: (err, data) => {
        if (err) {
            alert(err);
            return;
        }

        alert(data.message);
        }, data: {
        name: 'Jopa',
        email: 'lolkek',
        password: 'pass1234',
        login: '_turboback'}});
};

router
    .addUrl(
        '/login/',
        new LoginView(),
        loginCallback)
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
        new LeaderboardView(leaderboardContent)
    );

router.go(document.location.pathname);
