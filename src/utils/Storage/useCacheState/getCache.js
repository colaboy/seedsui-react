import Storage from './../Storage'

function getCache(cacheName) {
  return (
    window[cacheName] || Storage.getLocalStorage(cacheName) || Storage.getSessionStorage(cacheName)
  )
}

export default getCache
