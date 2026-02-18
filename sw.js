const CACHE_VERSION = '2026-02-18-v2';
const CACHE_NAME = `beacon-${CACHE_VERSION}`;

// Only cache truly static assets — never cache the HTML shell
const STATIC_ASSETS = [
  '/manifest.json'
];

// Install event - cache essential static files and immediately activate
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Opened cache:', CACHE_NAME);
        return cache.addAll(STATIC_ASSETS);
      })
  );
  // Force immediate activation — don't wait for old tabs to close
  self.skipWaiting();
});

// Activate event - purge ALL old caches, then claim all clients
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Claiming all clients');
      return self.clients.claim();
    })
  );
});

// Fetch event - network-first for everything, cache only immutable hashed assets
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip API requests entirely — never intercept or cache them
  if (url.pathname.startsWith('/api/')) return;

  // Skip cross-origin requests (analytics, fonts loaded from CDN, etc.)
  if (url.origin !== self.location.origin) return;

  // NEVER cache navigation requests (HTML pages) — always go to network
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        // If network fails, return a simple offline message instead of stale HTML
        return new Response(
          '<html><body style="font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#0f172a;color:#e2e8f0;"><div style="text-align:center;"><h1>You\'re Offline</h1><p>Please check your connection and try again.</p><button onclick="location.reload()" style="padding:12px 24px;background:#f59e0b;color:#0f172a;border:none;border-radius:8px;font-size:16px;cursor:pointer;margin-top:16px;">Retry</button></div></body></html>',
          { headers: { 'Content-Type': 'text/html' } }
        );
      })
    );
    return;
  }

  // For hashed assets (Vite build output like /assets/index-DhID0se4.js),
  // use cache-first since the hash guarantees immutability
  const isHashedAsset = url.pathname.startsWith('/assets/') && /\-[a-zA-Z0-9]{8,}\./.test(url.pathname);

  if (isHashedAsset) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // For all other static files (images, videos, icons) — network-first with cache fallback
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});

// Push notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New notification from Beacon',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      { action: 'explore', title: 'View Details' },
      { action: 'close', title: 'Dismiss' }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Beacon Momentum', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
