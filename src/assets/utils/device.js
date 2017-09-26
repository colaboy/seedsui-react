// Device
var Device = (function () {
  var ua = navigator.userAgent.toLowerCase()
  var kernel = ''
  if (ua.indexOf('trident') > -1) {
    kernel = 'trident'
  } else if (ua.indexOf('presto') > -1) {
    kernel = 'presto'
  } else if (ua.indexOf('applewebkit') > -1) {
    kernel = 'webkit'
  } else if (ua.indexOf('gecko') > -1 && ua.indexOf('khtml') === -1) {
    kernel = 'gecko'
  }
  var device = ''
  if (ua.match(/applewebkit.*mobile.*/)) {
    device = 'mobile'
  } else {
    device = 'pc'
  }
  var os = ''
  var osVersion = ''
  var andriodExp = ua.match(/android\s*(\d*\.*\d*)/)
  var iosExp = ua.match(/cpu iphone os (.*?) like mac os/)
  if (andriodExp) {
    os = 'andriod'
    osVersion = andriodExp[1]
  } else if (iosExp) {
    os = 'ios'
    osVersion = iosExp[1]
  }
  var platform = ''
  if (ua.indexOf('micromessenger') > -1) {
    platform = 'weixin'
  } else if (ua.indexOf('mqqbrowser') > -1) {
    platform = 'qq'
  } else if (ua.indexOf('ucbrowser') > -1) {
    platform = 'uc'
  }
  return {
    kernel: kernel,
    device: device,
    os: os,
    osVersion: osVersion,
    platform: platform,
    // 应用程序判断
    language: (window.navigator.browserLanguage || window.navigator.language).toLowerCase(),
    // appVersion: window.navigator.appVersion,
    onLine: window.navigator.onLine,
    ua: ua
  }
})();

//export default Device
