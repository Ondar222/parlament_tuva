const CACHE_NAME = "ptuva-cache-v2";
const PRECACHE = [
  "/",
  "/index.html",
  "/src/main.jsx",
  "/css/template_c8f584615b5d9e1845225dead89680e4_v1.css",
  "/images/preview.png",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
      .then(async () => {
        const clients = await self.clients.matchAll({
          includeUncontrolled: true,
        });
        for (const client of clients) {
          client.postMessage({ type: "SW_UPDATED" });
        }
      })
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  event.respondWith(
    caches.match(req).then(
      (cached) =>
        cached ||
        fetch(req)
          .then((res) => {
            const copy = res.clone();
            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(req, copy))
              .catch(() => {});
            return res;
          })
          .catch(() => caches.match("/images/preview.png"))
    )
  );
});
