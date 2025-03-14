import DataParse from './DataParse'

const LocalStorage = {
  setLocalStorage: function (key, val) {
    window.localStorage.setItem(key.toString(), DataParse.stringify(val))
    return true
  },
  getLocalStorage: function (key) {
    if (!key || typeof key !== 'string') return null
    return DataParse.parse(window.localStorage.getItem(key))
  },
  getLocalStorages: function () {
    let storages = window.localStorage.valueOf()
    let localStorages = null
    for (let i = 0; i < storages.length; i++) {
      if (!localStorages) localStorages = {}
      let key = storages.key(i)
      localStorages[key] = DataParse.parse(storages[key])
    }
    return localStorages
  },
  removeLocalStorage: function (key) {
    window.localStorage.removeItem(key)
    return true
  },
  removeLocalStorages: function (filter) {
    if (typeof filter !== 'function') return false

    let removeKeys = []
    let storages = window.localStorage.valueOf()
    for (let i = 0; i < storages.length; i++) {
      let key = storages.key(i)
      if (filter(key)) {
        removeKeys.push(key)
      }
    }

    for (let removeKey of removeKeys) {
      window.localStorage.removeItem(removeKey)
    }
    return true
  },
  clearLocalStorage: function () {
    window.localStorage.clear()
    return true
  }
}

export default LocalStorage
