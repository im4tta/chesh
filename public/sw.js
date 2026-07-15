const CACHE = "khmer-flashcards-v1";
const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/icon.svg",
  "/icon-192.svg",
  "/icon-512.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      await cache.addAll(STATIC_ASSETS);
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.origin !== self.location.origin) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);
      const cached = await cache.match(request);
      if (cached) return cached;
      try {
        const response = await fetch(request);
        if (response.ok && request.method === "GET") {
          cache.put(request, response.clone());
        }
        return response;
      } catch {
        return cached || new Response("Offline", { status: 503 });
      }
    })()
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
  if (event.data?.type === "CLEAR_CACHE") {
    caches.delete(CACHE).then(() => {
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => client.postMessage({ type: "CACHE_CLEARED" }));
      });
    });
  }
});

self.addEventListener("push", (event) => {
  if (!event.data) return;
  try {
    const data = event.data.json();
    self.registration.showNotification(data.title || "Khmer Flashcards", {
      body: data.body || "",
      icon: "/icon-192.svg",
      badge: "/icon-192.svg",
      data: data.url ? { url: data.url } : undefined,
    });
  } catch {
    self.registration.showNotification("Khmer Flashcards", {
      body: event.data.text(),
      icon: "/icon-192.svg",
    });
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const urlToOpen = event.notification.data?.url || "/";
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      const matching = clients.find((c) => c.url === urlToOpen);
      if (matching) return matching.focus();
      return self.clients.openWindow(urlToOpen);
    })
  );
});
