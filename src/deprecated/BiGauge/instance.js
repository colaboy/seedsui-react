// BiGauge 仪表盘
var BiGauge = function (container, params) {
  /* ----------------------
    Model
    ---------------------- */
  var defaults = {
    minValue: 0,
    maxValue: 360,
    currentValue: 0,

    maxPointRotate: 270,

    // dom
    pointClass: '.gauge-pointer',
    waveClass: '.gauge-wave',
    valueClass: '.gauge-text',

    // animate
    delay: 0,
    durationall: 2000,

    /* callbacks
    onChangeStart:function(Gauge)
    onChangeEnd:function(Gauge)
    onOut:function(Gauge)
    */
  }
  for (var def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def]
    }
  }
  var s = this
  s.params = params
  s.container = typeof container === 'string' ? document.querySelector(container) : container
  if (!s.container) {
    console.log('SeedsUI Error：未找到Gauge的DOM对象，请检查传入参数是否正确')
    return
  }
  s.point = s.container.querySelector(s.params.pointClass) // 指针
  s.wave = s.container.querySelector(s.params.waveClass) || null // 波浪
  s.value = s.container.querySelector(s.params.valueClass) // 指针值

  s.percent = (s.params.currentValue - s.params.minValue) / (s.params.maxValue - s.params.minValue) // 当前值所占比例

  s.duration = Math.round(s.percent * s.params.durationall) // 执行时间长度
  if (s.duration > s.params.durationall) {
    s.duration = s.params.durationall
  }
  s.bgLvl = Math.round(s.percent * 10) + 1 // 背景等级
  if (s.bgLvl < 1) s.bgLvl = 1
  if (s.bgLvl > 10) s.bgLvl = 10

  s.waveTop // 波浪高度

  /* ----------------------
    Method
    ---------------------- */
  // 旋转指针
  s.updatePoint = function () {
    // 指针旋转角度
    s.pointRotate = s.params.maxPointRotate * s.percent

    // CallBack onOut
    if (s.pointRotate > s.params.maxPointRotate) {
      s.pointRotate = s.params.maxPointRotate

      if (s.params.onOut) s.params.onOut(s)
    }

    // CallBack onChangeStart
    if (s.params.onChangeStart) s.params.onChangeStart(s)
    // 旋转时长
    s.point.style.webkitTransitionDuration = s.duration + 'ms'
  }
  // 设置数字
  s.updateValue = function () {
    s.value.innerHTML = s.params.currentValue
  }
  // 更改背景色
  s.updateBg = function () {
    s.container.style.webkitAnimationDuration = s.duration + 'ms'
  }
  // 设置波浪
  s.updateWave = function () {
    if (!s.wave) return
    s.waveTop = 100 - Math.round(s.percent.toFixed(1) * 100)
    if (s.waveTop < 0) {
      s.waveTop = 0
    }
    s.wave.style.webkitTransitionDuration = s.duration + 'ms'
  }
  s.updateDelay = function () {
    s.container.style.webkitAnimationDelay = s.params.delay + 'ms'
    s.point.style.webkitTransitionDelay = s.params.delay + 'ms'
    if (s.wave) s.wave.style.webkitTransitionDelay = s.params.delay + 'ms'
  }
  s.update = function () {
    s.updateBg()
    s.updatePoint()
    s.updateValue()
    s.updateWave()
    s.updateDelay()
  }
  s.update()
  s.play = function () {
    // 播放指针
    s.point.style.webkitTransform = 'rotate(' + s.pointRotate + 'deg)'
    // 播放背景
    var bgExpr = /bg[1-9]0?$/g
    if (bgExpr.test(s.container.className)) {
      s.container.className = s.container.className.replace(bgExpr, 'bg' + s.bgLvl)
    } else {
      s.container.className += ' bg' + s.bgLvl
    }
    // 播放波浪
    if (s.wave) s.wave.style.top = s.waveTop + '%'
  }
  /* ----------------------
    Events
    ---------------------- */
  s.events = function (detach) {
    var action = detach ? 'removeEventListener' : 'addEventListener'
    s.point[action]('webkitTransitionEnd', s.onTransitionEnd, false)
  }
  // attach、detach事件
  s.attach = function () {
    s.events()
  }
  s.detach = function () {
    s.events(true)
  }
  s.onTransitionEnd = function (e) {
    // CallBack onChangeEnd
    if (s.params.onChangeEnd) s.params.onChangeEnd(s)
  }
  // Init
  s.init = function () {
    s.attach()
  }
  s.init()
}

export default BiGauge
