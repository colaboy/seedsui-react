// Indexbar 索引控件
var Indexbar = function (params) {
  /* -----------------------
  Model
  ----------------------- */
  var defaults = {
    overflowContainer: null,
    parent: document.body,

    bar: null,
    barClass: 'indexbar',
    barActiveClass: 'active',

    buttonClass: 'indexbar-button',

    tooltip: null,
    tooltipClass: 'indexbar-tooltip',

    indexAttr: 'data-indexbar-name', // DOM索引属性
    indexs: null
  }
  params = params || {}
  for (var def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def]
    }
  }
  // Indexbar
  var s = this

  // Params
  s.params = params

  // Parent | OverflowContainer
  s.parent =
    typeof s.params.parent === 'string' ? document.querySelector(s.params.parent) : s.params.parent
  s.overflowContainer =
    typeof s.params.overflowContainer === 'string'
      ? document.querySelector(s.params.overflowContainer)
      : s.params.overflowContainer
  if (!s.parent) {
    console.warn('SeedsUI Error: IndexBar控件缺少parent')
    return
  }
  if (!s.overflowContainer) s.overflowContainer = s.parent

  // Bar
  s.bar = null
  s.updateBar = function () {
    if (!s.bar)
      s.bar = typeof s.params.bar === 'string' ? document.querySelector(s.params.bar) : s.params.bar
    if (!s.bar || !s.bar.tagName) s.bar = s.parent.querySelector('.' + s.params.barClass)
    if (!s.bar) {
      s.bar = document.createElement('div')
      s.parent.appendChild(s.bar)
    }
    s.bar.setAttribute('class', s.params.barClass)
  }
  s.updateIndexs = function () {
    if (!s.params.indexs) return
    s.bar.innerHTML = ''
    s.indexs = []
    s.params.indexs.forEach(function (n) {
      var button = document.createElement('span')
      button.setAttribute('class', s.params.buttonClass)
      button.innerHTML = n
      s.indexs.push(button)
      s.bar.appendChild(button)
    })
  }

  // ToolTip
  s.updateToolTip = function () {
    if (!s.tooltip)
      s.tooltip =
        typeof s.params.tooltip === 'string'
          ? document.querySelector(s.params.tooltip)
          : s.params.tooltip
    if (!s.tooltip || !s.tooltip.tagName)
      s.tooltip = s.parent.querySelector('.' + s.params.tooltipClass)
    if (!s.tooltip) {
      s.tooltip = document.createElement('div')
      s.bar.parentNode.insertBefore(s.tooltip, s.bar.nextSibling)
    }
    s.tooltip.setAttribute('class', s.params.tooltipClass)
  }

  // Indexs
  s.update = function () {
    s.updateBar()
    s.updateIndexs()
    s.updateToolTip()
  }
  s.update()

  // 更新params
  s.updateParams = function (params = {}) {
    for (var param in params) {
      s.params[param] = params[param]
    }
    s.update()
  }
  /* -----------------------
	Method
	----------------------- */
  var currentHTML = 'A'
  s.goIndex = function (y) {
    // 修改文字
    var current = document.elementFromPoint(s.touches.startX, y)
    if (!current || !current.parentNode || current.parentNode !== s.bar) return
    currentHTML = current.innerHTML
    s.tooltip.innerHTML = currentHTML
    // 对应滚动容器中的目标元素
    var target = s.overflowContainer.querySelector(
      '[' + s.params.indexAttr + '="' + currentHTML + '"]'
    )
    // 移动位置
    if (target) s.overflowContainer.scrollTop = target.offsetTop
  }

  /* -----------------------
	Touch Events
	----------------------- */
  // body事件绑定
  s.events = function (detach) {
    var touchTarget = s.bar
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
  /* -----------------------
	Touch Handler
	----------------------- */
  // Touch信息
  s.touches = {
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    endX: 0,
    endY: 0
  }
  // 索引
  // function preventDefault(e) {
  // 	e.preventDefault()
  // }
  s.onTouchStart = function (e) {
    // e.currentTarget.addEventListener('touchmove', preventDefault, false)
    s.touches.startX = e.touches[0].clientX
    s.touches.startY = e.touches[0].clientY
    // 滚动到指定位置
    s.goIndex(s.touches.startY)
    // 激活indexbar
    s.bar.classList.add(s.params.barActiveClass)
  }
  s.onTouchMove = function (e) {
    s.touches.currentY = e.touches[0].clientY
    s.goIndex(s.touches.currentY)
  }
  s.onTouchEnd = function (e) {
    // e.currentTarget.removeEventListener('touchmove', preventDefault, false)
    // 移除激活indexbar
    s.bar.classList.remove(s.params.barActiveClass)
  }
  s.attach()
}

export default Indexbar
