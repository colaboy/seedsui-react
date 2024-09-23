import {
  getDateRowIndex,
  getDates,
  getSplitDates,
  getTranslateValue,
  slideX,
  slideY
} from './utils'

// 日历
let Calendar = function (container, params) {
  // Initial params
  let defaults = {
    // Value
    activeDate: new Date(),
    min: null,
    max: null,
    weekStart: null,

    // Render
    type: 'month',
    threshold: 50,
    duration: 300,
    cellHeight: 40,

    // Events
    onChange: null
  }
  // eslint-disable-next-line
  params = params || {}
  for (let def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def]
    }
  }
  let s = this
  s.params = params
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
  s.bodyHeight = s.params.cellHeight * 6

  // Week row index or 'month'
  s.type = s.params.type

  // Get three pages dates
  s.activeDate = s.params.activeDate || new Date()
  s.pages = null

  /* --------------------
  Methods
  -------------------- */
  s.updateActiveDate = function (date) {
    if (date instanceof Date === false) {
      return
    }
    // 是否跨月，跨月视图会切换，需要触发视图刷新函数
    let isCross = date.getMonth() !== s.activeDate.getMonth()

    // 当前日期
    s.activeDate = date

    // 更新日期数据
    s.init()

    // 如果跨月，表示视图刷新，则需要触发onChange
    if (isCross && s.params.onChange) {
      s.params.onChange(s.activeDate, {
        action: 'change',
        type: typeof s.type === 'number' || s.type === 'week' ? 'week' : 'month',
        weekRowIndex: s.type === 'number' ? s.type : null
      })
    }
  }

  s.updateContainer = function () {
    s.bodyHeight = s.params.cellHeight * 6
    s.body.style.height = s.bodyHeight + 'px'
  }

  // 更新日期数据
  s.updateDates = function () {
    let dates = getDates(s.activeDate, { weekStart: s.params.weekStart })
    s.pages = getSplitDates(dates, {
      weekStart: s.params.weekStart,
      activeDate: s.activeDate,
      type: s.type
    })
  }

  // 左右滑动
  s.slideX = async function (action) {
    s.activeDate = await slideX(action, {
      type: s.type,
      min: s.params.min,
      max: s.params.max,
      duration: s.params.duration,
      activeDate: s.activeDate,
      container: s.container,
      bodyX: s.bodyX,
      bodyY: s.bodyY,
      cellHeight: s.params.cellHeight
    })

    // 更新周的数
    if (s.type !== 'month') {
      s.type = getDateRowIndex(s.activeDate)
    }

    // No action No onChange
    if (!action) {
      return s.activeDate
    }

    // 更新日期数据
    s.updateDates()

    // 左右滑动才需要更新视图
    if (s.params.onChange) {
      s.params.onChange(s.activeDate, {
        action: action,
        type: typeof s.type === 'number' || s.type === 'week' ? 'week' : 'month',
        weekRowIndex: s.type === 'number' ? s.type : null
      })
    }

    return s.activeDate
  }

  // 上下滑动
  s.slideY = async function (action, triggerChange = true) {
    s.type = slideY(action, {
      type: s.type,
      duration: s.params.duration,
      cellHeight: s.params.cellHeight,
      bodyHeight: s.bodyHeight,
      activeDate: s.activeDate,
      body: s.body,
      bodyY: s.bodyY
    })

    // 样式标记展开和收缩
    if (action) {
      s.container.classList.remove('expand')
      s.container.classList.remove('collapse')
      s.container.classList.add(action)
    }

    // 更新日期数据
    s.updateDates()

    // No action No onChange
    if (!action) {
      return s.type
    }

    // Trigger event
    if (triggerChange && s.params.onChange) {
      s.params.onChange(s.activeDate, {
        action: action,
        type: typeof s.type === 'number' || s.type === 'week' ? 'week' : 'month',
        weekRowIndex: s.type === 'number' ? s.type : null
      })
    }

    return s.type
  }

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
      let translateY = Number(initTranslateY) + moveY - s.params.cellHeight
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
      if (Math.abs(diffX) < s.params.threshold) {
        s.slideX('')
        return
      }

      // 下一页
      if (diffX > 0) {
        s.slideX('next')
      }
      // 上一页
      else {
        s.slideX('previous')
      }
    }
    // 上下滑动
    else if (direction === 'vertical') {
      // 滑动动作过小，则还原
      if (Math.abs(diffY) < s.params.threshold) {
        s.slideY('')
        return
      }
      // 展开
      if (diffY < 0) {
        s.slideY('expand')
      }
      // 收缩
      else {
        s.slideY('collapse')
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
    s.events()
  }
  s.detach = function () {
    s.events(true)
  }

  // Bind touch events
  s.attach()

  /* --------------------
  Init
  -------------------- */
  s.init = function () {
    // Init container size
    s.updateContainer()

    // 更新日期数据
    s.updateDates()

    // 周
    if (s.type === 'month') {
      s.slideY('expand', false)
    }
    // 月
    else {
      s.slideY('collapse', false)
    }

    // 初始化显示中间页
    s.slideX('')
  }

  s.init()

  return s
}

export default Calendar
