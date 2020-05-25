const statisAssets = [
    './',
    '/style.css',
    './app.js',
];

self.addEventListener('install', event =>{
    const cache = await caches.open('news-static');
    cache.addAll(statisAssets);
});

self.addEventListener('fetch', event =>{
    const req = event.request;
    const url = new URL(req.url);

    if(url.origin === location.origin) {
        event.respondWith(cacheFirst(req));
    } else {
        event.respondWith(networkFirst(req));
    }
});

async function cacheFirst(req) {
    const cachedResponse = await caches.match(req);
    return cachedResponse || fetch(req);
}


