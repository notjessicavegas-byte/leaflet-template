const CACHE_NAME = 'leaflet-pwa-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/main.js',
    '/js/map.js',
    '/js/pwa.js',
    '/data/pois.json',
    '/manifest.json'
];

self.addEventListener('install', (event) => {
    // Pre-cache static resources
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('fetch', (event) => {
    // SPECIFIC RULE: Do not attempt to cache map tiles in the Service Worker.
    // They rely strictly on standard browser caching/network.
    if (event.request.url.includes('tile.openstreetmap.org') || event.request.url.includes('unpkg.com/leaflet')) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        })
    );
});
