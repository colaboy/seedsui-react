import Storage from './../Storage'

function getCache(cacheName) {
  return window[cacheName] || Storage.getLocalStorage(cacheName)
}

export default getCache
