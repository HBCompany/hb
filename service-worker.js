/*const cacheName = 'cache_proverka';
const precacheResources = [
    '/',
    'index.html',
    'manifest.json',
    'sing-in.html?',
    'sing-up.html?',
    'head-menu.html',
    'question.html',
    'setting.html',
    'rutina_new.html?',
    'work_week_new.html',
    'pred_zone.html?',
    'zone.html?',
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
    console.log('Activating new service worker...');

    const cacheWhitelist = [cacheName];

    event.waitUntil(
        caches.keys().then(cacheName => {
            return Promise.all(
                cacheName.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
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

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('video-store').then(function(cache) {
            return cache.addAll([
                'index.html',
                'manifest.json',
                'sing-in.html?',
                'sing-up.html?',
                'head-menu.html',
                'question.html',
                'setting.html',
                'rutina_new.html?',
                'work_week_new.html',
                'pred_zone.html?',
                'zone.html?',
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
            ]);
        })
    );
});

self.addEventListener('fetch', function(e) {
    console.log(e.request.url);
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});
/*comments*/