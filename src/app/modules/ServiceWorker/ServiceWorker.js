export default function serviceWorkerRegistrate() {
    if (!Object.is(navigator.serviceWorker, undefined)) {
        navigator.serviceWorker.register('/ServiceWorker.js', {scope: '/'})
            .then((registration) => {
                console.log('success register of SW: ', registration);
            })
            .catch((error) => {
                console.log('Registration FAILED: ', error);
            });
    }
}
