// PagePull 侧边栏
var PagePull = function (container, params) {
  /* ------------------------
  Model
  ------------------------ */
  var defaults = {
    mainClass: 'page',
    maskClass: 'mask',
    leftClass: 'page-side-left',
    rightClass: 'page-side-right',
    transition: 'push', // push | reveal

    threshold: 20,
    duration: 150,

    isClickMaskHide: true,
    drag: false
    /*
    Callbacks:
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
  s.params = params
  // Container
  s.container = typeof container === 'string' ? document.querySelector(container) : container
  if (!s.container) {
    console.log('SeedsUI Error：未找到Aside的DOM对象，请检查传入参数是否正确')
    return
  }
  // Main
  s.main = s.container.querySelector('.' + s.params.mainClass)
  // Mask
  s.mask = s.container.querySelector('.' + s.params.maskClass)
  if (!s.container || !s.mask) {
    console.log('SeedsUI Error：未找到Aside的Page，请检查传入参数是否正确')
    return
  }
  // Left 左侧栏
  s.left = s.container.querySelector('.' + s.params.leftClass)
  // Right 右侧栏
  s.right = s.container.querySelector('.' + s.params.rightClass)
  if (!s.left && !s.right) {
    return
  }
  s.target = null
  /* ------------------------
  Method
  ------------------------ */
  s.showMask = function () {
    s.mask.style.visibility = 'visible'
    s.mask.style.opacity = '1'
  }
  s.hideMask = function () {
    s.mask.style.visibility = 'hidden'
    s.mask.style.opacity = '0'
  }
  s.show = function (direction) {
    var target = s.target
    target.style.webkitTransitionDuration = s.params.duration + 'ms'
    var x = direction === 'right' ? -s.rightClientWidth : s.leftClientWidth
    s.touches.posX = x
    target.style.webkitTransform = 'translateX(' + x + 'px)'
    // Callback onShowedLeft | onShowedRight
    s.target = target
    if (s.params.onShowedLeft || s.params.onShowedRight) {
      setTimeout(() => {
        if (direction === 'left' && s.params.onShowedLeft) s.params.onShowedLeft(s)
        if (direction === 'right' && s.params.onShowedRight) s.params.onShowedRight(s)
      }, s.params.duration)
    }
  }
  s.hide = function () {
    var target = s.target
    target.style.webkitTransitionDuration = s.params.duration + 'ms'
    target.style.webkitTransform = 'translateX(0px)'
    s.touches.posX = 0
    s.hideMask()
  }
  /* -----------------------
	Touch Events
	----------------------- */
  s.events = function (detach) {
    var touchTarget = s.target
    var action = detach ? 'removeEventListener' : 'addEventListener'
    if (s.params.drag) {
      touchTarget[action]('touchstart', s.onTouchStart, false)
      touchTarget[action]('touchmove', s.onTouchMove, false)
      touchTarget[action]('touchend', s.onTouchEnd, false)
      touchTarget[action]('touchcancel', s.onTouchEnd, false)
    }
    // clickMask
    s.mask[action]('click', s.onClickMask, false)
  }
  // attach、dettach事件
  s.attach = function () {
    s.events()
  }
  s.detach = function () {
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
    diffY: 0,
    posX: 0
  }
  s.onTouchStart = function (e) {
    e.stopPropagation()
    // 清空滑动方向
    s.touches.direction = 0
    s.touches.vertical = 0
    s.touches.horizontal = 0
    // 记录点击坐标
    s.touches.startX = e.touches[0].clientX
    s.touches.startY = e.touches[0].clientY
    s.leftClientWidth = s.left ? s.left.clientWidth : 0
    s.rightClientWidth = s.right ? s.right.clientWidth : 0
    e.currentTarget.style.webkitTransitionDuration = '0ms'
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

    // 左滑
    if (s.touches.diffX + s.touches.posX < -s.rightClientWidth)
      s.touches.diffX = -s.rightClientWidth - s.touches.posX
    // 右滑
    if (s.touches.diffX + s.touches.posX > s.leftClientWidth)
      s.touches.diffX = s.leftClientWidth - s.touches.posX

    // 滑动
    s.showMask()
    e.currentTarget.style.webkitTransform =
      'translateX(' + (s.touches.diffX + s.touches.posX) + 'px)'
  }
  s.onTouchEnd = function (e) {
    e.stopPropagation()
    if (s.touches.direction === -1) {
      // 上下滑动阻止工作
      return
    }
    s.touches.endX = e.clientX || e.changedTouches[0].clientX
    s.touches.endY = e.clientY || e.changedTouches[0].clientY
    if (
      Math.abs(s.touches.startX - s.touches.endX) < 6 &&
      Math.abs(s.touches.startY - s.touches.endY) < 6
    ) {
      // 点击
      s.hide()
    } else if (s.leftClientWidth || s.rightClientWidth) {
      // 滑动
      var direction = s.touches.diffX > 0 ? 'left' : 'right' // 应当显示哪一边,实际left为向右滑动,right反之
      if (Math.abs(s.touches.diffX) > s.params.threshold) {
        // 如果左侧展开,并且向左滑动,则隐藏
        if (s.touches.posX > 0 && direction === 'right') {
          s.hide()
          // 如果右侧展开,并且向右滑动,则隐藏
        } else if (s.touches.posX < 0 && direction === 'left') {
          s.hide()
        } else {
          s.show(direction)
        }
      } else {
        if (s.touches.posX !== 0) {
          s.show(s.touches.posX > 0 ? 'left' : 'right')
        } else {
          s.hide()
        }
      }
    }
  }
  s.onClickMask = function (e) {
    s.target = e.target
    if (s.params.onClickMask) s.params.onClickMask(s)
    if (s.params.isClickMaskHide) {
      s.hide()
    }
    e.stopPropagation()
  }
  /* -----------------------
	Init
	----------------------- */
  s.update = function () {
    if (s.target) {
      s.detach()
    }
    if (this.params.transition === 'reveal') {
      s.target = s.main
    } else {
      s.target = s.container
    }
    s.attach()
  }
  s.update()
}

export default PagePull
