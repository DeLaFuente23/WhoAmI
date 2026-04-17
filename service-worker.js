const CACHE_NAME = "whoami-v1";
const urlsToCache = [
  "/WhoAmI/",
  "/WhoAmI/index.html",
  "/WhoAmI/player.html",
  "/WhoAmI/script.js",
  "/WhoAmI/characters.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
