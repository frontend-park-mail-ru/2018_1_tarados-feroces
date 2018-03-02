'use strict';

const router = new Router();

const signupCallback = () => {
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
            login: 'San'}});
};

const loginCallback = () => {
    httpModule.doPost({url: 'http://deadlinez.herokuapp.com/alexalone/signin', callback: (err, data) => {
            if (err) {
                alert(err);
                return;
            }

            alert(data.message);
        }, data: {
            password: 'pass1234',
            login: 'San'}});
};

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
        new RegisterView(),
        signupCallback
    )
    .addUrl(
        '/user/',
        new AuthorizedView()
    )
    .addUrl(/leaderboard/,
        new LeaderboardView()
    );

router.go(document.location.pathname);
