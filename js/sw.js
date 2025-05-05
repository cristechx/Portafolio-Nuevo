const CACHE_NAME = 'portfolio-cache-v1';
const urlsToCache = [
  '/',
  '/css/main.css',
  '/css/animations.css',
  '/css/responsive.css',
  '/css/themes.css',
  '/js/app.js',
  '/js/cursor.js',
  '/js/scroll.js',
  '/js/mobile-nav.js',
  '/js/pwa.js',
  '/translations/languages.js',
  '/img/icon.png',
  '/img/Foto-Perfil.jpg',
  '/img/icon-192.png',
  '/img/icon-512.png',
  '/img/icon-256.png',
  '/img/icon-144.png',
  '/CV/CV-Cristian Garcia .pdf',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            var responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          });
      })
    );
});

self.addEventListener('activate', event => {
  var cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for contact form
self.addEventListener('sync', event => {
  if (event.tag === 'sync-contact') {
    event.waitUntil(
      // Handle contact form sync here
      console.log('Sync contact form')
    );
  }
});