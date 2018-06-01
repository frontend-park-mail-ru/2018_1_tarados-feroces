
const urls = [
    '/',
    '/me/',
    '/login/',
    '/signup/',
    '/single/',
    '/multi/',
    '/settings/',
    '/promo/',

    '/bundle.js',
    '/vendor.bundle.js',
    '/style.css',

    '/29df47777d9c742d3c3a8a8c126a96d1.jpg',
    '/static/imgs/add.png',
    '/static/imgs/arena-back.png',
    '/static/imgs/back.png',
    '/static/imgs/background.jpg',
    '/static/imgs/coins.png',
    '/static/imgs/dark.png',
    '/static/imgs/Deadlinez.png',
    '/static/imgs/dragon.jpg',
    '/static/imgs/favicon.ico',
    '/static/imgs/leave.png',
    '/static/imgs/logo.jpg',
    '/static/imgs/logout.png',
    '/static/imgs/menu.png',
    '/static/imgs/money.png',
    '/static/imgs/newBack.jpg',
    '/static/imgs/party-plus.png',
    '/static/imgs/points.png',
    '/static/imgs/search.png',
    '/static/imgs/settings.png',
    '/static/imgs/test3.png',
    '/static/imgs/user-logo.jpg',
    '/static/test7.mp4'
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
        // return fetch(event.request);
        return;
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
