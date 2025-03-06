import Storage from './../Storage'

function setCache(value, { name: cacheName, persist = false } = {}) {
  if (value === undefined || value === null || value === '') {
    if (persist) Storage.removeLocalStorage(cacheName)
    delete window[cacheName]
  } else {
    if (persist) Storage.setLocalStorage(cacheName, value)
    window[cacheName] = value
  }
}

export default setCache
