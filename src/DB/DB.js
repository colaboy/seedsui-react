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
  function stringifyData(val) {
    if (typeof val === 'number') {
      return '_number:' + val.toString()
    }
    if (typeof val === 'boolean') {
      return '_boolean:' + val.toString()
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
  function parseData(val) {
    if (!val) {
      return null
    }
    if (val.indexOf('_number:') === 0) {
      return Number(val.replace(/^_number:/, ''))
    }
    if (val.indexOf('_boolean:') === 0) {
      return Boolean(val.replace(/^_boolean:/, ''))
    }
    if (val.indexOf('_function:') === 0) {
      return val.replace(/^_function:/, '')
    }
    if (val.indexOf('_json:') === 0) {
      return JSON.parse(val.replace(/^_json:/, ''))
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
    removeStore: function (key) {
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
    removeSession: function (key) {
      session.removeItem(key)
    },
    clearSession: function () {
      session.clear()
    },
    setCookie: function (key, value, millisecond) {
      var cookieStr = key + '=' + escape(value)
      if (!isNaN(millisecond) && Number(millisecond)) {
        var expires = new Date()
        expires.setTime(expires.getTime() + Number(millisecond))
        cookieStr += ';expires=' + expires.toGMTString()
      }
      document.cookie = cookieStr
    },
    getCookie: function (key) {
      var arrCookie = document.cookie.split('; ')
      //遍历cookie数组, 处理每个cookie对
      // eslint-disable-next-line
      for (var i = 0, item; (item = arrCookie[i++]); ) {
        var arrItem = item.split('=')
        //找到名称为userId的cookie，并返回它的值
        if (String(key) === arrItem[0]) {
          return unescape(arrItem[1])
        }
      }
      return null
    },
    removeCookie: function (key) {
      var expires = new Date()
      expires.setTime(expires.getTime() - 1)
      var val = this.getCookie(key)
      if (val != null) {
        document.cookie = key + '=' + val + 'expires=' + expires.toGMTString()
      }
    },
    clearCookie: function clearCookie() {
      alert('抱歉，cookie不可以全部清空!')
    }
  }
})()

export default DB
