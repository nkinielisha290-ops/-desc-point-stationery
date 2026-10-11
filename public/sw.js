// Service worker ya Desc Point: inafanya website ifunguke haraka na hata bila mtandao.
const VERSION = 'dps-v2'
const BASE = new URL('./', self.location).pathname
const SHELL = ['', 'index.html', 'logo.png', 'hero.jpg', 'icon-192.png', 'manifest.webmanifest'].map((p) => BASE + p)

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()))
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (e) => {
  const req = e.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)

  // Hali ya oda daima itoke mtandaoni (isikae kwenye cache)
  if (url.pathname.endsWith('/orders.json')) return

  // Kurasa: mtandao kwanza, cache ikishindikana
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone()
        caches.open(VERSION).then((c) => c.put(BASE + 'index.html', copy))
        return res
      }).catch(() => caches.match(BASE + 'index.html')),
    )
    return
  }

  // Assets za website, fonts na picha: cache kwanza, kisha sasisha kimya kimya
  const cacheable = url.origin === location.origin || /fonts\.(googleapis|gstatic)\.com|images\.unsplash\.com/.test(url.host)
  if (!cacheable) return
  e.respondWith(
    caches.open(VERSION).then(async (c) => {
      const hit = await c.match(req)
      const net = fetch(req).then((res) => {
        if (res.ok || res.type === 'opaque') c.put(req, res.clone())
        return res
      }).catch(() => hit)
      return hit || net
    }),
  )
})
