if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-workers/sw-test.js', { scope: '/service-workers/' })
    .then((reg) => {
      console.log('reg', reg)
      if (reg.installing) {
        console.log('installing')
      } else if (reg.waiting) {
        console.log('waiting')
      } else if (reg.active) {
        console.log('active')
      }
    })
    .catch((error) => {
      console.log(error)
    })
} else {
  alert('浏览器不支持service worker')
}
