import DB from './db'

//  EventUtil 事件函数
var EventUtil = (function () {
  // 多次点击事件, multipleClick
  var _listenMultipleClickEvent = function (element, type, handler, isDetach) {
    function attach () {
      element.addEventListener('click', multipleClickHandler, false)
    }
    function detach () {
      console.log('移除click')
      element.removeEventListener('click', multipleClickHandler, false);
    }
    // 添加或移除事件
    if (isDetach) {
      detach()
    } else {
      attach()
    }
    var allcount = 10 // 点击多少次触发
    var space = 5000 // 点击间隔秒数
    function multipleClickHandler (e) {
      // 次数
      var counter = DB.getSession('onMultipleClick_counter') || 0
      if (counter === 0) {
        DB.setSession('onMultipleClick_time', new Date().getTime())
      }
      // 时间
      var time = DB.getSession('onMultipleClick_time')

      // 设置次数
      counter += 1
      DB.setSession('onMultipleClick_counter', counter)
      // 到达设定次数
      if (counter === allcount) {
        // 点击小于间隔秒钟有效
        if ((new Date().getTime() - time) < space) {
          handler(e)
          DB.setSession('onMultipleClick_counter', 0)
        } else {
          DB.setSession('onMultipleClick_counter', 0)
          return
        }
      }
    }
  }
  // 滑动事件,tap | swipeleft | swiperight | swipedown | swipeup
  var _listenTouchEvent = function (element, type, handler, isDetach) {
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
      if (touches.direction === 0) { // 设置滑动方向(-1上下 | 1左右)
        touches.direction = Math.abs(touches.diffX) > Math.abs(touches.diffY) ? 1 : -1
      }
      if (touches.direction === -1) { // 设置垂直方向(-1上 | 1下)
        touches.vertical = touches.diffY < 0 ? 1 : -1
      }
      if (touches.direction === 1) { // 设置左右方向(-1左 | 1右)
        touches.horizontal = touches.diffX < 0 ? 1 : -1
      }

      // swipeleft | swiperight | swipedown | swipeup 事件
      if (touches.vertical === -1) { // 上
        if (Math.abs(touches.diffY) > params.threshold) {
          eventName = 'swipeup'
        }
      } else if (touches.vertical === 1) { // 下
        if (Math.abs(touches.diffY) > params.threshold) {
          eventName = 'swipedown'
        }
      } else if (touches.horizontal === -1) { // 左
        if (Math.abs(touches.diffY) > params.threshold) {
          eventName = 'swipeleft'
        }
      } else if (touches.horizontal === 1) { // 右
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
  // 摇动事件, shake
  var _listenShakeEvent = function (element, type, handler, isDetach) {
    var threshold = 3000 // 晃动速度
    var lastUpdate = 0 // 设置最后更新时间，用于对比
    var curShakeX = 0
    var curShakeY = 0
    var curShakeZ = 0
    var lastShakeX = 0
    var lastShakeY = 0
    var lastShakeZ = 0
    function deviceMotionHandler (e) {
      var acceleration = e.accelerationIncludingGravity // 获得重力加速
      var curTime = new Date().getTime()// 获得当前时间戳
      if ((curTime - lastUpdate) > 100) {
        var diffTime = curTime - lastUpdate // 时间差
        lastUpdate = curTime
        curShakeX = acceleration.x // x轴加速度
        curShakeY = acceleration.y // y轴加速度
        curShakeZ = acceleration.z // z轴加速度
        var speed = Math.abs(curShakeX + curShakeY + curShakeZ - lastShakeX - lastShakeY - lastShakeZ) / diffTime * 10000
        if (speed > threshold) {
          var ev = e
          ev.speed = speed
          handler(ev)
        }
        lastShakeX = curShakeX
        lastShakeY = curShakeY
        lastShakeZ = curShakeZ
      }
    }
    function attach () {
      if (!window.DeviceMotionEvent) {
        alert('您好，你目前所用的设备好像不支持重力感应哦！')
        return
      }
      window.addEventListener('devicemotion', deviceMotionHandler, false)
    }
    function detach () {
      window.removeEventListener('devicemotion', deviceMotionHandler, false);
    }
    // 添加或移除事件
    if (isDetach) {
      detach()
    } else {
      attach()
    }
  }
  return {
    addHandler: function (element, type, handler) {
      // 多次点击事件
      if (type === 'multipleClick') {
        _listenMultipleClickEvent(element, type, handler)
        return
      }
      // 自定义事件 tap | swipeleft | swiperight | swipedown | swipeup
      if (type === 'tap' || type === 'swipeleft' || type === 'swiperight' || type === 'swipedown' || type === 'swipeup') {
        _listenTouchEvent(element, type, handler)
        return
      }
      // 摇动事件
      if (type === 'shake') {
        _listenShakeEvent(element, type, handler)
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
      // 多次点击事件
      if (type === 'multipleClick') {
        _listenMultipleClickEvent(element, type, handler, true)
        return
      }
      // 自定义事件 tap | swipeleft | swiperight | swipedown | swipeup
      if (type === 'tap' || type === 'swipeleft' || type === 'swiperight' || type === 'swipedown' || type === 'swipeup') {
        _listenTouchEvent(element, type, handler, true)
        return
      }
      // 自定义事件 shake
      if (type === 'shake') {
        _listenShakeEvent(element, type, handler, true)
        return
      }
      // 自定义事件 shake
      if (type === 'shake') {
        _listenShakeEvent(element, type, handler, true)
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
    }
  }
})()

;//export default EventUtil
