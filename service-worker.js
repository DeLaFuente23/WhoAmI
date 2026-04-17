self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("whoami-cache").then((cache) => {
      return cache.addAll([
        "/WhoAmI/",
        "/WhoAmI/index.html",
        "/WhoAmI/style.css",
        "/WhoAmI/script.js"
      ]);
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
