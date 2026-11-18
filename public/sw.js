// Version bump busts all old caches. Network-first for HTML/JS so new
// deploys show up immediately; cache is only a fallback for offline.
const CACHE = "levi-os-v14";

self.addEventListener("install", (e) => {
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  // Never cache anything private or live: other sites' APIs, the database, the server functions, or non-GET requests.
  if (e.request.method !== "GET") return;
  if (/api\.anthropic\.com|kvdb\.io|\.supabase\.co|\/\.netlify\//.test(e.request.url)) return;
  // Network-first: always try the live file, fall back to cache offline.
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
