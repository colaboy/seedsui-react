var Handsign = function (container, params) {
  /* ----------------------
  Model
  ---------------------- */
  var defaults = {
    strokeStyle: '#000',
    lineWidth: 3,

    suffix: 'image/png',
    quality: 0.92
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
    console.log('SeedsUI Error : HandSign container不存在，请检查页面中是否有此元素')
    return
  }
  s.width = s.container.width
  s.height = s.container.height
  s.ctx = s.container.getContext('2d')
  s.stageInfo = s.container.getBoundingClientRect()
  s.path = {
    beginX: 0,
    beginY: 0,
    endX: 0,
    endY: 0
  }
  // 标识是否绘制过
  s.isDrew = false

  // 更新params
  s.updateParams = function (params = {}) {
    for (var param in params) {
      s.params[param] = params[param]
    }
  }
  /* ----------------------
  Events
  ---------------------- */
  s.preventDefault = function (e) {
    e.preventDefault()
  }
  s.events = function (detach) {
    var action = detach ? 'removeEventListener' : 'addEventListener'
    s.container[action]('touchstart', s.onTouchStart, false)
    s.container[action]('touchmove', s.onTouchMove, false)
    s.container[action]('touchend', s.onTouchEnd, false)
    s.container[action]('touchcancel', s.onTouchEnd, false)
  }
  // attach、detach事件
  s.attach = function () {
    s.events()
  }
  s.detach = function () {
    s.events(true)
  }
  s.onTouchStart = function (e) {
    e.stopPropagation()
    s.container.addEventListener('touchmove', s.preventDefault, false)
    window.getSelection() ? window.getSelection().removeAllRanges() : document.selection.empty()
    s.ctx.strokeStyle = s.params.strokeStyle
    s.ctx.lineWidth = s.params.lineWidth
    s.stageInfo = s.container.getBoundingClientRect()
    s.ctx.beginPath()
    s.ctx.moveTo(
      e.changedTouches[0].clientX - s.stageInfo.left,
      e.changedTouches[0].clientY - s.stageInfo.top
    )
    s.path.beginX = e.changedTouches[0].clientX - s.stageInfo.left
    s.path.beginY = e.changedTouches[0].clientY - s.stageInfo.top
  }
  s.onTouchMove = function (e) {
    e.stopPropagation()
    s.ctx.lineTo(
      e.changedTouches[0].clientX - s.stageInfo.left,
      e.changedTouches[0].clientY - s.stageInfo.top
    )
    s.path.endX = e.changedTouches[0].clientX - s.stageInfo.left
    s.path.endY = e.changedTouches[0].clientY - s.stageInfo.top
    s.ctx.stroke()
    // 标识是否绘制过
    s.isDrew = true
  }
  s.onTouchEnd = function (e) {
    s.container.removeEventListener('touchmove', s.preventDefault, false)
  }
  /* ----------------------
  Method
  ---------------------- */
  // 获取设备缩放比率
  s.getPixelRatio = function () {
    var context = s.ctx
    var backingStore =
      context.backingStorePixelRatio ||
      context.webkitBackingStorePixelRatio ||
      context.mozBackingStorePixelRatio ||
      context.msBackingStorePixelRatio ||
      context.oBackingStorePixelRatio ||
      context.backingStorePixelRatio ||
      1
    return (window.devicePixelRatio || 1) / backingStore
  }
  // 清除签名
  s.clear = function () {
    s.ctx.clearRect(0, 0, s.width, s.height)
    // 清除画过
    s.isDrew = false
  }
  // 是否空白
  s.blank = function () {
    var blank = document.createElement('canvas')
    blank.width = s.container.width
    blank.height = s.container.height
    if (s.container.toDataURL() === blank.toDataURL()) return true
    return false
  }
  // 保存签名
  s.save = function () {
    return s.container.toDataURL(s.params.suffix, s.params.quality)
  }
  // 计算top left bottom center的位置
  s.calcPosition = function (w, h, pos) {
    var posArr = pos.split(' ').map(function (item, index) {
      var x = 0
      var y = 0
      // 如果是数字
      if (!isNaN(item)) {
        if (index === 0) return { x: item }
        if (index === 1) return { y: item }
      }
      // 如果是字符串
      if (item === 'top') return { y: 0 }
      if (item === 'left') return { x: 0 }
      if (item === 'right') {
        x = s.width < w ? 0 : s.width - w
        return { x: x }
      }
      if (item === 'bottom') {
        y = s.height < h ? 0 : s.height - h
        return { y: y }
      }
      if (item === 'center') {
        x = (s.width - w) / 2
        return { x: x }
      }
      if (item === 'middle') {
        y = (s.height - h) / 2
        return { y: y }
      }
      return { x: 0, y: 0 }
    })
    var posJson = {
      x: 0,
      y: 0
    }
    posArr.forEach(function (item) {
      if (item.x) {
        posJson.x = item.x
      } else if (item.y) {
        posJson.y = item.y
      }
    })
    return {
      x: posJson.x || 0,
      y: posJson.y || 0
    }
  }
  // 绘制图片
  s.drawImg = function (imgSrc, opts = {}) {
    if (!imgSrc) {
      console.log('SeedsUI Error:手写签名drawImg缺少imgSrc')
      return
    }
    var imgW = opts.width
    var imgH = opts.height
    var imgP = opts.position || 'bottom right'

    var img = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = imgSrc
    img.onload = function (e) {
      var sx = 0 // 剪切的 x 坐标
      var sy = 0 // 剪切的 y 坐标
      var width = imgW || img.width // 使用的图像宽度
      var height = imgH || img.height // 使用的图像高度
      var swidth = img.width // 剪切图像的宽度
      var sheight = img.height // 剪切图像的高度
      var pos = s.calcPosition(width, height, imgP) // 画布上放置xy坐标
      s.ctx.drawImage(img, sx, sy, swidth, sheight, pos.x, pos.y, width, height)
      // 成功回调
      s.event = e
      if (opts.onSuccess) opts.onSuccess(s)
    }
    img.onerror = function (err) {
      if (opts.onError) opts.onError(err, { errMsg: '非法的图片格式' })
    }
  }
  // 绘制文字
  s.drawFont = function (text, opts = {}) {
    if (!text) {
      console.log('SeedsUI Error:手写签名drawFont缺少文字')
      return
    }
    var fontSize = opts.fontSize || 15
    var fontFamily = opts.fontFamily || 'microsoft yahei'
    var fontPosition = opts.position || 'bottom center'
    var fontStyle = opts.color || 'rgba(0, 0, 0, 1)'
    if (isNaN(fontSize)) {
      console.log('SeedsUI Error:文字大小请输入数字类型')
      return
    }
    var height = fontSize
    var width = text.length * height
    var pos = s.calcPosition(width, height, fontPosition) // 画布上放置xy坐标
    var calcY = pos.y === 0 ? Number(pos.y) + Number(height) : Number(pos.y) + Number(height) - 5 // 文字垂直位置有整个高度的偏差
    // 写字
    s.ctx.font = fontSize + 'px ' + fontFamily
    s.ctx.fillStyle = fontStyle
    s.ctx.fillText(text, pos.x, calcY)
  }
  // 绘制背景
  s.drawBackgroundColor = function (fillStyle) {
    s.ctx.fillStyle = fillStyle
    s.ctx.fillRect(0, 0, s.width, s.height)
  }
  // 主函数
  s.init = function () {
    s.attach()
  }

  s.init()
}

export default Handsign
