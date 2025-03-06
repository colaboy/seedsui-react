import DataParse from './DataParse'

const SessionStorage = {
  setSessionStorage: function (key, value) {
    window.sessionStorage.setItem(key.toString(), DataParse.stringify(value))
    return true
  },
  getSessionStorage: function (key) {
    if (!key || typeof key !== 'string') return null
    return DataParse.parse(window.sessionStorage.getItem(key))
  },
  getSessionStorages: function () {
    let storages = window.sessionStorage.valueOf()
    let sessionStorages = null
    for (let i = 0; i < storages.length; i++) {
      if (!sessionStorages) sessionStorages = {}
      let key = storages.key(i)
      sessionStorages[key] = DataParse.parse(storages[key])
    }
    return sessionStorages
  },
  removeSessionStorage: function (key) {
    window.sessionStorage.removeItem(key)
    return true
  },
  removeSessionStorages: function (filter) {
    if (typeof filter !== 'function') return false

    let storages = window.sessionStorage.valueOf()
    for (let i = 0; i < storages.length; i++) {
      let key = storages.key(i)
      if (filter(key)) {
        window.sessionStorage.removeItem(key)
      }
    }
    return true
  },
  clearSessionStorage: function () {
    window.sessionStorage.clear()
    return true
  }
}

export default SessionStorage
