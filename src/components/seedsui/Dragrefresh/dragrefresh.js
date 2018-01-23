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
    end: 300, // 头部下拉的结束位置

    isTopPosition: 0, // 如果scrollTop小于等于isTopPosition时，则认为是到顶部了(不建议修改)

    topContainer: null, // 头部容器
    errorContainerClass: 'SID-Dragrefresh-ErrorContainer', // 错误容器的class

    /* callbacks
    onPull:function(s)// 头部拖动中
    onShowTop:function(s)// 开始显示头部
    onHideTop:function(s)// 开始隐藏头部
    onTopShowed(s)// 头部显示动画结束
    onTopHid(s)// 头部隐藏动画结束
    onTransitionEnd:function(Dragrefresh)// 头部动画结束

    onTopRefresh:function(s)// 头部刷新
    onTopComplete:function(s)// 头部完成加载

    onBottomRefresh:function(s)// 底部刷新
    onBottomComplete:function(s)// 底部完成加载
    onNoData:function(s)// 底部无数据

    onError:function(s)// 网络错误
    onClickError:function(s)//点击错误容器
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
  s.container = typeof s.params.container === 'string' ? document.querySelector(s.params.container) : s.params.container
  if (!s.container) {
    console.log('SeedsUI Error : Dragrefresh container不存在，请检查页面中是否有此元素')
    return
  }
  // topContainer
  s.topContainer = typeof s.params.topContainer === 'string' ? document.querySelector(s.params.topContainer) : s.params.topContainer
  if (!s.topContainer) {
    console.log('SeedsUI Warn : topContainer不存在，请检查页面中是否有此元素')
  }
  // 正在刷新(默认为不允许下拉，当发生一次请求调用setPagination后才允许下拉)
  s.isRefreshed = false
  /* ----------------------
  Method
  ---------------------- */
  s.isHid = false
  // 隐藏
  s.hideTop = function () {
    s.topContainer.style.webkitTransitionDuration = s.params.duration + 'ms'
    s.touches.posY = s.params.begin
    s.touches.currentPosY = s.params.begin
    s.isHid = true
    // 拖动完成
    s.isOnPull = false
    // 实体操作
    if (s.params.onHideTop) s.params.onHideTop(s)
  }
  // 显示
  s.showTop = function () {
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
  // 头部刷新
  s.topRefresh = function () {
    if (!s.isRefreshed) return
    // 正在刷新
    s.isRefreshed = false
    // CallBack onTopRefresh
    if (s.params.onTopRefresh) s.params.onTopRefresh(s)
  }
  // 底部刷新
  s.bottomRefresh = function () {
    // 底部无数据、底部正在刷新、下拉中、头部刷新的情况，不执行
    if (s.isNoData || !s.isRefreshed || s.isOnPull) return
    // 正在刷新
    s.isRefreshed = false
    // CallBack onBottomRefresh
    if (s.params.onBottomRefresh) s.params.onBottomRefresh(s)
  }
  // 头部刷新完成
  s.topComplete = function () {
    if (!s.topContainer) return
    // 收起
    s.hideTop()
    // 头部完成
    s.isRefreshed = true
    // Callback onTopComplete
    if (s.params.onTopComplete) s.params.onTopComplete(s)
    // Callback onNoData (无更多数据)
    if (s.isNoData) {
      if (s.params.onNoData) s.params.onNoData(s)
      return
    }
    // 如果还有数据，如果没有滚动条，则继续加载
    if (!s.params.onBottomRefresh) return
    setTimeout(function () {
      if (!s.isNoData && !s.hasScroll()) {
        s.bottomRefresh()
      }
    }, s.params.duration * 2)
  }
  // 底部刷新完成
  s.bottomComplete = function () {
    if (!s.params.onBottomRefresh) return
    // 底部完成
    s.isRefreshed = true
    // Callback onBottomComplete
    if (s.params.onBottomComplete) s.params.onBottomComplete(s)
    // Callback onNoData (无更多数据)
    if (s.isNoData) {
      if (s.params.onNoData) s.params.onNoData(s)
      return
    }
    // 如果还有数据，并且如果没有滚动条，则继续加载
    if (!s.hasScroll()) {
      s.bottomRefresh()
    }
  }
  // 网络错误
  s.error = function () {
    s.isNoData = true
    s.isRefreshed = true
    // 收起头部
    s.hideTop()
    // 网络错误回调
    if (s.params.onError) s.params.onError(s)
  }
  s.noData = function () {
    s.isNoData = true
    s.isRefreshed = true
    // 收起头部
    if (s.topContainer) s.hideTop()
    // 底部显示无数据
    if (s.params.onNoData) s.params.onNoData(s)
  }
  s.setPagination = function (isNext, isNoData, isError) { // 下一页 | 无数据 | 错误
    s.isNoData = isNoData
    // 如果加载错误
    if (isError) {
      s.error()
      return
    }
    // 如果已经没有数据,并且是下一页则不加载
    if (s.isNoData && isNext) {
      s.noData()
      return
    }
    // 加载数据
    if (!isNext && s.topContainer) { // 第一页
      s.topComplete()
    } else { // 下一页
      s.bottomComplete()
    }
  }
  /* ----------------------
  Events
  ---------------------- */
  s.events = function (detach) {
    var action = detach ? 'removeEventListener' : 'addEventListener'
    var touchTarget = s.container
    // 头部下拉
    if (s.topContainer) {
      s.container[action]('touchstart', s.onTouchStart, false)
      s.container[action]('touchmove', s.onTouchMove, false)
      s.container[action]('touchend', s.onTouchEnd, false)
      s.container[action]('touchcancel', s.onTouchEnd, false)
      // 头部动画监听
      s.topContainer[action]('webkitTransitionEnd', s.onTransitionEnd, false)
    }
    // 底部刷新
    if (s.params.onBottomRefresh) {
      // 绑定底部事件，区分一般容器和body
      if (touchTarget === document.body) {
        touchTarget = window
      }
      touchTarget[action]('scroll', s.onScroll, false)
    }
    // 点击错误面板
    var errorContainer = s.container.querySelector('.' + s.params.errorContainerClass)
    if (errorContainer) errorContainer[action]('click', s.onClickError, false)
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
  // touchmove的preventDefault事件监听，防止与滚动条冲突
  s.preventMove = false
  s.onTouchStart = function (e) {
    s.container.addEventListener('touchmove', s.preventDefault, false)
    s.preventMove = true
    // 如果不在顶部，则不触发
    if (s.getScrollTop() <= s.params.isTopPosition) s.touches.isTop = true
    else s.touches.isTop = false

    s.topContainer.style.webkitTransitionDuration = '0ms'

    s.touches.startX = e.touches[0].clientX
    s.touches.startY = e.touches[0].clientY
  }
  // 标识头部正在拖动
  s.isOnPull = false
  s.onTouchMove = function (e) {
    s.touches.currentX = e.touches[0].clientX
    s.touches.currentY = e.touches[0].clientY
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
      if (!s.isRefreshed) return
      if (s.preventMove === false) {
        s.container.addEventListener('touchmove', s.preventDefault, false)
        s.preventMove = true
      }
      s.touches.currentPosY = s.touches.posY + s.touches.diffY
      if (s.touches.currentPosY > s.params.end) {
        s.touches.currentPosY = s.params.end
      }
      // 实体操作
      if (s.params.onPull) s.params.onPull(s)
      // 标识头部正在拖动
      s.isOnPull = true
    } else {
      if (s.preventMove === true) {
        s.container.removeEventListener('touchmove', s.preventDefault, false)
        s.preventMove = false
      }
    }
  }
  s.onTouchEnd = function (e) {
    // 清除move时记录的方向
    s.touches.direction = 0
    s.touches.vertical = 0
    // 下拉的情况
    if (s.touches.currentPosY > 0) {
      if (s.touches.currentPosY > s.params.threshold) { // 如果大于hold值，则展示
        s.showTop()
      } else { // 小于则收起
        s.hideTop()
      }
    }
  }
  s.onTransitionEnd = function (e) {
    if (e.target !== s.topContainer || e.propertyName === 'visibility') return
    // 有效的显示状态
    if (s.touches.posY === s.params.threshold && s.isRefreshed) {
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
  s.isNoData = false
  s.getScrollTop = function (e) {
    var scrollTop = s.container === document.body ? document.documentElement.scrollTop : s.container.scrollTop
    return scrollTop
  }
  s.onScroll = function (e) {
    var clientHeight = s.container.clientHeight // || window.innerHeight
    var scrollHeight = s.container.scrollHeight
    var scrollTop = s.container === document.body ? document.documentElement.scrollTop : s.container.scrollTop
    // console.log(clientHeight + ':' + scrollHeight + ':' + scrollTop)
    if (scrollTop + clientHeight >= scrollHeight - 2) {
      s.bottomRefresh()
    }
  }
  s.onClickError = function (e) {
    if (s.params.onClickError) {
      s.params.onClickError(s)
    } else {
      s.isNoData = false
      // 底部刷新
      s.bottomRefresh()
    }
  }
  // 主函数
  s.init = function () {
    s.attach()
  }

  s.init()
}

;//export default Dragrefresh
