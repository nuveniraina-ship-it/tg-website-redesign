/* Ticket Generator service worker.
   One job: when a page can't be reached (no network or an unstable one), show the
   offline page with Mira at her laptop instead of the browser's own error page.
   Everything else goes straight to the network as usual. */
const CACHE = 'tg-offline-v1';
const OFFLINE = '/offline';

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    let res = await fetch(OFFLINE, { cache: 'reload' }).catch(() => null);
    if (!res || !res.ok) res = await fetch('/offline.html', { cache: 'reload' });
    // store a clean copy (a redirected response can't be used to answer a page load)
    await cache.put(OFFLINE, new Response(await res.blob(), { headers: { 'Content-Type': 'text/html; charset=utf-8' } }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode !== 'navigate') return;
  event.respondWith((async () => {
    try {
      return await fetch(event.request);
    } catch {
      return (await caches.match(OFFLINE)) || Response.error();
    }
  })());
});
