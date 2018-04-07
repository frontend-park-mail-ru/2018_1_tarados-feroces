const urls = [
    '/',

    '/dist/bundle.js',
    '/dist/style.css',

    '/dist/9b3c39fc3d8868e0498c2d59c06bc6b2.png',
    '/dist/b889a0c49f306abc0bf115bc6a640c1b.jpg',
    '/dist/images/add.png',
    '/dist/images/back.png',
    '/dist/images/background.jpg',
    '/dist/images/coins.png',
    '/dist/images/Deadlinez.png',
    '/dist/images/dragon.jpg',
    '/dist/images/friend-action.png',
    '/dist/images/logout.png',
    '/dist/images/mainAvatar.jpg',
    '/dist/images/menu.png',
    '/dist/images/money.png',
    '/dist/images/party-plus.png',
    '/dist/images/points.png',
    '/dist/images/settings.svg',
    '/dist/images/snowflake.png',
    '/dist/images/snowflake3.png',
    '/dist/images/user-logo.jpg'
];

this.addEventListener('install', (event) => {
    console.log('SW installed');
    event.waitUntil(
        caches.open('DEADLINEZ_CACHE')
        .then((event) => {
            console.log('Adding urls...');
            return caches.addAll(urls);
        })
        .catch((error) => {
            console.log(error);
        })
    );
});

this.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request)
        .then((cache) => {
            if (cache) {
                return cache;
            }

            return fetch(event.request);

        }));
});
