import { getTranslateValue } from './utils'

// 日历
let Calendar = function (
  container,
  {
    // Render
    draggable = ['horizontal', 'vertical'],
    threshold = 50,
    cellHeight = 40,

    // Events
    onSlideX = null,
    onSlideY = null
  }
) {
  let s = this
  s.touches = {
    startX: 0,
    startY: 0,
    // 拖动方向: 'vertical|horizontal'
    direction: 0
  }

  s.container = typeof container === 'string' ? document.querySelector(container) : container
  s.body = s.container.querySelector('.calendar-body')
  s.bodyX = s.container.querySelector('.calendar-body-x')
  s.bodyY = s.container.querySelector('.calendar-body-y')
  // s.bodyHeight = s.params.cellHeight * 6

  // Get three pages dates
  s.pages = null

  /* --------------------
  Methods
  -------------------- */
  // s.updateContainer = function () {
  //   s.bodyHeight = s.params.cellHeight * 6
  //   s.body.style.height = s.bodyHeight + 'px'
  // }

  /* --------------------
  Events handle
  -------------------- */
  s.handleTouchStart = function (e) {
    e.stopPropagation()
    s.container.addEventListener('touchmove', (e) => e.preventDefault(), false)
    s.touches.startX = e.touches[0].clientX
    s.touches.startY = e.touches[0].clientY
  }
  s.handleTouchMove = function (e) {
    e.stopPropagation()
    let currentX = e.touches[0].clientX
    let currentY = e.touches[0].clientY
    let diffX = s.touches.startX - currentX
    let diffY = s.touches.startY - currentY

    // 判断拉动方向
    if (s.touches.direction === 0) {
      s.touches.direction = Math.abs(diffX) > Math.abs(diffY) ? 'horizontal' : 'vertical'
    }
    // 禁止上下拖动
    if (draggable?.includes('horizontal') === false && s.touches.direction === 'horizontal') {
      s.touches.direction = null
    }
    // 禁止左右拖动
    if (draggable?.includes('vertical') === false && s.touches.direction === 'vertical') {
      s.touches.direction = null
    }

    // 左右拉动
    if (s.touches.direction === 'horizontal') {
      // bodyX的位置
      let translateX = s.bodyX.getAttribute('data-translateX')
      if (!translateX) {
        translateX = getTranslateValue(s.bodyX.style.transform)
        translateX && s.bodyX.setAttribute('data-translateX', translateX)
      }

      let moveX = translateX - diffX
      s.bodyX.style.transform = 'translateX(' + moveX + 'px)'
    }
    // 上下拉动
    else if (s.touches.direction === 'vertical') {
      // body的高度
      let height = s.body.getAttribute('data-height')
      if (!height) {
        height = s.body.clientHeight
        height && s.body.setAttribute('data-height', height)
      }

      let moveY = height - diffY
      // 边缘禁止拉动
      if (moveY < 40 || moveY > 240) {
        return
      }
      // 上下拉动
      s.body.style.height = moveY + 'px'

      // 跟随上下移动
      let initTranslateY = s.bodyY.getAttribute('data-translateY')
      if (!initTranslateY) {
        initTranslateY = getTranslateValue(s.bodyY.style.transform)
        s.bodyY.setAttribute('data-translateY', initTranslateY)
      }
      let translateY = Number(initTranslateY) + moveY - cellHeight
      if (translateY < 0) {
        s.bodyY.style.transform = `translateY(${translateY}px)`
      }
    }
  }
  s.handleTouchEnd = async function (e) {
    e.stopPropagation()

    let endX = e.clientX || e.changedTouches[0].clientX
    let endY = e.clientY || e.changedTouches[0].clientY
    let diffX = s.touches.startX - endX
    let diffY = s.touches.startY - endY
    let direction = s.touches.direction

    // 清空滑动方向
    s.touches.direction = 0

    // 左右滑动
    if (direction === 'horizontal') {
      // 滑动动作过小，则还原
      if (Math.abs(diffX) < threshold) {
        onSlideX && onSlideX('')
        return
      }

      // 下一页
      if (diffX > 0) {
        onSlideX && onSlideX('next')
      }
      // 上一页
      else {
        onSlideX && onSlideX('previous')
      }
    }
    // 上下滑动
    else if (direction === 'vertical') {
      // 滑动动作过小，则还原
      if (Math.abs(diffY) < threshold) {
        onSlideY && onSlideY('')
        return
      }
      // 展开
      if (diffY < 0) {
        onSlideY && onSlideY('expand')
      }
      // 收缩
      else {
        onSlideY && onSlideY('collapse')
      }
    }
  }

  /* --------------------
  Events control
  -------------------- */
  s.events = function (detach) {
    let action = detach ? 'removeEventListener' : 'addEventListener'
    s.container[action]('touchstart', s.handleTouchStart, false)
    s.container[action]('touchmove', s.handleTouchMove, false)
    s.container[action]('touchend', s.handleTouchEnd, false)
    s.container[action]('touchcancel', s.handleTouchEnd, false)
  }
  s.attach = function () {
    // 禁止拖拽
    if (draggable?.includes('horizontal') === false && draggable?.includes('vertical') === false) {
      return
    }
    s.events()
  }
  s.detach = function () {
    s.events(true)
  }

  // Bind touch events
  s.attach()

  return s
}

export default Calendar
