// Device
let Device = (function () {
  let userAgent = navigator.userAgent
  let ua = userAgent.toLowerCase()
  // 内核
  let kernel = ''
  if (ua.indexOf('trident') > -1) {
    kernel = 'trident'
  } else if (ua.indexOf('presto') > -1) {
    kernel = 'presto'
  } else if (ua.indexOf('applewebkit') > -1) {
    kernel = 'webkit'
  } else if (ua.indexOf('gecko') > -1 && ua.indexOf('khtml') === -1) {
    kernel = 'gecko'
  }
  // 设备
  let device = ''
  if (ua.match(/applewebkit.*mobile.*/)) {
    device = 'mobile'
  } else {
    device = 'pc'
  }
  // 系统
  let os = ''
  let osVersion = ''
  let androidExp = ua.match(/android\s*(\d*\.*\d*)/)
  let iosExp = ua.match(/cpu iphone os (.*?) like mac os/)
  let harmonyExp = ua.match(/openharmony\s*(\d*\.*\d*)/)
  if (androidExp) {
    os = 'android'
    osVersion = androidExp[1]
  } else if (iosExp) {
    os = 'ios'
    osVersion = iosExp[1]
  } else if (harmonyExp) {
    os = 'harmony'
    osVersion = harmonyExp[1]
  }

  // 平台
  let platform = ''
  let platformVersion = ''
  let platformMatch = null
  function updatePlatform() {
    // 订货
    if (ua.indexOf('dinghuoappversion') > -1) {
      platform = 'dinghuo'
      platformMatch = ua.match(/dinghuoappversion\/([\w.]*)/)
      if (platformMatch && platformMatch[1]) platformVersion = platformMatch[1]
    }
    // 外勤
    else if (ua.indexOf('wqappversion') > -1) {
      // 外勤cordova内核
      platform = 'waiqin'
      // JsBridge内核
      if (ua.indexOf('waiqin365') > -1) {
        platform = 'wq'
      }
      // 临时纠错: 因为652之前的客户端wq和waiqin内核ua一样, 无法区分, 所以通过外部传入_device_wq_platform变量区分外勤还是订货
      if (window._device_wq_platform && ua.indexOf('wqappversion') > -1) {
        platform = window._device_wq_platform
      }
      // 外勤版本号
      platformMatch = ua.match(/wqappversion\/([\w.]*)/)
      if (platformMatch && platformMatch[1]) platformVersion = platformMatch[1]
    }
    // 微信小程序
    else if (ua.indexOf('miniprogram') > -1 && ua.indexOf('micromessenger') > -1) {
      if (ua.indexOf('wxwork') > -1) {
        platform = 'weworkMiniprogram'
        platformMatch = ua.match(/wxwork\/([\w.]*)/)
      } else if (ua.indexOf('micromessenger') > -1) {
        platform = 'wechatMiniprogram'
        platformMatch = ua.match(/micromessenger\/([\w.]*)/)
      }
      if (platformMatch && platformMatch[1]) platformVersion = platformMatch[1]
    }
    // 企业微信
    else if (ua.indexOf('wxwork') > -1) {
      platform = 'wework'
      platformMatch = ua.match(/wxwork\/([\w.]*)/)
      if (platformMatch && platformMatch[1]) platformVersion = platformMatch[1]
    }
    // 微信
    else if (ua.indexOf('micromessenger') > -1) {
      platform = 'wechat'
      platformMatch = ua.match(/micromessenger\/([\w.]*)/)
      if (platformMatch && platformMatch[1]) platformVersion = platformMatch[1]
    }
    // 支付宝
    else if (ua.indexOf('alipay') > -1) {
      platform = 'alipay'
      if (ua.indexOf('miniprogram') > -1) {
        platform = 'alipayMiniprogram'
      }
      platformMatch = ua.match(/alipayclient\/([\w.]*)/)
      if (platformMatch && platformMatch[1]) platformVersion = platformMatch[1]
    }
    // 钉钉
    else if (ua.indexOf('dingtalk') > -1) {
      platform = 'dingtalk'
      platformMatch = ua.match(/dingtalk\/([\w.]*)/)
      if (platformMatch && platformMatch[1]) platformVersion = platformMatch[1]
    }
    // QQ
    else if (ua.indexOf('mqqbrowser') > -1) {
      platform = 'qq'
    }
    // UC
    else if (ua.indexOf('ucbrowser') > -1) {
      platform = 'uc'
    }
    // 其它浏览器
    else {
      platform = 'browser'
    }
  }
  updatePlatform()

  // 以下两个方法都不准备
  // 获得苹果机型
  function appleModel() {
    // 获取设备型号
    if (ua && /(iphone|ipad|ipod|ios)/i.test(ua)) {
      let m = ua.match(/mobile\/([\w.]*)/)
      if (m && m[1]) {
        return m[1]
      }
    }
    return ''
  }
  // 获取苹果设备名称
  function getAppleDevice() {
    // iPhoneX | iPhoneXS
    if (/iphone/gi.test(ua) && window.screen.height === 812 && window.screen.width === 375)
      return 'iPhoneX'
    // iPhoneXSM | iPhoneXSR
    if (/iphone/gi.test(ua) && window.screen.height === 896 && window.screen.width === 414)
      return 'iPhoneXSM'
    let model = appleModel()
    switch (model) {
      case '15b150':
        return 'iPhone6s'
      case '15b202':
        return 'iPhone6'
      case '13g36':
        return 'iPhone5SE'
      case '14e304':
        return 'iPhone6P'
      default:
        return ''
    }
  }

  // 网络监听
  let onLineCallback
  function handleOnline(e) {
    onLineCallback(true)
  }
  function handleOffline(e) {
    onLineCallback(false)
  }
  function onLine(callback) {
    onLineCallback = callback
    window.removeEventListener('online', handleOnline, false)
    window.removeEventListener('offline', handleOffline, false)
    window.addEventListener('online', handleOnline, false)
    window.addEventListener('offline', handleOffline, false)
  }

  // 适配刘海屏和android5.0以下的手机
  function adapterIPhoneX(el) {
    let root = document.getElementById('root')
    if (el && Object.prototype.toString.call(el).indexOf('[object HTML') === 0) root = el
    if (!root) return
    // 适配iPhoneX
    let isX = getAppleDevice().indexOf('iPhoneX') >= 0
    function changeSafeArea() {
      if (isX && root) {
        switch (window.orientation) {
          case 0: // 竖屏
            root.style.left = '0'
            root.style.right = '0'
            root.style.bottom = '34px'
            break
          case 90: // 向左横屏
            root.style.left = '40px'
            root.style.right = '40px'
            root.style.bottom = '34px'
            break
          case -90: // 向右横屏
            root.style.left = '40px'
            root.style.right = '40px'
            root.style.bottom = '34px'
            break
          default:
            break
        }
      }
    }
    // 刘海屏自适应
    changeSafeArea()
    window.removeEventListener('orientationchange', changeSafeArea, false)
    window.addEventListener('orientationchange', changeSafeArea, false)
  }
  // 获取地址栏参数
  function getUrlParameter(argName, argSearch) {
    let url = window.location.href
    if (argSearch) url = argSearch
    let params = {}
    // 如果url中包含?说明有参数
    if (url.indexOf('?') !== -1) {
      if (!argName) return '?' + url.split('?')[1]
      // 获取所有参数options: 如?a=1&b=2转为['a=1','b=2']
      let options = url.split('?')[1].split('&')
      if (options.length) {
        for (let i = 0; i < options.length; i++) {
          // 获取单项option: 如'a=1'转为['a', '1']
          let option = options[i].split('=')
          if (option.length === 2) {
            if (argName) {
              if (argName === option[0]) return option[1]
            } else {
              params[option[0]] = option[1]
            }
          }
        }
      }
    }
    if (Object.keys(params).length) return params
    return ''
  }
  // 获取屏幕宽高
  function getScreenWidth() {
    if (window.innerWidth) return window.innerWidth
    if (window.screen.width) return window.screen.width
    if (window.screen.availWidth) return window.screen.availWidth
  }
  function getScreenHeight() {
    if (window.innerHeight) return window.innerHeight
    if (window.screen.height) return window.screen.height
    if (window.screen.availHeight) return window.screen.availHeight
  }
  // 获取手机型号(ios返回版本号, 因为ios取不到型号)
  function getModel() {
    let model = ''
    if (userAgent.toLowerCase().match(/android\s*(\d*\.*\d*)/)) {
      let infos = userAgent.split(';')
      for (let info of infos) {
        if (info.indexOf('Build') !== -1) {
          info = info.trim()
          model = info.substring(0, info.indexOf(' Build'))
          break
        }
      }
      if (!model) model = ''
    } else {
      let iosVersion = ''
      let iosExp = userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/)
      if (iosExp && iosExp[1]) {
        iosVersion = iosExp[1].replace(/_/gim, '.')
      }
      model = `iPhone ${iosVersion}`
    }
    return model
  }
  return {
    protocol: window.location.protocol,
    host: window.location.host,
    domain: window.location.protocol + '//' + window.location.host,
    kernel: kernel,
    device: device,
    os: os,
    osVersion: osVersion,
    model: getModel(),
    platform: platform,
    platformVersion: platformVersion,
    appleDevice: getAppleDevice(),
    // 应用程序判断
    language: (window.navigator.browserLanguage || window.navigator.language).toLowerCase(),
    appVersion: window.navigator.appVersion,
    onLine: onLine,
    isOnLine: window.navigator.onLine || true,
    ua: ua,
    orientation: window.orientation || '请在真机上测试', // 设备方向0:竖屏,90:左横屏,-90:右横屏
    adapterIPhoneX: adapterIPhoneX, // 适配iPhoneX
    getUrlParameter: getUrlParameter,
    screenWidth: getScreenWidth(),
    screenHeight: getScreenHeight(),
    compareVersion: function (s1, s2) {
      // 比较版本号, -1小于 0等于 1大于
      // 不考虑字母
      function s2i(s) {
        return s
          .split('')
          .reduce(function (a, c) {
            let code = c.charCodeAt(0)
            if (48 <= code && code < 58) {
              a.push(code - 48)
            }
            return a
          }, [])
          .reduce(function (a, c) {
            return 10 * a + c
          }, 0)
      }
      let a = s1.split('.').map(function (s) {
        return s2i(s)
      })
      let b = s2.split('.').map(function (s) {
        return s2i(s)
      })
      let n = a.length < b.length ? a.length : b.length
      for (let i = 0; i < n; i++) {
        if (a[i] < b[i]) {
          return -1
        } else if (a[i] > b[i]) {
          return 1
        }
      }
      if (a.length < b.length) return -1
      if (a.length > b.length) return 1
      let last1 = s1.charCodeAt(s1.length - 1) | 0x20
      let last2 = s2.charCodeAt(s2.length - 1) | 0x20
      return last1 > last2 ? 1 : last1 < last2 ? -1 : 0
    }
  }
})()

export default Device
