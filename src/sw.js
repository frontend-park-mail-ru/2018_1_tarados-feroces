
const urls = [
    '/',
    '/login/',
    '/signup/',
    '/user/',
    '/game/',
    '/leaderboard/',
    '/settings/',

    '/bundle.js',
    '/style.css',

    '9b3c39fc3d8868e0498c2d59c06bc6b2.png',
    'b889a0c49f306abc0bf115bc6a640c1b.jpg',
    'imgs/add.png',
    'imgs/back.png',
    'imgs/background.jpg',
    'imgs/coins.png',
    'imgs/Deadlinez.png',
    'imgs/dragon.jpg',
    'imgs/friend-action.png',
    'imgs/logout.png',
    'imgs/mainAvatar.jpg',
    'imgs/menu.png',
    'imgs/money.png',
    'imgs/party-plus.png',
    'imgs/points.png',
    'imgs/settings.svg',
    'imgs/snowflake.png',
    'imgs/snowflake3.png',
    'imgs/user-logo.jpg'
];

this.addEventListener('install', (event) => {
    console.log('SW installed');
    event.waitUntil(
        caches.open('DEADLINEZ_CACHE')
        .then((cache) => {
            console.log('Adding urls...');
            return cache.addAll(urls);
        })
        .catch((error) => {
            console.log(error);
        })
    );
});

this.addEventListener('fetch', (event) => {
    if (navigator.onLine) {
        return fetch(event.request);
    }

    event.respondWith(
            caches.match(event.request)
                .then((cache) => {
                    if (cache) {
                        return cache;
                    }

                    return fetch(event.request);

                })
                .catch((error) => console.log('WTF', error)));

});
