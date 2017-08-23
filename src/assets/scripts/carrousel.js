// Carrousel 滑动控件
var Carrousel = function (container, params) {
  function getPureChildren (children, className) {
    var arr = []
    for (var i = 0; i < children.length; i++) {
      if (children[i].classList.contains(className)) arr.push(children[i])
    }
    return arr
  }
  function getElementByParent (parent, selector) {
    return (typeof selector === 'string' && selector !== '') ? parent.querySelector(selector) : selector
  }

  /* --------------------
  Model
  -------------------- */
  var defaults = {
    pagination: null,
    autoplay: 0, // 设置毫秒数，0为不自动播放
    slidesPerView: 1,
    threshold: '50',
    duration: '300',
    height: 0,
    imglazy: '[data-load-src]', // 图片懒加载

    // loop
    loop: false,
    slideDuplicateClass: 'carrousel-slide-duplicate',

    // dom class
    wrapperClass: 'carrousel-wrapper',
    slideClass: 'carrousel-slide',
    slideActiveClass: 'active',
    bulletClass: 'bullet',
    bulletActiveClass: 'active'

    /*
    callbacks
    onInit:function(Carrousel)
    onSlideChange:function(Carrousel)
    onSlideChangeEnd:function(Carrousel)
    */
  }
  params = params || {}
  for (var def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def]
    }
  }
  // Slider
  var s = this

  // Params
  s.params = params

  // Container
  s.container = getElementByParent(document, container)
  if (!s.container) {
    console.log('SeedsUI Error：未找到Slider的ID，请检查传入参数是否正确')
    return
  }
  s.container.width = s.container.clientWidth

  // Wrapper
  s.wrapper = s.container.querySelector('.' + s.params.wrapperClass) // [es6]s.wrapper=s.container.querySelector(':scope > .'+s.params.wrapperClass)

  // Pagination
  s.pagination = getElementByParent(s.container, s.params.pagination)
  s.bullets = []
  s.updateBullets = function () {
    if (!s.pagination) return

    s.bullets = []
    s.pagination.innerHTML = ''
    // s.numberOfBullets = s.params.loop ? s.slides.length - s.params.slidesPerView * 2 : s.slides.length
    for (var i = 0; i < s.slides.length; i++) {
      var bullet = document.createElement('span')
      bullet.setAttribute('class', s.params.bulletClass)
      s.pagination.appendChild(bullet)
      s.bullets.push(bullet)
    }
  }
  // 索引
  s.activeIndex = 0
  s.max = 0
  // Slides
  s.updateSlides = function () {
    s.slides = getPureChildren(s.wrapper.children, s.params.slideClass)// [es6]s.slides=s.wrapper.querySelectorAll(':scope > .'+s.params.slideClass)
  }
  // loop dupSlides
  s.dupSlides = []
  s.createLoop = function () {
    if (!s.params.loop) return
    // 删除循环
    s.destroyLoop()
    var beforeDupSlides = []
    var afterDupSlides = []

    if (s.params.slidesPerView > s.slides.length) return
    var i
    var dup
    s.slides.forEach(function (n, i, a) {
      if (i < s.params.slidesPerView) afterDupSlides.push(n.cloneNode(true))
      if (i < s.slides.length && i >= s.slides.length - s.params.slidesPerView) beforeDupSlides.push(n.cloneNode(true))
    })
    for (i = 0; i < afterDupSlides.length; i++) {
      dup = s.wrapper.appendChild(afterDupSlides[i])
      dup.classList.add(s.params.slideDuplicateClass)
      dup.classList.remove(s.params.slideClass)
    }
    for (i = beforeDupSlides.length - 1; i >= 0; i--) {
      dup = s.wrapper.insertBefore(beforeDupSlides[i], s.wrapper.firstElementChild)
      dup.classList.add(s.params.slideDuplicateClass)
      dup.classList.remove(s.params.slideClass)
    }
    s.activeIndex = s.params.slidesPerView
    s.dupSlides = beforeDupSlides.concat(afterDupSlides)
  }
  s.destroyLoop = function () {
    var slideDuplicate = getPureChildren(s.wrapper.children, s.params.slideDuplicateClass)
    //  var slideDuplicate=s.wrapper.querySelectorAll(':scope > .'+s.params.slideDuplicateClass)
    /* eslint-disable */
    for (var i = 0, slideDu; slideDu = slideDuplicate[i++];) {
      s.wrapper.removeChild(slideDu)
    }
    /* eslint-enable */
  }
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
  /* --------------------
  Update
  -------------------- */
  // 根据index更新选中class
  s.updateClasses = function () {
    var slideIndex = s.activeIndex
    if (s.params.loop) {
      slideIndex = s.activeIndex - s.params.slidesPerView
      if (s.max - s.params.slidesPerView === s.activeIndex) { // 正向滑动
        slideIndex = 0
      }
      if (slideIndex < 0) { // 反向滑动
        slideIndex = s.slides.length + slideIndex
      }
    }
    var i
    // Slide
    for (i = 0; i < s.slides.length; i++) {
      s.slides[i].classList.remove(s.params.slideActiveClass)
    }
    s.slides[slideIndex].classList.add(s.params.slideActiveClass)

    //  Pagination
    if (!s.pagination) return
    for (i = 0; i < s.bullets.length; i++) {
      s.bullets[i].classList.remove(s.params.bulletActiveClass)
    }
    s.bullets[slideIndex].classList.add(s.params.bulletActiveClass)
  }

  // 更新容器尺寸
  s.updateContainerSize = function () {
    s.max = parseInt(s.slides.length) + parseInt(s.dupSlides.length)
    // Slide width
    s.container.width = s.container.clientWidth
    s.width = Math.floor(s.container.width / s.params.slidesPerView)

    // 设置wrapper宽度
    s.wrapper.width = s.width * s.max

    s.wrapper.style.width = s.wrapper.width + 'px'

    // 设置单个slide宽度
    s.slides.forEach(function (n, i, a) {
      n.style.width = s.width + 'px'
    })

    // 设置dupSlide宽度
    s.dupSlides.forEach(function (n, i, a) {
      n.style.width = s.width + 'px'
    })

    // Slide height
    if (s.params.height) {
      s.height = s.params.height
    } else if (s.container.style.height) {
      s.height = s.container.style.height
    } else {
      s.height = (s.container.clientHeight ? s.container.clientHeight : s.wrapper.clientHeight) + 'px'
    }
    // 设置wrapper高度
    s.wrapper.style.height = s.height
    // 设置单个slide高度
    s.slides.forEach(function (n, i, a) {
      n.style.height = s.height
    })
    // 设置dupSlide高度
    s.dupSlides.forEach(function (n, i, a) {
      n.style.height = s.height
    })

    // 更新active index
    s.updateClasses()

    // 如果有循环的话
    if (s.params.loop) {
      s.params.duration = 0
      moveToIndex()
      s.params.duration = defaults.duration
    }
  }

  // 更新
  s.update = function () {
    s.updateSlides()
    s.updateBullets()
    s.createLoop()
    s.updateContainerSize()
  }
  s.update()
  if (s.slides.length <= 0) {
    return
  }

  // 图片懒加载，针对图片类型
  var imgs = []
  var cacheImgs = []
  function imgLoad (e) {
    var target = e.target
    var imgTarget = imgs[target.index]
    if (imgTarget.tagName === 'IMG') {
      imgTarget.src = target.src
    } else {
      imgTarget.style.backgroundImage = 'url(' + target.src + ')'
    }
  }
  s.imgsLazyLoad = function () {
    imgs = this.container.querySelectorAll(s.params.imglazy)
    for (var i = 0; i < imgs.length; i++) {
      var src = imgs[i].getAttribute('data-load-src')
      cacheImgs[i] = new Image()
      cacheImgs[i].index = i
      cacheImgs[i].src = src
      cacheImgs[i].addEventListener('load', imgLoad, false)
    }
  }
  if (s.params.imglazy) s.imgsLazyLoad()
  /* --------------------
  Touch Events
  -------------------- */
  // 绑定事件
  s.events = function (detach) {
    var touchTarget = s.container
    var action = detach ? 'removeEventListener' : 'addEventListener'
    touchTarget[action]('touchstart', s.onTouchStart, false)
    touchTarget[action]('touchmove', s.onTouchMove, false)
    touchTarget[action]('touchend', s.onTouchEnd, false)
    touchTarget[action]('touchcancel', s.onTouchEnd, false)
  }
  // attach、dettach事件
  s.attach = function (event) {
    s.events()
  }
  s.detach = function (event) {
    s.events(true)
  }
  /* --------------------
  Touch Handler
  -------------------- */
  function preventDefault (e) {
    e.preventDefault()
  }
  s.onTouchStart = function (e) {
    s.container.addEventListener('touchmove', preventDefault, false)
    s.touches.startX = e.touches[0].clientX
    s.touches.startY = e.touches[0].clientY
    // 关闭自动播放
    s.stopAutoplay()
  }
  s.onTouchMove = function (e) {
    s.touches.currentX = e.touches[0].clientX
    s.touches.currentY = e.touches[0].clientY
    s.touches.diffX = s.touches.startX - s.touches.currentX
    s.touches.diffY = s.touches.startY - s.touches.currentY
    // runCallBack
    if (s.params.onSlideChange) s.params.onSlideChange(s)

    // 设置滑动方向
    if (s.touches.direction === 0) { // 设置滑动方向(-1上下 | 1左右)
      s.touches.direction = Math.abs(s.touches.diffX) > Math.abs(s.touches.diffY) ? 1 : -1
    }
    if (s.touches.direction === -1) { // 设置垂直方向(-1上 | 1下)
      s.touches.vertical = s.touches.diffY < 0 ? 1 : -1
    }
    if (s.touches.direction === 1) { // 设置左右方向(-1左 | 1右)
      s.touches.horizontal = s.touches.diffX < 0 ? 1 : -1
    }

    // 如果是上下滑动则不工作
    if (s.touches.vertical !== 0) {
      s.container.removeEventListener('touchmove', preventDefault, false)
      return
    }

    // 如果滑动了，则禁止事件向下传播
    e.stopPropagation()

    // x轴距离左边的像素，向左为负数，向右为正数
    var moveX = s.touches.posX - s.touches.diffX
    // 判断是否是边缘
    if (moveX > 0 || -moveX + s.container.width >= s.wrapper.width) {
      return
    }
    s.wrapper.style.webkitTransform = 'translate3d(' + moveX + 'px,0px,0px)'
  }
  s.onTouchEnd = function (e) {
    // s.container.removeEventListener('touchmove',preventDefault,false)
    // 左右拉动
    if (s.touches.direction === 1) {
      if (s.touches.diffX > s.params.threshold) {
        // 下一页
        s.activeIndex++
      } else if (s.touches.diffX < -s.params.threshold) {
        // 上一页
        s.activeIndex--
      }
      s.slideTo(s.activeIndex)
    }
    // 清空滑动方向
    s.touches.direction = 0
    s.touches.vertical = 0
    s.touches.horizontal = 0
    // 开启自动播放
    s.startAutoplay()
  }
  /* --------------------
  Autoplay
  -------------------- */
  s.startAutoplay = function () {
    if (!s.params.autoplay) return
    s.autoplayer = window.setInterval(function () {
      s.activeIndex++
      if (s.activeIndex >= s.max) {
        s.activeIndex = 0
      }
      s.slideTo(s.activeIndex)
    }, s.params.autoplay)
  }

  s.stopAutoplay = function (internal) {
    if (s.autoplayer) {
      window.clearInterval(s.autoplayer)
    }
  }

  /* --------------------
  Method
  -------------------- */
  function moveToIndex () {
    s.wrapper.style.webkitTransitionDuration = s.params.duration + 'ms'
    s.touches.posX = -s.activeIndex * s.width
    s.wrapper.style.webkitTransform = 'translate3d(' + s.touches.posX + 'px,0px,0px)'
  }
  s.slideTo = function (slideIndex) {
    if (slideIndex >= 0) {
      s.activeIndex = slideIndex
    }
    // 索引不能小于0
    if (s.activeIndex < 0) {
      s.activeIndex = 0
    }
    // 索引不能大于slide总数
    if (s.activeIndex > s.max - 1) {
      s.activeIndex = s.max - 1
    }
    // 一页多屏，索引不能露出空白区域
    if (s.params.slidesPerView > 1 && s.activeIndex > s.max - params.slidesPerView) {
      s.activeIndex = s.max - s.params.slidesPerView
    }

    // 更新class
    s.updateClasses()
    // 移动至index
    moveToIndex()
    setTimeout(function () {
      s.wrapper.style.webkitTransitionDuration = '0ms'
      // runCallBack
      s.target = s.slides[s.activeIndex]
      if (s.params.onSlideChangeEnd) s.params.onSlideChangeEnd(s)
      // 循环的情况
      if (s.params.loop) {
        if (s.touches.posX === 0) {
          s.activeIndex = s.max - s.params.slidesPerView * 2
          // console.log('最左侧，应跳转到：'+s.activeIndex)
          s.params.duration = 0
          moveToIndex()
          s.params.duration = defaults.duration
          return
        }
        if (-s.touches.posX + s.container.width >= s.wrapper.width) {
          s.activeIndex = s.params.slidesPerView
          // console.log('最右侧，应跳转到：'+s.activeIndex)
          s.params.duration = 0
          moveToIndex()
          s.params.duration = defaults.duration
          return
        }
      }
    }, s.params.duration)
  }

  // 主函数
  s.init = function () {
    // s.update()
    s.attach()
    if (s.params.autoplay) s.startAutoplay()
    // runCallBack
    s.target = s.slides[s.activeIndex]
    if (s.params.onInit) s.params.onInit(s)
  }
  // 执行主函数
  s.init()
  //  Return slider instance
  return s
};

/* Carrousel.prototype = (function () {
  return {
  }
})() */

//export default Carrousel
