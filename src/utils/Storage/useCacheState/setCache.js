import Storage from './../Storage'

function setCache(key, value, { persist = false } = {}) {
  if (value === undefined || value === null || value === '') {
    if (persist === 'session') Storage.removeSessionStorage(key)
    else if (persist) Storage.removeLocalStorage(key)
    delete window[key]
  } else {
    if (persist === 'session') Storage.setSessionStorage(key, value)
    else if (persist) Storage.setLocalStorage(key, value)
    window[key] = value
  }
}

export default setCache
