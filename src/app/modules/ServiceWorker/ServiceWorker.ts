export default function serviceWorkerRegister() {
    if ('serviceWorker' in navigator) {
        console.log('Trying to install SW...');
        navigator.serviceWorker.register('/sw.js', {scope: '/'})
            .then((registration) => {
                console.log('success register of SW: ', registration);
            })
            .catch((error) => {
                console.log('Registration FAILED: ', error);
            });
    }
};