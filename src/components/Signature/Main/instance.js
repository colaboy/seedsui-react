let Signature = function (container, params) {
  /* ----------------------
  Model
  ---------------------- */
  let defaults = {
    strokeStyle: '#000',
    lineWidth: 3,

    suffix: 'image/png',
    quality: 0.92
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
    for (let param in params) {
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
    let action = detach ? 'removeEventListener' : 'addEventListener'
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
  // 清除签名
  s.clear = function () {
    s.ctx.clearRect(0, 0, s.width, s.height)
    // 清除画过
    s.isDrew = false
  }
  // 是否空白
  s.isBlank = function () {
    let blank = document.createElement('canvas')
    blank.width = s.container.width
    blank.height = s.container.height
    if (s.container.toDataURL() === blank.toDataURL()) return true
    return false
  }
  // 保存签名
  s.getBase64 = function () {
    return s.container.toDataURL(s.params.suffix, s.params.quality)
  }
  // 主函数
  s.init = function () {
    s.attach()
  }

  s.init()
}

export default Signature
