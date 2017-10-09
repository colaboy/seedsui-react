// Clock 时钟控件
var Clock = function (clock, params) {
  /* -------------------
  Model
  ------------------- */
  var defaults = {
    hourClass: 'clock-hour',
    minuteClass: 'clock-minute',
    time: '', // 格式08:30
    duration: '500',
    delay: '0'
  }
  params = params || {}
  for (var def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def]
    }
  }
  var s = this
  // Params
  s.params = params
  // Container
  s.clock = typeof clock === 'string' ? document.querySelector(clock) : clock
  s.hour
  s.minute
  s.time
  s.hourDeg
  s.minuteDeg
  /* -------------------
  Method
  ------------------- */
  s.getHourDeg = function (hour) {
    return hour * 30
  }
  s.getMinuteDeg = function (minute) {
    return minute * 6
  }
  s.update = function () {
    s.hour = s.clock.querySelector('.' + s.params.hourClass)
    s.minute = s.clock.querySelector('.' + s.params.minuteClass)
    if (!s.params.time || !/\d{1,2}:\d{1,2}/.test(s.params.time)) {
      console.log('SeedsUI Warn:时间格式应为xx:xx')
      return
    }
    var hourMinute = s.params.time.split(':')
    s.hourDeg = s.getHourDeg(hourMinute[0])
    s.minuteDeg = s.getMinuteDeg(hourMinute[1])
    // 设置duration和delay
    s.hour.style.webkitTransitionDuration = s.params.duration + 'ms'
    s.hour.style.webkitTransitionDelay = s.params.delay + 'ms'
    s.minute.style.webkitTransitionDuration = s.params.duration + 'ms'
    s.minute.style.webkitTransitionDelay = s.params.delay + 'ms'
  }
  s.update()
  s.play = function () {
    s.hour.style.webkitTransform = 'rotate(' + s.hourDeg + 'deg)'
    s.minute.style.webkitTransform = 'rotate(' + s.minuteDeg + 'deg)'
  }
}
var Clocks = function (params) {
  /* -------------------
  Model
  ------------------- */
  var clockAttr = 'data-clock'
  var s = this
  s.clocks = []
  // 获得所有元素
  s.update = function () {
    var elements = document.querySelectorAll('[' + clockAttr + ']')
    /* eslint-disable */
    for (var i = 0, el; el = elements[i++];) {
      params = params || {}
      params.time = el.getAttribute(clockAttr)
      s.clocks[i] = new Clock(el, params)
      s.clocks[i].play()
    }
    /* eslint-enable */
  }
  s.update()
  /* -------------------
  Method
  ------------------- */
  return s.clocks
};

//export {Clocks, Clock}
