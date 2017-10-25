// Counter 动态数字
var Counter = function (counter, params) {
  /* ----------------------
  Model
  ---------------------- */
  var defaults = {
    fromAttr: 'data-from',
    toAttr: 'data-to',
    durationAttr: 'data-duration',
    maxMilliSec: 50, // 最快50毫秒执行一次
    maxCountSec: 20 // 平均一秒执行20次
  }
  params = params || {}
  for (var def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def]
    }
  }
  // Counter
  var s = this

  // Params
  s.params = params

  // Counter
  s.counter = typeof counter === 'string' ? document.querySelector(counter) : counter

  // From(开始数字)
  s.from = s.counter.getAttribute(s.params.fromAttr) ? s.counter.getAttribute(s.params.fromAttr) : 0
  // To(结束数字)
  s.to = s.counter.getAttribute(s.params.toAttr) ? s.counter.getAttribute(s.params.toAttr) : 0
  // Current(当前数字)
  s.current = s.from
  // Duration(执行秒数)
  s.duration = s.counter.getAttribute(s.params.durationAttr) ? s.counter.getAttribute(s.params.durationAttr) : 5000

  // Diff(差值)
  s.diff = s.to - s.from
  if (s.diff < 0 || isNaN(s.from) || isNaN(s.to)) {
    console.log('请确定开始时间与结束时间是否输入正确！')
    return
  }

  // 每秒需要走完的数字
  var secNum = Math.round(s.diff / (s.duration / 1000))
  // 每次增加的数字
  s.step = 1
  // 毫秒/次
  s.milliSec = Math.round(s.params.maxMilliSec)
  if (secNum > s.params.maxCountSec) { // 如果每秒走完的数字，大于最大每秒执行次数，则要步进加快
    s.step = Math.round(secNum / s.params.maxCountSec)
    s.milliSec = s.params.maxMilliSec // 用最快的速度：50毫秒执行一次
  } else {
    s.step = secNum
    s.milliSec = 1000 / secNum // 1秒执行的次数
  }

  // console.log('从'+s.from+'到'+s.to+'，共'+s.duration/1000+'秒走完，每秒需要增加'+secNum+'，每'+s.milliSec+'毫秒执行一次，一秒执行'+Math.round(1000/s.milliSec)+'次，一次递增：'+s.step+'')

  // Interval
  s.interval
  /* ----------------------
  Method
  ---------------------- */
  s.play = function () {
    s.interval = window.setInterval(function () {
      s.current = parseInt(s.current) + parseInt(s.step)
      s.counter.innerHTML = s.current
      if (s.current >= s.to) {
        s.counter.innerHTML = s.to
        clearInterval(s.interval)
      }
    }, s.milliSec)
  }
}
var Counters = function (params) {
  params = params || {}
  var counterClass = 'counter'
  var s = this
  s.counters = []
  s.update = function () {
    var elements = document.querySelectorAll('.' + counterClass)
    for (var i = 0; i < elements.length; i++) {
      s.counters[i] = new Counter(elements[i], s.params)
    }
  }
  s.update()
  s.play = function () {
    for (var i = 0; i< s.counters.length; i++) {
      s.counters[i].play()
    }
  }
}

//export {Counter, Counters}
