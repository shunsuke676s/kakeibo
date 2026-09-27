// オフライン対応用のService Worker
// キャッシュ済みの画面をすぐ表示し、裏で最新版を取得して次回起動時に反映する
const CACHE = 'kakeibo-v2';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  const network = fetch(req).then(async (res) => {
    if (res.ok) {
      const copy = res.clone();
      const cache = await caches.open(CACHE);
      await cache.put(req, copy);
    }
    return res;
  });

  e.respondWith(caches.match(req, { ignoreSearch: true }).then((cached) => cached || network));
  e.waitUntil(network.catch(() => {}));
});
