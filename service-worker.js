const cacheName = 'cache_proverka';
const precacheResources = [
    '/',
    'index.html',
    'manifest.json',
    'sing-in.html',
    'sing-up.html',
    'head-menu.html',
    'question.html',
    'setting.html',
    'rutina_new.html',
    'work_week_new.html',
    'pred_zone.html',
    'zone.html',
    'menu_report.html',
    'answer.html',
    'account.html',
    '404.html',
    'css/style.css',
    'css/sing-in.css',
    'css/head-menu.css',
    'css/question.css',
    'css/setting.css',
    'css/rutina_new.css',
    'css/work_week_new.css',
    'css/pred_zone.css',
    'css/zone.css',
    'css/menu_report.css',
    'css/answer.css',
    'css/account.css',
    'css/404.css',
    'js/sing-up.js',
    'js/head-menu.js',
    'js/instr.js',
    'js/modal.js',
    'js/pred_zone.js',
    'js/question.js',
    'js/rutina_new.js',
    'js/setting.js',
    'js/sing.js',
    'js/zone.js',
    'fonts/Montserrat-Light.ttf',
    'img/logo.png',
    'img/double-left.png',
    'img/instr.png',
    'img/setting.png',
    'img/slider-arrow.png',
    'img/smile.png'
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


self.addEventListener('fetch', event => {
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

                    .then(response => {
                        // TODO 5 - Respond with custom 404 page
                        return caches.open(сacheName).then(cache => {
                            cache.put(event.request.url, response.clone());
                            return response;
                        });
                    });
            }).catch(error => {

            // TODO 6 - Respond with custom offline page

        })
    );
});

/*self.addEventListener('fetch',event => {
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
});*/
