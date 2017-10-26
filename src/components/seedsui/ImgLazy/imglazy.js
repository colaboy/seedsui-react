// ImgLazy 图片预加载
var ImgLazy = function (params) {
  /* --------------------
  Model
  -------------------- */
  var defaults = {
    overflowContainer: document.body,
    isScrollLoad: true, // 滚动加载
    threshold: 300, // 滚动加载时，显示区域扩张上下像素
    imgLoadAttr: 'data-load-src', // 图片地址
    imgErrowAttr: 'data-error-src'// 错误图片地址
    /*
    callbacks
    onScroll:function(e)
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
  s.overflowContainer = typeof s.params.overflowContainer === 'string' ? document.querySelector(s.params.overflowContainer) : s.params.overflowContainer
  if (!s.overflowContainer) {
    console.log('SeedsUI Error : Dragrefresh overflowContainer不存在，请检查页面中是否有此元素')
    return
  }
  // 所有图片
  s.imgs = []
  // 对应缓存图片
  s.cacheImgs = []

  // 屏幕高度
  s.windowHeight = window.innerHeight
  s.scrollTop
  /* --------------------
  Method
  -------------------- */
  // 获得所有懒人图片
  s.updateImgs = function () {
    s.imgs = s.overflowContainer.querySelectorAll('[' + s.params.imgLoadAttr + ']')
    for (var i = 0; i < s.imgs.length; i++) {
      s.cacheImgs[i] = new Image()
      s.cacheImgs[i].index = i
      s.cacheImgs[i].errorSrc = s.imgs[i].getAttribute(s.params.imgErrowAttr)
      // 如果没有选择滚动加载，则一次性加载
      if (!s.params.isScrollLoad) {
        var src = s.imgs[i].getAttribute(s.params.imgLoadAttr)
        s.cacheImgs[i].src = src
      }
    }
  }
  s.updateImgs()
  s.update = function () {
    // 重新获取图片
    s.updateImgs()
    // 重新绑定图片事件
    s.imgsDetach()
    s.imgsAttach()
    // 加载屏幕中的图片
    for (var i = 0; i < s.imgs.length; i++) {
      var flag = s.isInScreen(s.imgs[i])
      if (flag && s.cacheImgs[i].src === '') {
        // console.log('加载第'+i+'张：'+flag)
        var src = s.imgs[i].getAttribute(s.params.imgLoadAttr)
        s.cacheImgs[i].src = src
      }
    }
  }
  // 获得头部位置
  s.getOffsetTop = function (el) {
    var offsetTop = el.offsetTop
    if (el.offsetParent != null) offsetTop += s.getOffsetTop(el.offsetParent)

    return offsetTop
  }
  // 元素是否在显示区域内
  s.isInScreen = function (el) {
    var offsetTop = s.getOffsetTop(el)
    if (offsetTop > s.scrollTop - s.params.threshold && offsetTop < parseInt(s.scrollTop) + parseInt(s.windowHeight)) {
      return true
    }
    return false
  }
  /* --------------------
  Events
  -------------------- */
  s.events = function (detach) {
    var action = detach ? 'removeEventListener' : 'addEventListener'
    if (s.params.isScrollLoad) {
      var scrollTarget = s.overflowContainer === document.body ? window : s.overflowContainer
      scrollTarget[action]('scroll', s.onScroll, false)
    }
  }
  s.attach = function () {
    s.events()
    // 初始化时执行一次，让首屏可加载
    s.onScroll()
  }
  s.detach = function () {
    s.events(false)
  }
  s.imgsEvents = function (detach) {
    var action = detach ? 'removeEventListener' : 'addEventListener'
    // 缓存图片绑定onLoad事件|和绑定onError事件
    for (var i = 0; i < s.cacheImgs.length; i++) {
      s.cacheImgs[i][action]('load', s.onLoad, false)
      s.cacheImgs[i][action]('error', s.onError, false)
    }
  }
  s.imgsAttach = function () {
    s.imgsEvents()
  }
  s.imgsDetach = function () {
    s.imgsEvents(false)
  }
  // Events Handler
  s.onLoad = function (e) {
    var target = e.target
    var imgTarget = s.imgs[target.index]
    if (imgTarget.tagName === 'IMG') {
      imgTarget.src = target.src
    } else {
      imgTarget.style.backgroundImage = 'url(' + target.src + ')'
    }

    // console.log('加载图片'+target.index)
  }
  s.onError = function (e) {
    var target = e.target
    if (!target.errorSrc) return

    var imgTarget = s.imgs[target.index]
    if (imgTarget.tagName === 'IMG') {
      imgTarget.src = target.errorSrc
    } else {
      imgTarget.style.backgroundImage = 'url(' + target.errorSrc + ')'
    }
    // console.log('错误图片'+target.index)
  }
  var timer
  var millisec = 300
  s.getScrollTop = function () {
    return s.overflowContainer === document.body ? document.documentElement.scrollTop : s.overflowContainer.scrollTop
  }
  s.onScroll = function (e) {
    if (s.params.onScroll) s.params.onScroll(e)
    // 计算scrollEnd事件
    s.scrollTop = s.getScrollTop()
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      if (s.scrollTop === s.getScrollTop()) {
        s.onScrollEnd()
        clearTimeout(timer)
        return
      }
      timer = null
    }, millisec)
  }
  s.onScrollEnd = function () {
    console.log('停止滚动')
    s.update()
  }
  /* --------------------
  Init
  -------------------- */
  s.init = function () {
    // 绑定滚动条事件
    s.attach()
    // 绑定图片事件
    s.imgsAttach()
  }
  s.init()
}

;//export default ImgLazy
