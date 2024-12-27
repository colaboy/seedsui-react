// FullScreen
const FullScreen = {
  // 是否支持全屏
  support: function () {
    let requestFullscreen =
      document.body.requestFullscreen ||
      document.body.webkitRequestFullscreen ||
      document.body.mozRequestFullScreen ||
      document.body.msRequestFullscreen
    let fullscreenEnabled =
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
    let target = el || document
    return !!(target.webkitIsFullScreen || this.getFullscreenElement())
  },
  // 进入全屏
  enter: function (el) {
    let target = el || document.body
    let requestMethod =
      target.requestFullScreen ||
      target.webkitRequestFullScreen ||
      target.mozRequestFullScreen ||
      target.msRequestFullScreen
    if (requestMethod) {
      requestMethod.call(target)
    } else if (typeof window.ActiveXObject !== 'undefined') {
      let wscript = new window.ActiveXObject('WScript.Shell')
      if (wscript !== null) {
        wscript.SendKeys('{F11}')
      }
    }
  },
  // 退出全屏
  exit: function (el) {
    let target = el || document
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
  on: function (element, fn) {
    let target = element || document
    target.addEventListener('webkitfullscreenchange', fn, false)
    target.addEventListener('mozfullscreenchange', fn, false)
    target.addEventListener('fullscreenchange', fn, false)
    target.addEventListener('MSFullscreenChange', fn, false)
  }
}

export default FullScreen
