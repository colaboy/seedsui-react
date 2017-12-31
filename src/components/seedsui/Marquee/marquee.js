// Marquee 滚动框
var Marquee = function (container, params) {
  /* --------------------
  Model
  -------------------- */
  var defaults = {
    start: 0,
    end: 300,
    step: 50,
    duration: 300,
    delay: 2000,
    direction: 'top', // top | bottom | left | right
    loop: false,
    duplicateClass: 'duplicate'
    /*
    Callbacks:
    onSlideChange:function(Marquee)
    onSlideChangeEnd:function(Marquee)
    */
  }
  params = params || {}
  for (var def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def]
    }
  }
  var s = this
  s.params = params
  // Container
  s.container = typeof container === 'string' ? document.querySelector(container) : container
  // 定时器
  s.interval =  null
  // 循环
  if (s.params.loop) {
    var beforeDupContainer = s.container.cloneNode(true)
    var afterDupContainer = s.container.cloneNode(true)
    s.container.insertBefore(beforeDupContainer, s.container.firstElementChild)
    s.container.appendChild(afterDupContainer)
  }
  
  /* --------------------
  Method
  -------------------- */
  // 设置动画时长
  s.setDuration = function (duration) {
    s.container.style.webkitTransitionDuration = duration + 'ms'
  }
  // 设置移动位置
  s.setPosition = function (pos) {
    switch (s.params.direction) {
      case 'top':
        s.container.style.webkitTransform = 'translate(0px, ' + pos + 'px)'
        break;
      default:
        s.container.style.webkitTransform = 'translate(0px, ' + pos + 'px)'
    }
  }
  // 初始化位置变量
  s.start = 0
  s.end = 0
  s.move = 0
  s.update = function() {
    s.start = s.params.start
    s.end = s.params.end
    var range = s.params.end - s.params.start
    if (s.params.loop) {
      s.start = s.params.end + s.params.step
      s.end = s.start + range
    }
    s.setDuration(0)
    // 设置起始位置
    s.setPosition(-s.start)
    // 设置动画时长
    setTimeout(function () {
      s.setDuration(s.params.duration)
    }, 10)
    // 设置起始位置
    s.move = s.start
  }
  s.update()
  // 播放
  s.play = function () {
    if (s.interval) window.clearInterval(s.interval)
    s.interval = window.setInterval(function() {
      s.move += s.params.step
      if (s.params.loop) {
        if (s.move >= s.end + s.params.step) {
          // 回到复制相同处
          var initPos = s.start - s.params.step
          s.setDuration(0)
          s.setPosition(-initPos)
          // 再移动一格
          s.move = initPos + s.params.step
          setTimeout(() => {
            s.setDuration(s.params.duration)
            s.setPosition(-s.move)
          }, 10)
        } else {
          s.setPosition(-s.move)
        }
      } else {
        s.setPosition(-s.move)
        if (s.move >= s.end) {
          window.clearInterval(s.interval)
        }
      }
    }, s.params.delay);
  }
  s.pause = function () {
    window.clearInterval(s.interval)
  }
}

;//export default Marquee
