const VERSION = 'v1'

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) => {
      return cache.addAll([
        '/service-workers/index.html',
        '/service-workers/index.js',
        '/service-workers/sw-test.js'
      ])
    })
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => {
      return res || fetch(event.request)
    })
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      console.log('keyList', keyList)
      return Promise.all(
        keyList.map((key) => {
          if (key !== VERSION) {
            caches.delete(key)
          }
        })
      )
    })
  )
})
