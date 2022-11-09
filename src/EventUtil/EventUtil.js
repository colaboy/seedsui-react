//  EventUtil 事件函数
var EventUtil = (function () {
  /**
   * 多次点击事件
   * @param {DOM} element 目标元素
   * @param {String} type 事件名称, 此处固定为'countclick'
   * @param {Function} handler 句柄, handler({code(1成功0失败): '1'或'0', count(点击次数): Number, ...e})
   * @param {Boolean} isDetach 是否移除绑定事件
   * @param {Object} params 定义配置, 配置为: {count(点击次数): Number, timeout(超时时长): Number}
   */
  var _countClickEventHandler = function (e) {
    // 解析参数
    var target = e.currentTarget
    // 次数自增
    target.prevCount += 1
    e.count = target.prevCount
    e.code = '0'

    // 当第一次点击时记录时间
    if (target.prevCount === 1) {
      target.prevTime = new Date().getTime()
    }

    // 当次数满足条件时
    if (target.prevCount >= target.count) {
      // 如果时间也满足条件, 则通过
      if (new Date().getTime() - target.prevTime <= target.timeout) {
        e.code = '1'
      }
      target.prevCount = 0
    }

    target.handler(e)
  }
  var _countClickEvent = function (element, type, handler, isDetach, params) {
    // 构建参数
    element.prevCount = 0
    element.prevTime = new Date().getTime()
    element.count = params && params.count ? params.count : 10 // 点击多少次触发
    element.timeout = params && params.timeout ? params.timeout : 5000 // 点击间隔秒数
    element.handler = handler
    // 添加或移除事件
    function attach() {
      element.addEventListener('click', _countClickEventHandler, false)
    }
    function detach() {
      element.removeEventListener('click', _countClickEventHandler, false)
    }
    if (isDetach) {
      detach()
    } else {
      attach()
    }
  }
  /**
   * 触摸事件
   * @param {DOM} element 目标元素
   * @param {String} type 事件名称, 此函数处理tap | swipeleft | swiperight | swipedown | swipeup事件
   * @param {Function} handler 句柄, handler(e)
   * @param {Boolean} isDetach 是否移除绑定事件, 此为一函数对多type, 所以不允许移除事件, 只能移除句柄
   */
  var _touchEvent = function (element, type, handler, isDetach) {
    var params = {
      threshold: 0
    }
    /* ------------------------
    Model
    ------------------------ */
    var touches = {
      direction: 0,
      vertical: 0,
      horizontal: 0,
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      diffX: 0,
      diffY: 0
    }
    /* ------------------------
    Touch Handler
    ------------------------ */
    var onTouchStart = function (e) {
      touches.startX = e.touches[0].clientX
      touches.startY = e.touches[0].clientY
    }
    var onTouchEnd = function (e) {
      var eventName = ''
      touches.endX = e.changedTouches[0].clientX
      touches.endY = e.changedTouches[0].clientY
      touches.diffX = touches.startX - touches.endX
      touches.diffY = touches.startY - touches.endY
      // 单击事件
      if (Math.abs(touches.diffX) < 6 && Math.abs(touches.diffY) < 6) {
        eventName = 'tap'
      }

      // 设置方向
      if (touches.direction === 0) {
        // 设置滑动方向(-1上下 | 1左右)
        touches.direction = Math.abs(touches.diffX) > Math.abs(touches.diffY) ? 1 : -1
      }
      if (touches.direction === -1) {
        // 设置垂直方向(-1上 | 1下)
        touches.vertical = touches.diffY < 0 ? 1 : -1
      }
      if (touches.direction === 1) {
        // 设置左右方向(-1左 | 1右)
        touches.horizontal = touches.diffX < 0 ? 1 : -1
      }

      // swipeleft | swiperight | swipedown | swipeup 事件
      if (touches.vertical === -1) {
        // 上
        if (Math.abs(touches.diffY) > params.threshold) {
          eventName = 'swipeup'
        }
      } else if (touches.vertical === 1) {
        // 下
        if (Math.abs(touches.diffY) > params.threshold) {
          eventName = 'swipedown'
        }
      } else if (touches.horizontal === -1) {
        // 左
        if (Math.abs(touches.diffY) > params.threshold) {
          eventName = 'swipeleft'
        }
      } else if (touches.horizontal === 1) {
        // 右
        if (Math.abs(touches.diffY) > params.threshold) {
          eventName = 'swiperight'
        }
      }
      // 清空方向
      touches.direction = 0
      touches.vertical = 0
      touches.horizontal = 0
      // 执行函数
      for (var n in element.touchEvents) {
        if (eventName === n) element.touchEvents[n](e)
      }
    }
    /* ------------------------
    Touch Events
    ------------------------ */
    // 绑定事件
    var attach = function () {
      if (Object.keys(element.touchEvents || {}).length === 0) {
        element.touchEvents = {}
        element['addEventListener']('touchstart', onTouchStart, false)
        element['addEventListener']('touchend', onTouchEnd, false)
      }
      element.touchEvents[type] = handler
    }
    // 移除事件
    var detach = function () {
      if (element.touchEvents) delete element.touchEvents[type]
      if (Object.keys(element.touchEvents || {}).length === 0) {
        element['removeEventListener']('touchstart', onTouchStart, false)
        element['removeEventListener']('touchend', onTouchEnd, false)
      }
    }
    // 添加或移除事件
    if (isDetach) {
      detach()
    } else {
      attach()
    }
  }
  /**
   * 摇动事件
   * @param {DOM} element 无
   * @param {String} type 事件名称, 此函数处理shake事件
   * @param {Function} handler 句柄, handler(e)
   * @param {Boolean} isDetach 是否移除绑定事件
   */
  var _shake_handler = null
  var _shake_threshold = 3000 // 晃动速度
  var _shake_lastUpdate = 0 // 设置最后更新时间, 用于对比
  var _shake_curShakeX = 0
  var _shake_curShakeY = 0
  var _shake_curShakeZ = 0
  var _shake_lastShakeX = 0
  var _shake_lastShakeY = 0
  var _shake_lastShakeZ = 0
  var _shakeEventHandler = function (e) {
    var acceleration = e.accelerationIncludingGravity // 获得重力加速
    var curTime = new Date().getTime() // 获得当前时间戳
    if (curTime - _shake_lastUpdate > 100) {
      var diffTime = curTime - _shake_lastUpdate // 时间差
      _shake_lastUpdate = curTime
      _shake_curShakeX = acceleration.x // x轴加速度
      _shake_curShakeY = acceleration.y // y轴加速度
      _shake_curShakeZ = acceleration.z // z轴加速度
      var speed =
        (Math.abs(
          _shake_curShakeX +
            _shake_curShakeY +
            _shake_curShakeZ -
            _shake_lastShakeX -
            _shake_lastShakeY -
            _shake_lastShakeZ
        ) /
          diffTime) *
        10000
      if (speed > _shake_threshold) {
        e.speed = speed
        if (_shake_handler) _shake_handler(e)
      }
      _shake_lastShakeX = _shake_curShakeX
      _shake_lastShakeY = _shake_curShakeY
      _shake_lastShakeZ = _shake_curShakeZ
    }
  }
  var _shakeEvent = function (element, type, handler, isDetach) {
    _shake_handler = handler
    function attach() {
      window.addEventListener('devicemotion', _shakeEventHandler, false)
    }
    function detach() {
      window.removeEventListener('devicemotion', _shakeEventHandler, false)
    }
    // 添加或移除事件
    if (isDetach) {
      detach()
    } else {
      attach()
    }
  }

  /**
   * 返回
   */
  return {
    addHandler: function (element, type, handler, params) {
      // params用于多次点击时控制次数与时长
      // 自定义事件 countclick
      if (type === 'countclick') {
        _countClickEvent(element, 'countclick', handler, false, params) // params: {count: 10, timeout: 5000}
        return
      }
      // touch兼容PC事件
      var isSupportTouch = 'ontouchstart' in window
      if (!isSupportTouch) {
        if (type === 'touchstart') type = 'mousedown'
        if (type === 'touchmove') type = 'mousemove'
        if (type === 'touchend') type = 'mouseup'
        if (type === 'touchcancel') type = 'mouseup'
        if (type === 'tap') type = 'click'
      } else {
        // 自定义事件 tap | swipeleft | swiperight | swipedown | swipeup
        if (
          type === 'tap' ||
          type === 'swipeleft' ||
          type === 'swiperight' ||
          type === 'swipedown' ||
          type === 'swipeup'
        ) {
          _touchEvent(element, type, handler)
          return
        }
      }
      // 重力感应事件
      if (type === 'shake') {
        if (window.DeviceMotionEvent) {
          _shakeEvent(element, 'shake', handler)
        } else {
          console.warn('此设备不支持重力感应')
        }
        return
      }
      // 系统事件
      if (element.addEventListener) {
        element.addEventListener(type, handler, false)
      } else if (element.attachEvent) {
        element.attachEvent('on' + type, handler)
      } else {
        element['on' + type] = handler
      }
    },
    removeHandler: function (element, type, handler) {
      // 自定义事件 countclick
      if (type === 'countclick') {
        _countClickEvent(element, 'countclick', null, true)
        return
      }
      // touch兼容PC事件
      var isSupportTouch = 'ontouchstart' in window
      if (!isSupportTouch) {
        if (type === 'touchstart') type = 'mousedown'
        if (type === 'touchmove') type = 'mousemove'
        if (type === 'touchend') type = 'mouseup'
        if (type === 'touchcancel') type = 'mouseup'
        if (type === 'tap') type = 'click'
      } else {
        // 自定义事件 tap | swipeleft | swiperight | swipedown | swipeup
        if (
          type === 'tap' ||
          type === 'swipeleft' ||
          type === 'swiperight' ||
          type === 'swipedown' ||
          type === 'swipeup'
        ) {
          _touchEvent(element, type, handler, true)
          return
        }
      }
      // 重力感应事件
      if (type === 'shake') {
        if (window.DeviceMotionEvent) {
          _shakeEvent(element, 'shake', handler, true)
        } else {
          console.warn('此设备不支持重力感应')
        }
        return
      }
      // 系统事件
      if (element.removeEventListener) {
        element.removeEventListener(type, handler, false)
      } else if (element.detachEvent) {
        element.detachEvent('on' + type, handler)
      } else {
        element['on' + type] = null
      }
    },
    preventDefault: function (e) {
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        e.returnValue = false
      }
    },
    stopPropagation: function (e) {
      if (e.stopPropagation) {
        e.stopPropagation()
      } else {
        e.cancelBubble = true
      }
    },
    event: function (e) {
      return e || window.e
    },
    type: function (e) {
      return e.type
    },
    target: function (e) {
      return e.target || e.srcElement
    },
    eventClass: function (type) {
      switch (type) {
        case 'click': // Dispatching of 'click' appears to not work correctly in Safari. Use 'mousedown' or 'mouseup' instead.
        case 'mousedown':
        case 'mouseup':
          return 'MouseEvents'

        case 'focus':
        case 'change':
        case 'blur':
        case 'select':
          return 'HTMLEvents'
        default:
          return ''
      }
    },
    trigger(element, type = 'click') {
      if (document.createEvent) {
        var eventClass = this.eventClass(type)
        if (!eventClass) {
          console.warn(`事件不支持${type}`)
          return false
        }
        var evt = document.createEvent(eventClass)
        evt.initEvent(type, true, false)
        element.dispatchEvent(evt)
        return true
      }
      if (document.createEventObject) {
        element.fireEvent(`on${type}`)
        return true
      }
      if (typeof element.onclick == 'function') {
        element[`on${type}`]()
        return true
      }
      return false
    }
  }
})()

export default EventUtil
