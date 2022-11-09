var Imgmark = function (container, params) {
  /* ----------------------
  Model
  ---------------------- */
  var defaults = {
    loadingClass: 'imgmark-loading',
    errorClass: 'imgmark-error',
    activeClass: 'active',

    src: '',
    isDrawSrc: true, // 是否连同背景一起绘制到canvas上
    data: [],
    strokeStyle: '#00ff00',
    lineWidth: 3,

    suffix: 'image/png',
    quality: 0.92

    /*
    Callbacks:
    onSuccess: function(Imgmark)
    onError: function(e, {errMsg: ''})
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
  s.container = typeof container === 'string' ? document.querySelector(container) : container
  if (!s.container) {
    console.log('SeedsUI Error : ImgMark container不存在，请检查页面中是否有此元素')
    return
  }
  s.loadingContainer = s.container.parentNode.querySelector('.' + s.params.loadingClass) || null
  s.errorContainer = s.container.parentNode.querySelector('.' + s.params.errorClass) || null
  s.ctx = s.container.getContext('2d')
  s.stageInfo = s.container.getBoundingClientRect()
  s.path = {
    beginX: 0,
    beginY: 0,
    endX: 0,
    endY: 0
  }

  /* ----------------------
  Method
  ---------------------- */
  // 清除
  s.clear = function () {
    s.ctx.clearRect(0, 0, s.container.width, s.container.height)
  }
  // 保存图片为base64
  s.save = function () {
    try {
      return s.container.toDataURL(s.params.suffix, s.params.quality)
    } catch (error) {
      console.error(error)
      return null
    }
  }
  // 绘制图片
  s.draw = function (img, data, isDrawSrc) {
    if (!img) {
      console.log('SeedsUI Error:ImgMark执行draw缺少img')
      return
    }
    if (!data) {
      console.log('SeedsUI Error:ImgMark执行draw缺少img')
      return
    }
    if (isDrawSrc) {
      s.ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height)
    }
    for (let item of data) {
      if (item.strokeStyle) s.ctx.strokeStyle = item.strokeStyle
      else s.ctx.strokeStyle = s.params.strokeStyle
      if (item.lineWidth) s.ctx.lineWidth = item.lineWidth
      else s.ctx.lineWidth = s.params.lineWidth
      if (item.setLineDash) s.ctx.setLineDash(item.setLineDash)
      s.ctx.strokeRect(item.x1, item.y1, item.x2 - item.x1, item.y2 - item.y1)
    }
  }
  s.update = function () {
    if (s.params.src) {
      var img = new Image()
      img.src = s.params.src
      img.addEventListener('load', s.onLoad, false)
      img.addEventListener('error', s.onError, false)
    }
  }
  // 更新params
  s.updateParams = function (params = {}) {
    for (var param in params) {
      s.params[param] = params[param]
    }
    s.update()
  }
  /* ----------------------
  Events
  ---------------------- */
  s.onLoad = function (e) {
    var target = e.target
    // 显隐
    if (s.loadingContainer) s.loadingContainer.classList.remove(s.params.activeClass)
    if (s.errorContainer) s.errorContainer.classList.remove(s.params.activeClass)
    s.container.classList.add(s.params.activeClass)
    // 绘图
    s.container.width = target.width
    s.container.height = target.height
    s.draw(target, s.params.data, s.params.isDrawSrc)
    // 缩小
    var scale = s.params.height / target.height
    s.container.style.WebkitTransform = `scale(${scale}) translate(-50%,-50%)`
    s.container.style.WebkitTransformOrigin = `0 0`
    // Callback
    s.event = e
    if (s.params.onSuccess) s.params.onSuccess(s)
  }
  s.onError = function (e) {
    if (s.loadingContainer) s.loadingContainer.classList.remove(s.params.activeClass)
    if (s.errorContainer) s.errorContainer.classList.add(s.params.activeClass)
    s.container.classList.remove(s.params.activeClass)
    // Callback
    s.event = e
    if (s.params.onError) s.params.onError(e, { errMsg: '' })
  }
  // 主函数
  s.init = function () {
    s.update()
  }

  s.init()
}

export default Imgmark
