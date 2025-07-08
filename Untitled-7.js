self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("innovate-store").then(cache => {
      return cache.addAll([
        "/",
        "/index.html",
        "/css/styles.css",
        "/js/main.js",
        "/js/techai.js",
        "/images/logo.png"
      ]);
    })
  );
});
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});