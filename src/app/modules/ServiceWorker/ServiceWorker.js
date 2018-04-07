export default function serviceWorkerRegister() {
    if (!Object.is(navigator.serviceWorker, undefined)) {
        console.log('SW not found. Trying to install...');
        navigator.serviceWorker.register('sw.js', {scope: '/'})
            .then((registration) => {
                console.log('success register of SW: ', registration);
            })
            .catch((error) => {
                console.log('Registration FAILED: ', error);
            });
    }
};
