// 固定表格
var FixTable = function (container, params) {
  var defaults = {
    onScroll: null,
    onBottomRefresh: null
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
    console.log('SeedsUI Error：未找到Gauge的DOM对象，请检查传入参数是否正确')
    return
  }

  // 固定容器
  s.fixedContainer = s.container.querySelector('.fixtable-fixed')
  s.fixedHead = s.container.querySelector('.fixtable-fixed-head')

  // 滚动容器
  s.scrollerContainer = s.container.querySelector('.fixtable-scroller')
  s.scrollerTable = s.container.querySelector('.fixtable-scroller-table')


  /* --------------------
  Methods
  -------------------- */
  // 匹配数字
  s.matchNumber = function (str) {
    return str.match(/[+-]?(0|([1-9][0-9]*))(\.[0-9]+)?/igm)
  }
  // 取出单位中的数字
  // s.getNumberByUnit = function (unit) {
  //   var match = s.matchNumber(unit)
  //   if (match && match[0]) return match[0]
  //   return 0
  // }
  // 取出padding的宽高
  // s.elPaddingSize = function (el) {
  //   var style = window.getComputedStyle(el)
  //   // 转成四个值
  //   var padding = style.getPropertyValue('padding')
  //   var paddingLeft = style.getPropertyValue('padding-left') || 0
  //   var paddingRight = style.getPropertyValue('padding-right') || 0
  //   var paddingTop = style.getPropertyValue('padding-top') || 0
  //   var paddingBottom = style.getPropertyValue('padding-bottom') || 0
  //   if (paddingLeft || paddingRight) {
  //     padding = paddingTop + ' ' + paddingRight + ' ' + paddingBottom + ' ' + paddingLeft
  //   }
  //   padding = padding.split(' ')
  //   if (padding.length === 1) {
  //     padding = [padding[0], padding[0], padding[0], padding[0]]
  //   } else if (padding.length === 2) {
  //     padding = [padding[0], padding[1], padding[0], padding[1]]
  //   } else if (padding.length === 3) {
  //     padding = [padding[0], padding[1], padding[2], padding[1]]
  //   }
  //   console.log(padding)
  //   // 计算宽高
  //   var width = Number(s.getNumberByUnit(padding[1])) + Number(s.getNumberByUnit(padding[3]))
  //   var height = Number(s.getNumberByUnit(padding[0])) + Number(s.getNumberByUnit(padding[2]))
  //   return {
  //     width: width,
  //     height: height
  //   }
  // }
  // 固定头部尺寸(计算不准, 删除)
  // s.updateFixedHeaderSize = function () {
  //   if (!s.fixedHead) return
  //   // 容器总宽度
  //   s.fixedHead.style.width = s.scrollerTable.clientWidth + 'px'
  //   // 滚动区域头部td
  //   var scrollerThead = s.scrollerTable.querySelector('thead')
  //   if (!scrollerThead) return
  //   var scrollerTr = scrollerThead.querySelector('tr')
  //   if (!scrollerTr) return
    
  //   // 固定头部td
  //   var thead = s.fixedHead.querySelector('thead')
  //   if (!thead) return
  //   var tr = thead.querySelector('tr')
  //   if (!tr) return

  //   // 设置固定头部单个td的宽度
  //   [].slice.call(scrollerTr.children).forEach(function (td, index) {
  //     var width = s.elPaddingSize(td).width
  //     tr.children[index].style.width = td.clientWidth - width + 'px'
  //   })
  // }

  // 更新限制尺寸
  s.updateLimitSize = function () {
    s.touches.maxX = s.scrollerTable.clientWidth - s.scrollerContainer.clientWidth
    s.touches.maxY = s.scrollerTable.clientHeight - s.scrollerContainer.clientHeight
    // 如果表格比容器小, 则不允许滚动
    if (s.touches.maxX < 0) s.touches.maxX = 0
    if (s.touches.maxY < 0) s.touches.maxY = 0
  }

  // 更新默认尺寸
  s.updateContainerSize = function () {
    // 固定头部尺寸(计算不准, 删除)
    // s.updateFixedHeaderSize()
    // 更新限制尺寸
    s.updateLimitSize()
  }
  // 底部刷新
  s.isBottomRefreshing = false
  function onBottomRefresh() {
    // 底部无数据、底部正在刷新、下拉中、头部刷新的情况，不执行
    if (s.isBottomRefreshing) return

    s.isBottomRefreshing = true
    // CallBack onBottomRefresh
    if (s.params.onBottomRefresh) s.params.onBottomRefresh(s)
  }
  // 判断是否有滚动条
  s.hasScroll = function () {
    if (s.touches.maxY > 0) {
      return true
    }
    return false
  }
  // 计算惯性时间与坐标，返回距离和时间, opRange:滑动距离正数, opDuration: 滑动时长正数
  s.inertance = function (opRange, opDuration) {
    // 速度 = 距离 / 时间
    var speed = Math.abs(opRange / opDuration)
    // 惯性距离 = 距离 * 速度
    var range = Math.abs(opRange * speed * 700)
    // 惯性时长 = 距离 * 速度
    var duration = Math.abs(range * speed * 700)

    console.log('时长:' + opDuration + '; 距离:' + opRange)
    console.log('新增距离时长:' + duration + '; 新增距离:' + range)
    // 返回值
    return {
      duration: Math.round(duration),
      range: Math.round(range)
    }
  }
  // 惯性移动
  s.inertanceMove = function () {
    // 计算惯性距离
    var range = 0
    if (s.touches.direction === -1) { // 上下
      console.log('上下')
      // 如果在边界, 则不计算惯性
      if (s.isBoundary('posY', s.touches.posY)) return
      range = s.touches.diffY
    } else if (s.touches.direction === 1) { // 左右
      console.log('左右')
      // 如果在边界, 则不计算惯性
      if (s.isBoundary('posX', s.touches.posX)) return
      range = s.touches.diffX
    }
    var inertance = s.inertance(range, s.touches.endTimeStamp)
    var duration = inertance.duration // 动画时长
    if (duration < 100) duration = 100
    var posX = null
    var posY = null
    if (s.touches.direction === -1) { // 上下
      if (s.touches.vertical === -1) { // 上
        posY = s.touches.posY - inertance.range
      } else { // 下
        posY = s.touches.posY + inertance.range
      }
      s.touches.posY = posY
    } else if (s.touches.direction === 1) { // 左右
      if (s.touches.horizontal === -1) { // 左
        posX = s.touches.posX - inertance.range
      } else { // 右
        posX = s.touches.posX + inertance.range
      }
      s.touches.posX = posX
    }
    // 如果新值已经到头部或者底部了, 则直接固定时长300ms
    if (posX !== null) { // 左右滑动
      if (-posX < s.touches.minX) {
        s.touches.posX = -s.touches.minX
        duration = 300
      } else if (-posX > s.touches.maxX) {
        s.touches.posX = -s.touches.maxX
        duration = 300
      }
    } else if (posY !== null) { // 上下滑动
      if (-posY < s.touches.minY) {
        s.touches.posY = -s.touches.minY
        duration = 300
      } else if (-posY > s.touches.maxY) {
        s.touches.posY = -s.touches.maxY
        duration = 300
      }
    }
    
    // 滚动到指定位置
    s.scrollerTable.style.WebkitTransitionDuration = duration + 'ms'
    s.scrollerTable.style.WebkitTransform = `translate(${s.touches.posX}px,${s.touches.posY}px)`
    if (posX !== null) { // 左右滑动, 滑动表头
      s.fixedHead.style.WebkitTransitionDuration = duration + 'ms'
      s.fixedHead.style.WebkitTransform = `translateX(${s.touches.posX}px)`
    }
  }
  // 判断是否是边界
  s.isBoundary = function (attrName, value) {
    if (attrName === 'posX') {
      if (Math.abs(value) === s.touches.maxX || Math.abs(value) === s.touches.minX) return true
      return false
    }
    if (attrName === 'posY') {
      if (Math.abs(value) === s.touches.maxY || Math.abs(value) === s.touches.minY) return true
      return false
    }
  }
  /* --------------------
  Control
  -------------------- */
  s.events = function (detach) {
    var action = detach ? 'removeEventListener' : 'addEventListener'

    s.container[action]('touchstart', s.onTouchStart, false)
    s.container[action]('touchmove', s.onTouchMove, false)
    s.container[action]('touchend', s.onTouchEnd, false)
    s.container[action]('touchcancel', s.onTouchEnd, false)
  }
  // attach、dettach事件
  s.attach = function (event) {
    s.events()
  }
  s.detach = function (event) {
    s.events(true)
  }
  // Touch信息
  s.touches = {
    // 方向信息
    direction: 0, // -1上下 | 1左右
    vertical: 0, // -1上 | 1下
    horizontal: 0, // -1左 | 1右
    // 时间信息
    startTimeStamp: 0,
    endTimeStamp: 0,
    duration: 0,
    // 移动信息
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    endX: 0,
    endY: 0,
    diffX: 0,
    diffY: 0,
    // 位置信息
    posX: 0,
    posY: 0,
    // 限制条件
    minX: 0,
    maxX: 0,
    minY: 0,
    maxY: 0
  }
  function preventDefault (e) {
    e.preventDefault()
  }
  s.onTouchStart = function (e) {
    s.container.addEventListener('touchmove', preventDefault, false)
    s.touches.startX = e.clientX || e.touches[0].clientX
    s.touches.startY = e.clientY || e.touches[0].clientY
    s.touches.startTimeStamp = e.timeStamp
    s.fixedHead.style.WebkitTransitionDuration = '0ms'
    s.scrollerTable.style.WebkitTransitionDuration = '0ms'
  }
  // 标识头部正在拖动
  s.onTouchMove = function (e) {
    s.touches.currentX = e.clientX || e.touches[0].clientX
    s.touches.currentY = e.clientY || e.touches[0].clientY
    s.touches.diffY = s.touches.startY - s.touches.currentY
    s.touches.diffX = s.touches.startX - s.touches.currentX

    // 设置滑动方向
    s.touches.direction = Math.abs(s.touches.diffX) > Math.abs(s.touches.diffY) ? 1 : -1 // 设置滑动方向(-1上下 | 1左右)
    if (s.touches.direction === -1) { // 设置垂直方向(-1上 | 1下)
      s.touches.vertical = s.touches.diffY < 0 ? 1 : -1
    }
    if (s.touches.direction === 1) { // 设置左右方向(-1左 | 1右)
      s.touches.horizontal = s.touches.diffX < 0 ? 1 : -1
    }

    // 移动位置, 负数
    var moveX = s.touches.posX - s.touches.diffX
    var moveY = s.touches.posY - s.touches.diffY

    if (moveX < -s.touches.maxX) moveX = -s.touches.maxX
    if (moveY < -s.touches.maxY) moveY = -s.touches.maxY
    if (moveX > s.touches.minX) moveX = s.touches.minX
    if (moveY > s.touches.minY) moveY = s.touches.minY

    // 滚动区域位置
    s.fixedHead.style.WebkitTransform = `translateX(${moveX}px)`
    s.scrollerTable.style.WebkitTransform = `translate(${moveX}px,${moveY}px)`
  }
  s.onTouchEnd = function (e) {
    s.container.removeEventListener('touchmove', preventDefault, false)
    s.touches.endTimeStamp = e.timeStamp
    s.touches.duration = s.touches.endTimeStamp - s.touches.startTimeStamp
    s.touches.endX = e.clientX || e.changedTouches[0].clientX
    s.touches.endY = e.clientY || e.changedTouches[0].clientY
    // 取出位置信息
    var match = s.matchNumber(s.scrollerTable.style.WebkitTransform)
    if (match && match.length === 2) {
      s.touches.posX = Number(match[0])
      s.touches.posY = Number(match[1])
    }
    // 不是点击才有惯性移动(ios手机回弹, 删除)
    if (Math.abs(s.touches.diffX) > 6 || Math.abs(s.touches.diffY) > 6) {
      s.inertanceMove()
    }

    // 滚动到底部
    if (s.touches.posY <= -s.touches.maxY + 10) {
      onBottomRefresh()
    }
  }
  /* --------------------
  Init
  -------------------- */
  s.init = function () {
    s.updateContainerSize()
    s.attach()
  }
  s.init()
  return s
}

export default FixTable
