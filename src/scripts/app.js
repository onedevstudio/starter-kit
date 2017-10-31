const message = 'Hello Babel!'

$(document).ready(() => {
  console.log(message)
})

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('offline-worker.js')
    .then(registration => {
      console.log('offline worker registered!')
    })
}
