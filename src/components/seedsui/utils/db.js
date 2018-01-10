// DB 本地数据库
var DB = (function () {
  function checkManifest () {
    window.addEventListener('updateready', function (e) {
      console.log('离线缓存状态：' + window.applicationCache.status)
      if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
        window.applicationCache.swapCache()
        if (confirm('发现此manifest文件有更新，是否更新？')) {
          window.location.reload()
        }
      } else {
        console.log('manifest文件没有变化')
      }
    }, false)
  }

  function setCookie (key, value, days) {
    var expiresDay = days
    var cookieStr = key + '=' + escape(value)
    if (expiresDay) {
      var exp = new Date()
      exp.setTime(exp.getTime() + Number(expiresDay) * 24 * 60 * 60 * 1000)
      cookieStr += ';expires=' + exp.toGMTString()
    }
    document.cookie = cookieStr
  }
  function getCookie (key) {
    var valExpr = new RegExp('(^| )' + key + '=([^]*)(|$)')
    var match = valExpr.exec(document.cookie)
    if (match && match[2]) {
      return unescape(match[2])
    }
    return null
  }
  function delCookie (key) {
    var exp = new Date()
    exp.setTime(exp.getTime() - 1)
    var val = getCookie(key)
    if (val != null) {
      document.cookie = key + '=' + val + 'expires=' + exp.toGMTString()
    }
  }
  function clearCookie () {
    alert('抱歉，cookie不可以全部清空!')
  }
  
  function stringifyData (val) {
    if (typeof val === 'number') {
      return val.toString()
    }
    if (!val) {
      return ''
    }
    if (typeof val === 'string') {
      return val
    }
    if (val instanceof Function) {
      return '_function:' + val.toString()
    }
    if (val instanceof Object) {
      return '_json:' + JSON.stringify(val)
    }
  }
  function parseData (val) {
    if (!val) {
      return null
    }
    if (val.indexOf('_function:') === 0) {
      return val.replace(/^_function:/,'')
    }
    if (val.indexOf('_json:') === 0) {
      return JSON.parse(val.replace(/^_json:/,''))
    }
    return val
  }
  var store = window.localStorage
  var session = window.sessionStorage
  return {
    // application cache
    checkManifest: checkManifest,

    setStore: function (key, val) {
      store.setItem(key.toString(), stringifyData(val))
    },
    getStore: function (key) {
      if (typeof key === 'number') {
        return parseData(store.key(key))
      }
      return parseData(store.getItem(key))
    },
    getAllStore: function () {
      return store.valueOf()
    },
    delStore: function (key) {
      store.removeItem(key)
    },
    clearStore: function () {
      store.clear()
    },

    setSession: function (key, value) {
      session.setItem(key.toString(), stringifyData(value))
    },
    getSession: function (key) {
      if (typeof key === 'number') {
        return parseData(session.key(key))
      }
      return parseData(session.getItem(key))
    },
    getAllSession: function () {
      return session.valueOf()
    },
    delSession: function (key) {
      session.removeItem(key)
    },
    clearSession: function () {
      session.clear()
    },

    setCookie: setCookie, // key,value
    getCookie: getCookie, // key
    delCookie: delCookie, // key
    clearCookie: clearCookie
  }
})()

;//export default DB
