
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
    'images/add.png',
    'images/back.png',
    'images/background.jpg',
    'images/coins.png',
    'images/Deadlinez.png',
    'images/dragon.jpg',
    'images/friend-action.png',
    'images/logout.png',
    'images/mainAvatar.jpg',
    'images/menu.png',
    'images/money.png',
    'images/party-plus.png',
    'images/points.png',
    'images/settings.svg',
    'images/snowflake.png',
    'images/snowflake3.png',
    'images/user-logo.jpg'
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
            .catch((error) => console.log(error))
    );
});
