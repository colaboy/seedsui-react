import DataParse from './DataParse'
import IndexDB from './IndexDB'

// DB 本地数据库
var DB = (function () {
  function checkManifest() {
    window.addEventListener(
      'updateready',
      function (e) {
        console.log('离线缓存状态：' + window.applicationCache.status)
        if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
          window.applicationCache.swapCache()
          if (window.confirm('发现此manifest文件有更新，是否更新？')) {
            window.location.reload()
          }
        } else {
          console.log('manifest文件没有变化')
        }
      },
      false
    )
  }
  var store = window.localStorage
  var session = window.sessionStorage
  return {
    // application cache
    checkManifest: checkManifest,

    // localStorage
    setStore: function (key, val) {
      store.setItem(key.toString(), DataParse.stringify(val))
      return true
    },
    getStore: function (key) {
      if (!key || typeof key !== 'string') return null
      return DataParse.parse(store.getItem(key))
    },
    getAllStore: function () {
      let storages = store.valueOf()
      let allResult = null
      for (var i = 0; i < storages.length; i++) {
        if (!allResult) allResult = {}
        let key = storages.key(i)
        allResult[key] = DataParse.parse(storages[key])
      }
      return allResult
    },
    removeStore: function (key) {
      store.removeItem(key)
      return true
    },
    clearStore: function () {
      store.clear()
      return true
    },

    // sessionStorage
    setSession: function (key, value) {
      session.setItem(key.toString(), DataParse.stringify(value))
      return true
    },
    getSession: function (key) {
      if (!key || typeof key !== 'string') return null
      return DataParse.parse(session.getItem(key))
    },
    getAllSession: function () {
      let storages = session.valueOf()
      let allResult = null
      for (var i = 0; i < storages.length; i++) {
        if (!allResult) allResult = {}
        let key = storages.key(i)
        allResult[key] = DataParse.parse(storages[key])
      }
      return allResult
    },
    removeSession: function (key) {
      session.removeItem(key)
      return true
    },
    clearSession: function () {
      session.clear()
      return true
    },

    // cookie
    setCookie: function (key, value, millisecond) {
      if (!key) return false
      var cookieStr = key + '=' + encodeURIComponent(DataParse.stringify(value))
      if (!isNaN(millisecond) && Number(millisecond)) {
        var expires = new Date()
        expires.setTime(expires.getTime() + Number(millisecond))
        cookieStr += ';expires=' + expires.toGMTString()
      }
      document.cookie = cookieStr
      return true
    },
    getCookie: function (key) {
      if (!key || typeof key !== 'string') return null
      let cookiesMap = this.getAllCookie()
      for (let n in cookiesMap) {
        if (n === String(key)) {
          return cookiesMap[n]
        }
      }
      return null
    },
    getAllCookie: function () {
      var cookiesArr = document.cookie.split('; ')
      let allResult = null
      // 遍历cookie数组, 处理每个cookie对
      // eslint-disable-next-line
      for (var i = 0, item; (item = cookiesArr[i++]); ) {
        var itemArr = item.split('=')
        if (!allResult) allResult = {}
        allResult[itemArr[0]] = DataParse.parse(decodeURIComponent(itemArr[1]))
      }
      return allResult
    },
    removeCookie: function (key) {
      var expires = new Date()
      expires.setTime(expires.getTime() - 1)
      var val = this.getCookie(key)
      if (val != null) {
        document.cookie = key + '=' + val + ';expires=' + expires.toGMTString()
      }
      return true
    },
    clearCookie: function clearCookie() {
      let cookiesMap = this.getAllCookie()
      for (let n in cookiesMap) {
        this.removeCookie(n)
      }
      return true
    },

    // IndexDB
    indexedDB: IndexDB.indexedDB,
    setIndexDB: IndexDB.set,
    getIndexDB: IndexDB.get,
    getAllIndexDB: IndexDB.getAll,
    removeIndexDB: IndexDB.remove,
    clearIndexDB: IndexDB.clear
  }
})()

export default DB
