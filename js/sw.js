/*const staticCacheName = 'site-static';
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/css/style.css',
    '/img/setting.png'
];
self.addEventListener('install', evt => {
    //console.log('service worker has been installed');
    evt.waitUntil(
        caches.open(staticCacheName).then(cache=>{
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
});

self.addEventListener('activate', evt => {
    //console.log('service worker has been activated');
});

//fetch event
self.addEventListener('fetch', evt => {
    //console.log('fetch event',evt);
});const staticCacheName = 'site-static';
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/css/style.css',
    '/img/setting.png'
];
self.addEventListener('install', evt => {
    //console.log('service worker has been installed');
    evt.waitUntil(
        caches.open(staticCacheName).then(cache=>{
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
});

self.addEventListener('activate', evt => {
    //console.log('service worker has been activated');
});

//fetch event
self.addEventListener('fetch', evt => {
    //console.log('fetch event',evt);
});*/