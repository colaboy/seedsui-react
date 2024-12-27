// ListPull 列表滑动菜单
var ListPull = function (container, params) {
  /* -----------------------
	Model
	----------------------- */
  var defaults = {
    containerClass: 'list-pull-li',
    leftClass: 'list-pull-left',
    rightClass: 'list-pull-right',
    handlerClass: 'list-pull-handler',
    activeClass: 'active',
    threshold: 20,
    duration: 150
    /*
		Callbacks:
		onClick:function(s)

		onPull:function(s)
		onShowedLeft:function(s)
		onShowedRight:function(s)
		*/
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
  s.container = typeof container === 'string' ? document.querySelector(container) : container
  if (!s.container) {
    console.log('SeedsUI Error：未找到ListPull的DOM对象，请检查传入参数是否正确')
    return
  }
  /* -----------------------
	Method
	----------------------- */
  s.hide = function (target) {
    // target为handler区域(s.params.handlerClass)
    if (!target) {
      var actives = s.container.querySelectorAll('.' + s.params.activeClass)
      if (actives.length > 0) target = actives[0]
    }
    if (target) {
      target.style.webkitTransitionDuration = s.params.duration + 'ms'
      target.style.webkitTransform = 'translate3d(0px,0px,0px)'
      target.classList.remove(s.params.activeClass)
    }
  }
  s.show = function (target, direction) {
    target.style.webkitTransitionDuration = s.params.duration + 'ms'
    var x = direction === 'right' ? -s.rightClientWidth : s.leftClientWidth
    target.style.webkitTransform = 'translate3d(' + x + 'px,0px,0px)'
    target.classList.add(s.params.activeClass)
    // Callback onShowedLeft | onShowedRight
    if (s.params.onShowedLeft || s.params.onShowedRight) {
      setTimeout(() => {
        if (direction === 'left' && s.params.onShowedLeft) s.params.onShowedLeft(s)
        if (direction === 'right' && s.params.onShowedRight) s.params.onShowedRight(s)
      }, s.params.duration)
    }
  }
  /* -----------------------
	Touch Events
	----------------------- */
  s.events = function (detach) {
    var touchTarget = s.container
    var action = detach ? 'removeEventListener' : 'addEventListener'
    touchTarget[action]('touchstart', s.onTouchStart, false)
    touchTarget[action]('touchmove', s.onTouchMove, false)
    touchTarget[action]('touchend', s.onTouchEnd, false)
    touchTarget[action]('touchcancel', s.onTouchEnd, false)
  }
  s.attach = function (event) {
    s.events()
  }
  s.detach = function (event) {
    s.events(true)
  }
  /* -----------------------
	Touch Handler
	----------------------- */
  // Touch信息
  s.touches = {
    direction: 0,
    vertical: 0,
    horizontal: 0,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    endX: 0,
    endY: 0,
    diffX: 0,
    diffY: 0
  }
  // 索引
  s.activeIndex = 0

  s.onTouchStart = function (e) {
    e.stopPropagation()
    // 清空滑动方向
    s.touches.direction = 0
    s.touches.vertical = 0
    s.touches.horizontal = 0
    // 记录点击坐标
    s.touches.startX = e.touches[0].clientX
    s.touches.startY = e.touches[0].clientY

    s.target = e.target.closest('.' + s.params.containerClass).querySelector('.' + s.params.handlerClass)
    // 如果点击时有展开的列表项，并且点击的是handler区域(s.params.handlerClass), 则先收缩
    var actives = s.container.querySelectorAll('.' + s.params.activeClass)
    if (actives.length > 0) {
      s.hide()
      s.hasActive = true
      s.leftClientWidth = 0
      s.rightClientWidth = 0
    } else {
      s.hasActive = false
      // 拉动对象
      var left = s.target.parentNode.querySelector('.' + s.params.leftClass)
      var right = s.target.parentNode.querySelector('.' + s.params.rightClass)
      s.leftClientWidth = left ? left.clientWidth : 0
      s.rightClientWidth = right ? right.clientWidth : 0
    }
  }
  s.onTouchMove = function (e) {
    e.stopPropagation()
    if (!s.leftClientWidth && !s.rightClientWidth) return
    s.touches.currentX = e.touches[0].clientX
    s.touches.currentY = e.touches[0].clientY
    s.touches.diffX = s.touches.currentX - s.touches.startX
    s.touches.diffY = s.touches.currentY - s.touches.startY

    // 设置滑动方向
    if (s.touches.direction === 0) {
      // 设置滑动方向(-1上下 | 1左右)
      s.touches.direction = Math.abs(s.touches.diffX) > Math.abs(s.touches.diffY) ? 1 : -1
    }
    if (s.touches.direction === -1) {
      // 设置垂直方向(-1上 | 1下)
      s.touches.vertical = s.touches.diffY < 0 ? 1 : -1
    }
    if (s.touches.direction === 1) {
      // 设置左右方向(-1左 | 1右)
      s.touches.horizontal = s.touches.diffX < 0 ? 1 : -1
    }

    // 如果是上下滑动则不工作
    if (s.touches.vertical !== 0) {
      return
    }

    if (s.touches.diffX < -s.rightClientWidth) s.touches.diffX = -s.rightClientWidth
    if (s.touches.diffX > s.leftClientWidth) s.touches.diffX = s.leftClientWidth

    // Callback onPull
    if (s.params.onPull) s.params.onPull(s)

    // 滑动
    s.target.style.webkitTransform = 'translate3d(' + s.touches.diffX + 'px,0px,0px)'
  }
  s.onTouchEnd = function (e) {
    e.stopPropagation()

    if (s.touches.direction === -1) {
      // 上下滑动阻止工作
      return
    }
    s.touches.endX = e.clientX || e.changedTouches[0].clientX
    s.touches.endY = e.clientY || e.changedTouches[0].clientY
    s.event = e
    // 点击
    if (
      Math.abs(s.touches.startX - s.touches.endX) < 6 &&
      Math.abs(s.touches.startY - s.touches.endY) < 6
    ) {
      // 如果在展开状态下, 点击非左右按钮, 则不触发点击
      const direction = e.target.getAttribute('data-direction')
      if (s.hasActive && !direction) {
      } else {
        if (s.params.onClick) s.params.onClick(s)
      }
    }
    // 滑动
    else if (s.leftClientWidth || s.rightClientWidth) {
      if (Math.abs(s.touches.diffX) > s.params.threshold) {
        s.show(s.target, s.touches.diffX > 0 ? 'left' : 'right')
      } else {
        s.hide(s.target)
      }
    }
  }
  // Init
  s.init = function () {
    s.attach()
  }
  s.init()
}

export default ListPull
