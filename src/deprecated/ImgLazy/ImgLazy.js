// ImgLazy 图片预加载
var ImgLazy = function (params) {
  /* --------------------
  Model
  -------------------- */
  var defaults = {
    overflowContainer: document.body,
    load: 'scroll', // scroll 滚动加载 | queue 队列加载
    threshold: 300, // 滚动加载时，显示区域扩张上下像素
    loadAttr: 'data-load-src', // 加载地址
    errorAttr: 'data-error-src', // 错误地址
    completeAttr: 'data-complete' // 完成加载, data-complete=0代表加载错误, =1代码加载正确
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
  s.overflowContainer =
    typeof s.params.overflowContainer === 'string'
      ? document.querySelector(s.params.overflowContainer)
      : s.params.overflowContainer
  if (!s.overflowContainer) {
    console.log('SeedsUI Error : Dragrefresh overflowContainer不存在，请检查页面中是否有此元素')
    return
  }
  // 所有图片
  s.imgs = []
  // 记录滚动位置
  s.scrollTop = 0
  /* --------------------
  Method
  -------------------- */
  // 获得头部位置
  s.getOffsetTop = function (el) {
    var offsetTop = el.offsetTop
    if (el.offsetParent != null) offsetTop += s.getOffsetTop(el.offsetParent)

    return offsetTop
  }
  // 元素是否在显示区域内
  s.isInScreen = function (el) {
    var offsetTop = s.getOffsetTop(el)
    if (
      offsetTop > s.scrollTop - s.params.threshold &&
      offsetTop < parseInt(s.scrollTop, 10) + parseInt(window.innerHeight, 10)
    ) {
      return true
    }
    return false
  }
  /* --------------------
  Events
  -------------------- */
  s.events = function (detach) {
    var action = detach ? 'removeEventListener' : 'addEventListener'
    if (s.params.load === 'scroll') {
      var scrollTarget = s.overflowContainer === document.body ? window : s.overflowContainer
      scrollTarget[action]('scroll', s.onScroll, false)
    }
  }
  s.attach = function () {
    s.events()
  }
  s.detach = function () {
    s.events(false)
  }
  // 加载完成事件
  s.onLoad = function (e) {
    var target = e.target
    var imgTarget = target.$el
    imgTarget.setAttribute(s.params.completeAttr, '1')

    // 渲染图片
    s.render(imgTarget, target.src)
    // console.log('加载图片' + target.src)
  }
  // 渲染图片
  s.render = function (target, src) {
    if (target.tagName === 'IMG') {
      target.src = src
    } else {
      target.style.backgroundImage = 'url(' + src + ')'
    }
  }
  // 加载失败事件
  s.onError = function (e) {
    var target = e.target
    var imgTarget = target.$el
    imgTarget.setAttribute(s.params.completeAttr, '0')
    if (target.errorSrc) {
      // 渲染图片
      s.render(imgTarget, target.errorSrc)
    }
    // console.log('错误图片' + target.src)
  }
  // 滚动完成事件 (如果300毫秒内滚动条没变,则视为onScrollEnd)
  var timer
  var millisec = 300
  s.getScrollTop = function () {
    return s.overflowContainer === document.body
      ? document.documentElement.scrollTop
      : s.overflowContainer.scrollTop
  }
  s.onScroll = function () {
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
    s.load()
  }
  /* --------------------
  Init
  -------------------- */
  s.load = function () {
    // 获取所有需要加载的图片
    s.imgs = [].slice
      .call(s.overflowContainer.querySelectorAll('[' + s.params.loadAttr + ']'))
      .filter((n) => {
        if (n.getAttribute(s.params.loadAttr)) return true
        return false
      })

    // 队列加载
    if (s.params.load === 'queue') {
      s.queue(0)
      return
    }

    // 懒人加载
    for (var i = 0; i < s.imgs.length; i++) {
      // 图片路径和裂图路径
      var loadSrc = s.imgs[i].getAttribute(s.params.loadAttr)
      var errorSrc = s.imgs[i].getAttribute(s.params.imgErrorAttr) || ''

      var flag = true
      if (s.params.load === 'scroll') flag = s.isInScreen(s.imgs[i]) // 滚动加载
      if (flag && !s.imgs[i].getAttribute(s.params.completeAttr)) {
        console.log('加载' + loadSrc)
        var image = new Image()
        image.$el = s.imgs[i]
        image.src = loadSrc
        image.errorSrc = errorSrc
        image.addEventListener('load', s.onLoad, false)
        image.addEventListener('error', s.onError, false)
      }
    }
  }
  // 队列加载
  s.queue = function (i) {
    // 图片路径和裂图路径
    var loadSrc = s.imgs[i].getAttribute(s.params.loadAttr)
    var errorSrc = s.imgs[i].getAttribute(s.params.imgErrorAttr) || ''
    // 加载
    if (s.imgs[i].getAttribute(s.params.completeAttr)) {
      i++
    }
    if (!s.imgs[i]) {
      return
    }

    var image = new Image()
    image.$el = s.imgs[i]
    image.src = loadSrc
    image.errorSrc = errorSrc
    image.addEventListener(
      'load',
      function (e) {
        console.log('加载第' + i + '张')
        s.onLoad(e)
        s.queue(i++)
      },
      false
    )
    image.addEventListener(
      'error',
      function (e) {
        console.log('第' + i + '张加载失败')
        s.onError(e)
        s.queue(i++)
      },
      false
    )
  }
  s.update = function () {
    if (s.params.load === 'scroll') {
      s.detach()
      s.attach()
    }
  }
  s.update()
}

export default ImgLazy
