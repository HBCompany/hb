(function() {
    if (!('serviceWorker' in navigator)) {
        console.log('Service worker not supported');
        return;
    }
    navigator.serviceWorker.register('service-worker.js')
        .then(function(registration) {
            console.log('SW successfully registered');
        })
        .catch(function(error) {
            console.log('registration failed', error);
        });
})();


if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(reg => {

        // TODO 2.4 - Add 'options' object to configure the notification

        reg.showNotification('Hello world!');
    });
}