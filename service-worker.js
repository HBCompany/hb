const cacheName = 'cache-v1';
const precacheResources = [
    '/',
    'index.html',
    'sing-in.html',
    'sing-up.html',
    'head-menu.html',
    'css/style.css',
    'css/sing-in.css',
    'css/head-menu.css',
    'img/logo.png'

];

self.addEventListener('install', event => {
    console.log('Service worker install event!');
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(precacheResources);
            })
    );
});

self.addEventListener('activate', event => {
    console.log('Service worker activate event!');
});


/*self.addEventListener('fetch', event => {
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    console.log('Found ', event.request.url, ' in cache');
                    return response;
                }
                console.log('Network request for ', event.request.url);
                return fetch(event.request)

                // TODO 4 - Add fetched files to the cache

            }).catch(error => {

            // TODO 6 - Respond with custom offline page

        })
    );
});*/

self.addEventListener('fetch',event => {
    event.respondWith(
        caches.match(event.request)
            .then(function (res) {
                    if (res) {
                        return res;
                    } else {
                        return fetch(event.request);
                    }
                })
    );
});
