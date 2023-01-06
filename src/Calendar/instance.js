// Calendar 日历 (require PrototypeDate.js)
var Calendar = function (container, params) {
  /* --------------------
  Model
  -------------------- */
  var defaults = {
    viewType: 'month', // 值为month|week
    disableBeforeDate: null, // 禁用之前的日期
    disableAfterDate: null, // 禁用之后的日期
    defaultDate: null, // 默认选中的日期
    threshold: '50',
    duration: '300',
    cellHeight: '40',
    verticalDrag: true, // 是否允许垂直拖动

    titleFormat: 'YYYY-MM-DD', // 格式化标题, YYYY-MM-DD 第Q季 第WW周 周EE
    showTitleWeek: false, // 是否显示周数
    showTitleDay: false, // 是否显示周几
    // DOM
    calendarClass: 'calendar',
    disableClass: 'calendar-disabled',

    headerClass: 'calendar-header',
    titleClass: 'calendar-title',
    prevClass: 'calendar-prev',
    nextClass: 'calendar-next',
    prevHTML: '&lt',
    nextHTML: '&gt',

    weekContainerClass: 'calendar-day-box',
    weekClass: 'calendar-day',

    wrapperClass: 'calendar-wrapper',
    wrapperXClass: 'calendar-wrapper-x',
    wrapperYClass: 'calendar-wrapper-y',
    monthClass: 'calendar-month',
    monthRowClass: 'calendar-monthrow',
    cellClass: 'calendar-date',
    dateNumClass: 'calendar-datenum',

    // 状态
    currentClass: 'calendar-current',
    notcurrentClass: 'calendar-notcurrent',
    todayClass: 'calendar-today',
    activeClass: 'calendar-active',
    selectedClass: 'calendar-selected'

    /*
    Callbacks:
    cellDOMRender: function(Date)
    onClick:function(Calendar)
    onChange:function(Calendar)
    onHeightChange:function(Calendar)// 高度变化
    onTransitionEnd:function(Calendar)// 动画结束
    onHorizontalTransitionEnd:function(Calendar)// 横滑动画结束
    onVerticalTransitionEnd:function(Calendar)// 竖滑动画结束
    onError:function({errMsg}) // 错误回调
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
  s.params.wrapperHeight = s.params.cellHeight * 6
  // 禁止修改默认值
  Object.defineProperty(s.params, 'defaultDate', {
    enumerable: true,
    configurable: true,
    writable: false
  })

  // 今天
  s.today = new Date()
  // 激活天
  s.activeDate = new Date(s.params.defaultDate || null)
  // 选中天
  s.selectedDate = new Date(s.params.defaultDate || null)
  // Container
  s.container = typeof container === 'string' ? document.querySelector(container) : container
  if (!s.container) {
    console.log('SeedsUI Error：未找到Calendar的DOM对象，请检查传入参数是否正确')
    return
  }
  s.container.width = s.container.clientWidth
  if (!s.container.width)
    s.container.width = window.innerWidth || document.documentElement.clientWidth
  // Header
  s.header = null
  s.title = null
  s.prev = null
  s.next = null
  // Week
  s.weekContainer = null
  s.weeks = []
  // Wrapper
  s.wrapper = null
  s.wrapperX = null
  s.wrapperY = null
  s.months = new Array(3)
  s.dates = []
  // Touch信息
  s.touches = {
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    endX: 0,
    endY: 0,
    diffX: 0,
    diffY: 0,
    posX: 0,
    posY: 0,
    maxPosY: s.params.wrapperHeight - s.params.cellHeight,
    h: s.params.wrapperHeight,
    direction: 0,
    horizontal: 0,
    vertical: 0
  }
  // Header
  s.createHeader = function () {
    var header = document.createElement('div')
    header.setAttribute('class', s.params.headerClass)
    return header
  }
  s.createPrev = function () {
    var prev = document.createElement('div')
    prev.setAttribute('class', s.params.prevClass)
    prev.innerHTML = s.params.prevHTML
    return prev
  }
  s.createNext = function () {
    var next = document.createElement('div')
    next.setAttribute('class', s.params.nextClass)
    next.innerHTML = s.params.nextHTML
    return next
  }
  s.createTitle = function () {
    var title = document.createElement('div')
    title.setAttribute('class', s.params.titleClass)
    return title
  }
  // WeekContainer
  s.createWeekContainer = function () {
    var weekContainer = document.createElement('div')
    weekContainer.setAttribute('class', s.params.weekContainerClass)

    var weekNames = ['日', '一', '二', '三', '四', '五', '六']
    /* eslint-disable */
    for (var i = 0, weekName; (weekName = weekNames[i++]); ) {
      var week = document.createElement('div')
      week.setAttribute('class', s.params.weekClass)
      week.innerHTML = weekName
      weekContainer.appendChild(week)
      s.weeks.push(week)
    }
    /* eslint-enable */

    return weekContainer
  }
  // Wrapper
  s.createWrapper = function () {
    var wrapper = document.createElement('div')
    wrapper.setAttribute('class', s.params.wrapperClass)
    return wrapper
  }
  s.createWrapperY = function () {
    var wrapperY = document.createElement('div')
    wrapperY.setAttribute('class', s.params.wrapperYClass)
    return wrapperY
  }
  s.createWrapperX = function () {
    var wrapperX = document.createElement('div')
    wrapperX.setAttribute('class', s.params.wrapperXClass)
    wrapperX.width = s.container.width * 3
    wrapperX.style.width = s.container.width * 3 + 'px'
    /*
    wrapperX.width=s.container.width*3
    wrapperX.style.width=wrapperX.width+'px'
    */
    for (var i = 0; i < 3; i++) {
      s.months[i] = document.createElement('div')
      s.months[i].setAttribute('class', s.params.monthClass)
      s.months[i].style.width = s.container.width + 'px'
      wrapperX.appendChild(s.months[i])
    }
    return wrapperX
  }
  s.createDates = function () {
    for (var i = 0; i < 3; i++) {
      // 注入到月
      for (var j = 0; j < 6; j++) {
        // 注入行
        var monthRow = document.createElement('div')
        monthRow.setAttribute('class', s.params.monthRowClass)

        for (var k = 0; k < 7; k++) {
          // 注入到星期
          var elCell = document.createElement('div')
          elCell.setAttribute('class', s.params.cellClass)
          elCell.style.height = s.params.cellHeight + 'px'
          elCell.style.lineHeight = s.params.cellHeight + 'px'
          var elDateNum = document.createElement('div')
          elDateNum.setAttribute('class', s.params.dateNumClass)

          elCell.appendChild(elDateNum)
          monthRow.appendChild(elCell)

          s.dates.push(elDateNum)
        }
        s.months[i].appendChild(monthRow)
      }
    }
  }
  // 创建DOM
  s.create = function () {
    // 创建头部
    if (s.container.querySelector('.' + s.params.headerClass)) {
      s.header = s.container.querySelector('.' + s.params.headerClass)
      s.prev = s.container.querySelector('.' + s.params.prevClass)
      s.next = s.container.querySelector('.' + s.params.nextClass)
      s.title = s.container.querySelector('.' + s.params.titleClass)
    } else {
      s.header = s.createHeader()
      s.prev = s.createPrev()
      s.next = s.createNext()
      s.title = s.createTitle()

      s.header.appendChild(s.prev)
      s.header.appendChild(s.title)
      s.header.appendChild(s.next)
      s.container.appendChild(s.header)
    }
    // 创建周
    if (s.container.querySelector('.' + s.params.weekContainerClass)) {
      s.weekContainer = s.container.querySelector('.' + s.params.weekContainerClass)
    } else {
      s.weekContainer = s.createWeekContainer()

      s.container.appendChild(s.weekContainer)
    }
    // 创建主体
    s.wrapper = s.createWrapper()
    s.wrapperX = s.createWrapperX()
    s.wrapperY = s.createWrapperY()
    s.wrapperY.appendChild(s.wrapperX)
    s.wrapper.appendChild(s.wrapperY)
    s.container.appendChild(s.wrapper)
    s.createDates()
  }
  s.create()
  /* --------------------
  Method
  -------------------- */
  // 校验选中日期是否正确
  s.validate = function (jumpDate) {
    if (jumpDate instanceof Date === false) {
      return
    }
    let min = s.params.disableBeforeDate
    let max = s.params.disableAfterDate
    // 如果最小值大于等于最大值则无法生效
    if (min instanceof Date && max instanceof Date && min.compareDate(max) >= 1) {
      let errMsg =
        '最小值min' +
        min.format('YYYY年MM月DD日') +
        '不能大于等于max' +
        max.format('YYYY年MM月DD日')
      console.log('SeedsUI Warn：' + errMsg)
      if (s.params.onError)
        s.params.onError({ errMsg: errMsg, min: min, max: max, value: jumpDate, instance: s })
      return false
    }
    // 小于最小值
    if (min instanceof Date && jumpDate.compareDate(min) === -1) {
      let errMsg = '禁止访问' + min.format('YYYY年MM月DD日') + '前的日期'
      console.log('SeedsUI Warn：' + errMsg)
      if (s.params.onError)
        s.params.onError({ errMsg: errMsg, min: min, value: jumpDate, instance: s })
      return -1
    }
    // 大于最大值
    if (max instanceof Date && jumpDate.compareDate(max) === 1) {
      let errMsg = '禁止访问' + max.format('YYYY年MM月DD日') + '后的日期'
      console.log('SeedsUI Warn：' + errMsg)
      if (s.params.onError)
        s.params.onError({ errMsg: errMsg, max: max, value: jumpDate, instance: s })
      return 1
    }
    return true
  }
  // 容器操作类
  s.addDuration = function () {
    s.wrapper.style.webkitTransitionDuration = s.params.duration + 'ms'
    s.wrapperY.style.webkitTransitionDuration = s.params.duration + 'ms'
    s.wrapperX.style.webkitTransitionDuration = s.params.duration + 'ms'
  }
  s.removeDuration = function () {
    s.wrapper.style.webkitTransitionDuration = '0ms'
    s.wrapperY.style.webkitTransitionDuration = '0ms'
    s.wrapperX.style.webkitTransitionDuration = '0ms'
  }
  s.updateTranslateX = function () {
    s.removeDuration()
    s.touches.posX = -s.container.width
    s.wrapperX.style.webkitTransform = 'translateX(' + s.touches.posX + 'px)'
  }
  s.updateContainerHeight = function () {
    // 更新高度
    if (s.params.viewType === 'month') {
      // 展开
      s.touches.h = s.params.wrapperHeight
    } else if (s.params.viewType === 'week') {
      // 收缩
      s.touches.h = s.params.cellHeight
    }
    s.wrapper.style.height = s.touches.h + 'px'
    s.wrapperY.style.webkitTransform = 'translateY(-' + s.touches.posY + 'px)'
  }
  s.updateContainerWidth = function () {
    // 更新宽度
    s.container.width = s.container.clientWidth
    s.wrapperX.width = s.container.width * 3 + 'px'
    /*
    s.wrapperX.width=s.container.width*3
    s.wrapperX.style.width=s.wrapperX.width.width+'px'
    */
    for (var i = 0; i < 3; i++) {
      s.months[i].style.width = s.container.width + 'px'
    }
  }
  s.updateContainerSize = function () {
    s.updateContainerHeight()
    s.updateContainerWidth()
    s.updateTranslateX()
  }
  s.updateClasses = function () {
    // 更新容器尺寸
    s.updateContainerHeight()
    // 位置还原
    s.updateTranslateX()
  }
  s.updateClasses()
  // 左右滑动
  s.slideXTo = function (index) {
    s.touches.posX = -s.container.width * index
    s.addDuration()
    s.wrapperX.style.webkitTransform = 'translateX(' + s.touches.posX + 'px)'
    // 刷新数据
    if (index === 0) {
      // 上一页
      if (s.params.viewType === 'month') {
        s.activeDate.prevMonth()
      } else if (s.params.viewType === 'week') {
        s.wrapperY.style.webkitTransitionDuration = '0ms'
        s.activeDate.prevWeek()
      }
    } else if (index === 2) {
      // 下一页
      if (s.params.viewType === 'month') {
        s.activeDate.nextMonth()
      } else if (s.params.viewType === 'week') {
        s.wrapperY.style.webkitTransitionDuration = '0ms'
        s.activeDate.nextWeek()
      }
    }
    /*
    // 滑动到禁用
    if((s.params.disableBeforeDate && s.activeDate < s.params.disableBeforeDate)||(s.params.disableAfterDate && s.activeDate > s.params.disableAfterDate)){
      return
    }
    */
    s.draw()
  }
  // 上下滑动
  s.dragY = function (heightY) {
    s.wrapper.style.height = heightY + 'px'
    var translateY = s.params.wrapperHeight - heightY
    if (translateY <= s.touches.maxPosY) {
      s.wrapperY.style.webkitTransform = 'translateY(-' + translateY + 'px)'
    }
  }
  s.slideYTo = function (index) {
    s.addDuration()
    if (index === 1) {
      // 展开
      s.params.viewType = 'month'
      s.touches.posY = 0
      s.draw(1)
    } else if (index === -1) {
      // 收缩
      s.params.viewType = 'week'
      s.touches.posY = s.touches.maxPosY
      s.draw(-1)
    } else {
      s.dragY(s.touches.h)
    }
  }
  // 绘制日历
  var today = new Date()
  s.isToday = function (date) {
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
      return true
    return false
  }
  s.data = []
  s.updateData = function () {
    s.data = s.activeDate.getCalendarData()
    var activeRowIndex = s.data.activeRowIndex
    if (s.params.viewType === 'week') {
      s.touches.maxPosY = activeRowIndex * s.params.cellHeight
      s.touches.posY = s.touches.maxPosY
      var prevWeek = s.activeDate.getPrevWeekData()
      var nextWeek = s.activeDate.getNextWeekData()
      var start1 = activeRowIndex * 7
      var start2 = start1 + 84
      // 修改同行上周
      for (var i = 0, datIndex1 = start1; i < 7; i++) {
        s.data[datIndex1] = prevWeek[i]
        datIndex1++
      }
      // 修改同行下周
      for (var j = 0, datIndex2 = start2; j < 7; j++) {
        s.data[datIndex2] = nextWeek[j]
        datIndex2++
      }
    }
  }
  s.drawHeader = function () {
    var activeDate = s.activeDate
    var titleFormatStr = s.params.titleFormat
    if (titleFormatStr) {
      s.title.innerHTML = activeDate.format(titleFormatStr)
    } else {
      activeDate.format('YYYY-MM-DD')
    }
  }
  s.draw = function (vertical) {
    // vertical:上下拖动(-1上 | 1下 | 其它为非上下拖动)
    // 更新选中日期
    s.updateData()
    // 注入身体
    var activeIndex = s.data.activeIndex
    for (var i = 0; i < s.dates.length; i++) {
      s.dates[i].innerHTML = s.data[i].getDate()

      // 自定义绘制单元格
      if (s.params.cellDOMRender) {
        let cellDOM = s.params.cellDOMRender(s.data[i])
        if (typeof cellDOM === 'string') {
          s.dates[i].innerHTML = cellDOM
        } else {
          s.dates[i].appendChild(cellDOM)
        }
      }

      // index
      s.dates[i].index = i
      // class
      s.dates[i].className = s.params.dateNumClass
      // class-currentClass
      if (s.data[i].isCurrent) s.dates[i].classList.add(s.params.currentClass)
      else s.dates[i].classList.add(s.params.notcurrentClass)
      // class-todayClass
      if (s.isToday(s.data[i])) s.dates[i].classList.add(s.params.todayClass)
      // class-activeClass
      if (i === activeIndex && s.activeDate) s.dates[i].classList.add(s.params.activeClass)
      // class-selectedClass
      if (s.data[i].toLocaleDateString() === s.selectedDate.toLocaleDateString()) {
        s.dates[i].classList.add(s.params.selectedClass)
      }
      // 禁用日期
      if (
        s.params.disableBeforeDate &&
        s.data[i].setHours(0, 0, 0, 0) < s.params.disableBeforeDate.setHours(0, 0, 0, 0)
      ) {
        s.dates[i].classList.add(s.params.disableClass)
      }
      if (
        s.params.disableAfterDate &&
        s.data[i].setHours(0, 0, 0, 0) > s.params.disableAfterDate.setHours(0, 0, 0, 0)
      ) {
        s.dates[i].classList.add(s.params.disableClass)
      }
    }
    s.updateContainerHeight()
    // 非上下滑动时需要校验日期是否正确
    let validate = true
    if (!vertical) {
      validate = s.validate(s.activeDate)
      // 滑动到禁用
      if (validate === -1) {
        // 小于最小值
        s.activeDate.nextMonth()
        s.draw()
        return
      }
      if (validate === 1) {
        // 大于最大值
        s.activeDate.prevMonth()
        s.draw()
        return
      }
    }
    // 注入头部
    s.drawHeader()
    if (vertical) {
      s.vertical = vertical
      // Callback onHeightChange
      if (s.params.onHeightChange) s.params.onHeightChange(s)
    } else {
      // Callback onChange
      if (validate === true && s.params.onChange) s.params.onChange(s)
    }
  }
  s.draw()
  s.setActiveDate = function (target) {
    for (var i = 0; i < s.dates.length; i++) {
      s.dates[i].classList.remove(s.params.activeClass)
      s.dates[i].classList.remove(s.params.selectedClass)
    }
    // 选中日期
    s.activeDate.setTime(s.data[target.index].getTime())
    s.selectedDate.setTime(s.data[target.index].getTime())
    // 重新绘制
    s.draw()
  }
  s.showMonth = function () {
    s.slideYTo(1)
  }
  s.showWeek = function () {
    s.slideYTo(-1)
  }
  s.setDate = function (date) {
    if (date instanceof Date === false) {
      return
    }
    // 校验
    if (s.validate(date) !== true) {
      return
    }
    s.activeDate.setTime(date.getTime())
    s.draw()
  }
  s.setDefaultDate = function () {
    if (!s.params.defaultDate) {
      console.log('SeedsUI Warn: 没有设置defaultDate默认时间')
      return
    }
    // 选中日期
    s.activeDate.setTime(s.params.defaultDate.getTime())
    // 重新绘制
    s.draw()
  }
  /* --------------------
  Control
  -------------------- */
  s.events = function (detach) {
    var action = detach ? 'removeEventListener' : 'addEventListener'
    s.wrapper[action]('touchstart', s.onTouchStart, false)
    s.wrapper[action]('touchmove', s.onTouchMove, false)
    s.wrapper[action]('touchend', s.onTouchEnd, false)
    s.wrapper[action]('touchcancel', s.onTouchEnd, false)
    s.wrapper[action]('webkitTransitionEnd', s.onTransitionEnd, false)
    s.wrapper[action]('click', s.onClick, false)

    s.prev[action]('click', s.slideXToPrev, false)
    s.next[action]('click', s.slideXToNext, false)
  }
  // attach、dettach事件
  s.attach = function (event) {
    s.events()
  }
  s.detach = function (event) {
    s.events(true)
  }
  s.preventDefault = function (e) {
    e.preventDefault()
  }
  // Event Handler
  s.slideXToPrev = function (e) {
    s.slideXTo(0)
  }
  s.slideXToNext = function (e) {
    s.slideXTo(2)
  }
  s.onClick = function (e) {
    s.target = e.target
    s.event = e
    // 点击禁用日期
    if (e.target.classList.contains(s.params.disableClass)) return
    // 点击日期
    s.removeDuration()
    if (e.target.classList.contains(s.params.dateNumClass)) {
      s.setActiveDate(e.target)
    }
    // Callback onClick
    if (s.params.onClick) s.params.onClick(s)
  }
  s.onTouchStart = function (e) {
    e.stopPropagation()
    s.container.addEventListener('touchmove', s.preventDefault, false)
    s.touches.startX = e.touches[0].clientX
    s.touches.startY = e.touches[0].clientY
  }
  s.onTouchMove = function (e) {
    e.stopPropagation()
    s.touches.currentX = e.touches[0].clientX
    s.touches.currentY = e.touches[0].clientY
    s.touches.diffX = s.touches.startX - s.touches.currentX
    s.touches.diffY = s.touches.startY - s.touches.currentY

    // 设置滑动方向(-1上下 | 1左右)
    if (s.touches.direction === 0) {
      s.touches.direction = Math.abs(s.touches.diffX) > Math.abs(s.touches.diffY) ? 1 : -1
    }

    if (s.touches.direction === 1) {
      // 左右滑动
      var moveX = s.touches.posX - s.touches.diffX
      if (moveX < 0 && Math.abs(moveX) < s.container.width * 2) {
        // 判断是否是边缘
        s.touches.horizontal = moveX < s.touches.posX ? 1 : -1 // 设置方向(左右)
        s.wrapperX.style.webkitTransform = 'translateX(' + moveX + 'px)'
      }
    } else if (s.touches.direction === -1) {
      // 上下滑动
      if (s.params.verticalDrag === true) {
        // 允许Y滑动的情况下
        var heightY = s.touches.h - s.touches.diffY
        if (heightY > s.params.cellHeight && heightY < s.params.wrapperHeight) {
          // 判断是否是边缘
          s.touches.vertical = heightY > s.touches.h ? 1 : -1 // 设置方向(上下)
          s.dragY(heightY)
        }
      } else {
        s.container.removeEventListener('touchmove', s.preventDefault, false)
      }
    }
  }
  s.onTouchEnd = function (e) {
    e.stopPropagation()
    if (s.touches.direction === 1) {
      // 左右滑动
      if (Math.abs(s.touches.diffX) < s.params.threshold) s.touches.horizontal = 0
      if (s.touches.horizontal === 1) s.slideXTo(2)
      // 下一页
      else if (s.touches.horizontal === -1) s.slideXTo(0)
      // 上一页
      else s.slideXTo(1) // 还原当前页
    } else if (s.touches.direction === -1) {
      // 上下滑动
      if (s.params.verticalDrag === true) {
        // 允许Y滑动的情况下
        if (Math.abs(s.touches.diffY) < s.params.threshold) s.touches.vertical = 0
        if (s.touches.vertical === 1) s.slideYTo(1)
        // 展开
        else if (s.touches.vertical === -1) s.slideYTo(-1)
        // 收缩
        else s.slideYTo(0) // 还原当前页
      }
    }

    // 清空滑动方向
    s.touches.direction = 0
    s.touches.horizontal = 0
    s.touches.vertical = 0
  }
  s.onTransitionEnd = function (e) {
    s.target = e.target
    s.event = e
    // 横向滑动时需要还原位置
    if (s.target.classList.contains(s.params.wrapperXClass)) {
      // 还原位置
      s.updateTranslateX()
      // Callback onHorizontalTransitionEnd
      if (s.params.onHorizontalTransitionEnd) s.params.onHorizontalTransitionEnd(s)
    }
    // 竖向滑动
    if (e.target.classList.contains(s.params.wrapperYClass)) {
      // Callback onVerticalTransitionEnd
      if (s.params.onVerticalTransitionEnd) s.params.onVerticalTransitionEnd(s)
    }
    // Callback onTransitionEnd
    if (s.params.onTransitionEnd) s.params.onTransitionEnd(s)
  }
  /* --------------------
  Init
  -------------------- */
  s.init = function () {
    s.attach()
  }
  s.init()
}

export default Calendar
