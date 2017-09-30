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

  var store = window.localStorage
  var session = window.sessionStorage
  return {
    // application cache
    checkManifest: checkManifest,

    setStore: function (key, val) {
      store.setItem(key, val)
    },
    getStore: function (key) {
      return store.getItem(key)
    },
    delStore: function (key) {
      store.removeItem(key)
    },
    clearStore: function () {
      return store.clear()
    },

    setSession: function (key, value) {
      session.setItem(key, value)
    },
    getSession: function (key) {
      if (typeof key === 'number') {
        return session.key(key)
      }
      return session.getItem(key)
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
})();

//export default DB
