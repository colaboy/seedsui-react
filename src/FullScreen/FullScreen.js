// FullScreen
var FullScreen = {
  // 是否支持全屏
  support: function () {
    var requestFullscreen =
      document.body.requestFullscreen ||
      document.body.webkitRequestFullscreen ||
      document.body.mozRequestFullScreen ||
      document.body.msRequestFullscreen
    var fullscreenEnabled =
      document.fullscreenEnabled ||
      document.mozFullScreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.msFullscreenEnabled
    return !!(requestFullscreen && fullscreenEnabled)
  },
  // 获取当前全屏的元素
  getFullscreenElement: function () {
    return (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement ||
      document.mozFullScreenElement ||
      null
    )
  },
  // 是否全屏
  isFull: function (el) {
    var target = el || document
    return !!(target.webkitIsFullScreen || this.getFullscreenElement())
  },
  // 进入全屏
  enter: function (el) {
    var target = el || document.body
    var requestMethod =
      target.requestFullScreen ||
      target.webkitRequestFullScreen ||
      target.mozRequestFullScreen ||
      target.msRequestFullScreen
    if (requestMethod) {
      requestMethod.call(target)
    } else if (typeof window.ActiveXObject !== 'undefined') {
      var wscript = new window.ActiveXObject('WScript.Shell')
      if (wscript !== null) {
        wscript.SendKeys('{F11}')
      }
    }
  },
  // 退出全屏
  exit: function (el) {
    var target = el || document
    if (document.exitFullscreen) {
      target.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
      target.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      target.webkitExitFullscreen()
    } else if (document.msExitFullscreen) {
      target.msExitFullscreen()
    }
    return this
  },
  // 切换
  toggle: function (el, handler) {
    if (this.isFull()) {
      this.exit()
      if (handler) handler(false)
    } else {
      this.enter(el)
      if (handler) handler(true)
    }
  },
  // 监听
  addHandler: function (element, handler) {
    var target = element || document
    target.addEventListener('webkitfullscreenchange', handler, false)
    target.addEventListener('mozfullscreenchange', handler, false)
    target.addEventListener('fullscreenchange', handler, false)
    target.addEventListener('MSFullscreenChange', handler, false)
  }
}

export default FullScreen
