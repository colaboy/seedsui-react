// Dragrefresh 下拉刷新
var Dragrefresh = function (params) {
  /* ----------------------
  Model
  ---------------------- */
  var defaults = {
    container: document.body,
    duration: 150, // 头部下拉的隐藏动画时长
    threshold: 100, // 头部下拉的触发位置
    begin: 0, // 头部下拉的起始位置
    end: 200, // 头部下拉的结束位置
    endRefresh: false, // 滑动到指位置后自动刷新
    moveTimeout: 0, // 滑动超时, 解决ios手指滑动到原生tabbar上, 不触发onTouchEnd

    isTopPosition: 0, // 如果scrollTop小于等于isTopPosition时，则认为是到顶部了(不建议修改)

    topContainer: null // 头部容器

    /* callbacks
    onScroll: function(e) // 滚动
    
    onPull:function(s)// 头部拖动中
    onShowTop:function(s)// 开始显示头部
    onHideTop:function(s)// 开始隐藏头部
    onTopShowed(s)// 头部显示动画结束
    onTopHid(s)// 头部隐藏动画结束
    onTransitionEnd:function(Dragrefresh)// 头部动画结束

    onTopRefresh:function(s)// 头部刷新

    onBottomRefresh:function(s)// 底部刷新
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
  s.container =
    typeof s.params.container === 'string'
      ? document.querySelector(s.params.container)
      : s.params.container
  if (!s.container) {
    console.log('SeedsUI Error : Dragrefresh container不存在，请检查页面中是否有此元素')
    return
  }
  // topContainer
  s.topContainer =
    typeof s.params.topContainer === 'string'
      ? document.querySelector(s.params.topContainer)
      : s.params.topContainer
  if (!s.topContainer) {
    console.log('SeedsUI Warn : topContainer不存在，请检查页面中是否有此元素')
  }
  // 正在刷新(默认为不允许下拉, 当完成一次数据加载完成后, 再设置isLoading为false较为合适)
  s.isLoading = true
  /* ----------------------
  Method
  ---------------------- */
  s.isHid = false
  // 隐藏
  s.hideTop = function () {
    if (!s.topContainer) return
    s.topContainer.style.webkitTransitionDuration = s.params.duration + 'ms'
    s.touches.posY = s.params.begin
    s.touches.currentPosY = s.params.begin
    s.isHid = true
    // 实体操作
    if (s.params.onHideTop) s.params.onHideTop(s)
  }
  // 显示
  s.showTop = function () {
    if (!s.topContainer) return
    s.topContainer.style.webkitTransitionDuration = s.params.duration + 'ms'
    s.touches.posY = s.params.threshold
    s.touches.currentPosY = s.params.begin
    s.isHid = false
    // 实体操作
    if (s.params.onShowTop) s.params.onShowTop(s)
  }
  // 销毁对象
  s.destroyTop = function () {
    s.container.removeChild(s.topContainer)
  }
  s.destroy = function () {
    s.destroyTop()
    // 销毁事件
    s.detach()
  }
  // 是否有滚动条
  s.hasScroll = function () {
    var clientHeight = s.container.clientHeight // || window.innerHeight
    var scrollHeight = s.container.scrollHeight
    /* var scrollTop = s.container === document.body ? document.documentElement.scrollTop : s.container.scrollTop
    console.log(clientHeight + ':' + scrollHeight + ':' + scrollTop) */

    if (clientHeight === scrollHeight) {
      return false
    }
    return true
  }
  // 头部刷新, 刷新中时将不允许刷新
  s.topRefresh = function () {
    if (s.isLoading) return
    s.isLoading = true // 设置为不可刷新
    // CallBack onTopRefresh
    if (s.params.onTopRefresh) s.params.onTopRefresh(s)
  }
  // 底部刷新, 刷新中时将不允许刷新
  s.bottomRefresh = function () {
    if (s.isLoading) return
    s.isLoading = true // 设置为不可刷新
    // CallBack onBottomRefresh
    if (s.params.onBottomRefresh) s.params.onBottomRefresh(s)
  }
  /* ----------------------
  Events
  ---------------------- */
  s.isSupportTouch = 'ontouchstart' in window
  s.events = function (detach) {
    var action = detach ? 'removeEventListener' : 'addEventListener'
    var touchTarget = s.container
    // 头部下拉
    if (s.topContainer) {
      // touch兼容pc事件
      if (s.isSupportTouch) {
        s.container[action]('touchstart', s.onTouchStart, false)
        s.container[action]('touchmove', s.onTouchMove, false)
        s.container[action]('touchend', s.onTouchEnd, false)
        s.container[action]('touchcancel', s.onTouchEnd, false)
      } else {
        s.container[action]('mousedown', s.onTouchStart, false)
        s.container[action]('mousemove', s.onTouchMove, false)
        s.container[action]('mouseup', s.onTouchEnd, false)
      }
      // 头部动画监听
      s.topContainer[action]('webkitTransitionEnd', s.onTransitionEnd, false)
    }

    // 绑定底部事件，区分一般容器和body
    if (touchTarget === document.body) {
      touchTarget = window
    }
    touchTarget[action]('scroll', s.onScroll, false)
  }
  // attach、detach事件
  s.attach = function () {
    s.events()
  }
  s.detach = function () {
    s.events(true)
  }

  // Touch信息
  s.touches = {
    direction: 0,
    vertical: 0,
    isTop: true,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    endX: 0,
    endY: 0,
    diffX: 0,
    diffY: 0,
    posY: 0,
    currentPosY: 0
  }
  s.preventDefault = function (e) {
    e.preventDefault()
  }
  s.startMouseMove = false
  // touchmove的preventDefault事件监听，防止与滚动条冲突
  s.preventMove = false
  s.onTouchStart = function (e) {
    s.startMouseMove = true
    s.container.addEventListener(
      s.isSupportTouch ? 'touchmove' : 'mousemove',
      s.preventDefault,
      false
    )
    s.preventMove = true
    // 如果不在顶部，则不触发
    if (s.getScrollTop() <= s.params.isTopPosition) s.touches.isTop = true
    else s.touches.isTop = false

    s.topContainer.style.webkitTransitionDuration = '0ms'

    s.touches.startX = e.clientX || e.touches[0].clientX
    s.touches.startY = e.clientY || e.touches[0].clientY

    // 解决ios手指滑动到原生tabbar上, 不触发onTouchEnd
    if (s.timeout) clearTimeout(s.timeout)
  }
  // 标识头部正在拖动
  s.onTouchMove = function (e) {
    if (!s.startMouseMove) return
    s.touches.currentX = e.clientX || e.touches[0].clientX
    s.touches.currentY = e.clientY || e.touches[0].clientY
    s.touches.diffY = s.touches.currentY - s.touches.startY
    s.touches.diffX = s.touches.startX - s.touches.currentX

    // 设置滑动方向(-1上下 | 1左右)
    if (s.touches.direction === 0) {
      s.touches.direction = Math.abs(s.touches.diffX) > Math.abs(s.touches.diffY) ? 1 : -1
    }
    // 设置垂直方向(-1上 | 1下)
    if (s.touches.direction === -1) {
      s.touches.vertical = s.touches.diffY < 0 ? 1 : -1
    }
    // 在顶部下拉
    if (s.touches.isTop && s.touches.vertical === -1) {
      if (s.isLoading) return
      // 上拉阻止滚动条滚动
      if (s.preventMove === false) {
        console.log('上拉阻止滚动条滚动')
        s.container.addEventListener(
          s.isSupportTouch ? 'touchmove' : 'mousemove',
          s.preventDefault,
          false
        )
        s.preventMove = true
      }
      // 当前下拉坐标
      s.touches.currentPosY = s.touches.posY + s.touches.diffY
      if (s.params.end && s.touches.currentPosY >= s.params.end) {
        // 头部下拉到结束位置
        s.touches.currentPosY = s.params.end
        if (s.params.endRefresh) s.onTouchEnd() // 头部下拉到结束位置刷新
      } else {
        // 实体操作
        if (s.params.onPull) s.params.onPull(s)
      }
      // 解决ios手指滑动到原生tabbar上, 不触发onTouchEnd
      if (s.params.moveTimeout) {
        if (s.timeout) {
          clearTimeout(s.timeout)
        }
        s.timeout = setTimeout(() => {
          console.log('滑动超时')
          s.onTouchEnd()
        }, s.params.moveTimeout || 1000)
      }
    } else {
      if (s.preventMove === true) {
        console.log('滚动移除阻止滚动条')
        s.container.removeEventListener(
          s.isSupportTouch ? 'touchmove' : 'mousemove',
          s.preventDefault,
          false
        )
        s.preventMove = false
      }
    }
  }
  s.onTouchEnd = function (e) {
    s.startMouseMove = false
    // 清除move时记录的方向
    s.touches.direction = 0
    s.touches.vertical = 0
    // 下拉的情况
    if (s.touches.currentPosY > 0) {
      if (s.touches.currentPosY > s.params.threshold) {
        // 如果大于hold值，则展示
        s.showTop()
      } else {
        // 小于则收起
        s.hideTop()
      }
    }
    // 解决ios手指滑动到原生tabbar上, 不触发onTouchEnd
    if (s.timeout) clearTimeout(s.timeout)
  }
  s.onTransitionEnd = function (e) {
    if (e.target !== s.topContainer || e.propertyName === 'visibility') return
    // 有效的显示状态
    if (s.touches.posY === s.params.threshold && !s.isLoading) {
      s.topRefresh()
    }

    // 显示与隐藏的回调
    // Callback onTransitionEnd
    if (s.params.onTransitionEnd) s.params.onTransitionEnd(s)
    if (s.isHid) {
      // Callback onTopHid
      if (s.params.onTopHid) s.params.onTopHid(s)
    } else {
      // Callback onTopShowed
      if (s.params.onTopShowed) s.params.onTopShowed(s)
    }
  }
  s.getScrollTop = function (e) {
    var scrollTop =
      s.container === document.body ? document.documentElement.scrollTop : s.container.scrollTop
    return scrollTop
  }
  s.onScroll = function (e) {
    if (s.params.onScroll) s.params.onScroll(e)
    if (!s.params.onBottomRefresh) return
    var clientHeight = s.container.clientHeight // || window.innerHeight
    var scrollHeight = s.container.scrollHeight
    var scrollTop =
      s.container === document.body ? document.documentElement.scrollTop : s.container.scrollTop
    // console.log(clientHeight + ':' + scrollHeight + ':' + scrollTop)
    if (scrollTop + clientHeight >= scrollHeight - 2) {
      s.bottomRefresh()
    }
  }
  // 主函数
  s.init = function () {
    s.attach()
  }

  s.init()
}

export default Dragrefresh
