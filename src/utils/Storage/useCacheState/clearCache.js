import Storage from './../Storage'

// Clear all caches named cacheName:xx
function clearCache(cacheName, { match } = {}) {
  delete window[cacheName]
  Storage.removeLocalStorage(cacheName)

  // 清除所有以 cache: 开头的属性
  if (match === 'prefix') {
    for (let keyName in window) {
      if (window.hasOwnProperty(keyName) && keyName.startsWith(`${cacheName}:`)) {
        delete window[keyName]
      }
    }

    // 清除所有以 cache: 开头的项
    Storage.removeLocalStorages((keyName) => keyName.startsWith(`${cacheName}:`))
  }
}

export default clearCache
