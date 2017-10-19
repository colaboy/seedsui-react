// Animate
var Animate = {
  // requestAnimationFrame兼容
  requestAF: window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (handler) { return window.setTimeout(handler, 1000 / 60) },
  // requestAnimationFrame兼容
  cancelAF: window.cancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.mozCancelAnimationFrame ||
  window.oCancelAnimationFrame ||
  window.msCancelAnimationFrame ||
  function (handler) { return window.clearTimeout(handler) },
  // 动画执行一次后销毁
  one: function (el, aniname) {
    var animExpr = new RegExp('\\s{0,}' + aniname, 'g')
    if (el.className.match(animExpr)) {
      el.className = el.className.replace(animExpr, '')
    }
    el.className += ' ' + aniname
    if (!el.hasEndEvent) {
      el.addEventListener('webkitAnimationEnd', function (e) {
        el.className = el.className.replace(animExpr, '')
      }, false)
      el.hasEndEvent = true
    }
  },
  fps: function (callback, duration) {
    var fps = 0
    var interval = setInterval(function () {
      fps++
    }, 1)
    setTimeout(function () {
      if (callback) {
        callback(fps)
      }
      clearInterval(interval)
    }, duration || 1000)
  }
  // requestAnimationFrame帧率测试
  /* fps: function (callback, duration) {
    var fps = 0
    function fpstest (timestamp) {
      fps++
      var requestAF = requestAnimationFrame(fpstest)
      console.log(timestamp)
      if (timestamp >= (duration || 1000)) {
        if (callback) {
          callback(fps)
        }
        cancelAnimationFrame(requestAF)
      }
    }
    requestAnimationFrame(fpstest)
  } */
};

//export default Animate
