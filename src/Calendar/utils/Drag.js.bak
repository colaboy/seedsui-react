import { getTranslateValue } from './../utils'

// 日历
let Drag = function (
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
  s.onSlideX = onSlideX
  s.onSlideY = onSlideY

  let touches = {
    startX: 0,
    startY: 0,
    // 拖动方向: 'vertical|horizontal'
    direction: 0
  }

  let body = container.querySelector('.calendar-body')
  let bodyX = container.querySelector('.calendar-body-x')
  let bodyY = container.querySelector('.calendar-body-y')

  /* --------------------
  Events handle
  -------------------- */
  function handleTouchStart(e) {
    e.stopPropagation()
    container.addEventListener('touchmove', (e) => e.preventDefault(), false)
    touches.startX = e.touches[0].clientX
    touches.startY = e.touches[0].clientY
  }
  function handleTouchMove(e) {
    e.stopPropagation()
    let currentX = e.touches[0].clientX
    let currentY = e.touches[0].clientY
    let diffX = touches.startX - currentX
    let diffY = touches.startY - currentY

    // 判断拉动方向
    if (touches.direction === 0) {
      touches.direction = Math.abs(diffX) > Math.abs(diffY) ? 'horizontal' : 'vertical'
    }
    // 禁止上下拖动
    if (draggable?.includes('horizontal') === false && touches.direction === 'horizontal') {
      touches.direction = null
    }
    // 禁止左右拖动
    if (draggable?.includes('vertical') === false && touches.direction === 'vertical') {
      touches.direction = null
    }

    // 左右拉动
    if (touches.direction === 'horizontal') {
      // bodyX的位置
      let translateX = bodyX.getAttribute('data-translateX')
      if (!translateX) {
        translateX = getTranslateValue(bodyX.style.transform)
        translateX && bodyX.setAttribute('data-translateX', translateX)
      }

      let moveX = translateX - diffX
      bodyX.style.transform = 'translateX(' + moveX + 'px)'
    }
    // 上下拉动
    else if (touches.direction === 'vertical') {
      // body的高度
      let height = body.getAttribute('data-height')
      if (!height) {
        height = body.clientHeight
        height && body.setAttribute('data-height', height)
      }

      let moveY = height - diffY
      // 边缘禁止拉动
      if (moveY < 40 || moveY > 240) {
        return
      }
      // 上下拉动
      body.style.height = moveY + 'px'

      // 跟随上下移动
      let initTranslateY = bodyY.getAttribute('data-translateY')
      if (!initTranslateY) {
        initTranslateY = getTranslateValue(bodyY.style.transform)
        bodyY.setAttribute('data-translateY', initTranslateY)
      }
      let translateY = Number(initTranslateY) + moveY - cellHeight
      if (translateY < 0) {
        bodyY.style.transform = `translateY(${translateY}px)`
      }
    }
  }
  async function handleTouchEnd(e) {
    e.stopPropagation()

    let endX = e.clientX || e.changedTouches[0].clientX
    let endY = e.clientY || e.changedTouches[0].clientY
    let diffX = touches.startX - endX
    let diffY = touches.startY - endY
    let direction = touches.direction

    // 清空滑动方向
    touches.direction = 0

    // 左右滑动
    if (direction === 'horizontal') {
      // 滑动动作过小，则还原
      if (Math.abs(diffX) < threshold) {
        s.onSlideX && s.onSlideX('')
        return
      }

      // 下一页
      if (diffX > 0) {
        s.onSlideX && s.onSlideX('next')
      }
      // 上一页
      else {
        s.onSlideX && s.onSlideX('previous')
      }
    }
    // 上下滑动
    else if (direction === 'vertical') {
      // 滑动动作过小，则还原
      if (Math.abs(diffY) < threshold) {
        s.onSlideY && s.onSlideY('')
        return
      }
      // 展开
      if (diffY < 0) {
        s.onSlideY && s.onSlideY('expand')
      }
      // 收缩
      else {
        s.onSlideY && s.onSlideY('collapse')
      }
    }
  }

  /* --------------------
  Events control
  -------------------- */
  s.events = function (action) {
    container[action]('touchstart', handleTouchStart, false)
    container[action]('touchmove', handleTouchMove, false)
    container[action]('touchend', handleTouchEnd, false)
    container[action]('touchcancel', handleTouchEnd, false)
  }

  return s
}

export default Drag
