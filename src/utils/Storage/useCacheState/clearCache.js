// Clear all caches named cacheName:xx
function clearCache(cacheName) {
  delete window[cacheName]
  localStorage.removeItem(cacheName)

  // 清除所有以 cache: 开头的属性
  for (let keyName in window) {
    if (window.hasOwnProperty(keyName) && keyName.startsWith(`${cacheName}:`)) {
      delete window[keyName]
    }
  }

  // 清除所有以 cache: 开头的项
  for (let i = 0; i < localStorage.length; i++) {
    let keyName = window.localStorage.key(i)
    if (keyName && keyName.startsWith('cache:')) {
      localStorage.removeItem(keyName)
    }
  }
}

export default clearCache
