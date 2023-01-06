// Indexbar 索引控件
var Indexbar = function (params) {
  /* -----------------------
  Model
  ----------------------- */
  var defaults = {
    container: null,
    tooltipContainer: null,

    buttonClass: 'indexbar-button',
    buttonActiveClass: 'active',

    containerActiveClass: 'active',

    tooltipClass: 'indexbar-tooltip',
    tooltipActiveClass: 'active',

    linkAnchorAttr: 'data-indexbar-link',
    anchorAttr: 'data-indexbar-anchor'
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

  // IndexBar容器
  s.container =
    typeof s.params.container === 'string'
      ? document.querySelector(s.params.container)
      : s.params.container

  if (!s.container) {
    console.error('SeedsUI IndexBar: 序列容器为空')
    return
  }
  // 滚动容器
  if (s.container.previousElementSibling) {
    s.overflowContainer = s.container.previousElementSibling
  }

  if (!s.overflowContainer) {
    console.error('SeedsUI IndexBar: 滚动容器为空')
    return
  }

  // 提示容器
  s.tooltipContainer =
    typeof s.params.tooltipContainer === 'string'
      ? document.querySelector(s.params.tooltipContainer)
      : s.params.tooltipContainer

  if (!s.tooltipContainer) {
    console.error('SeedsUI IndexBar: tooltip容器为空')
    return
  }
  /* -----------------------
	Method
	----------------------- */
  // 获取所有锚点
  s.getAnchors = function () {
    let anchors = []
    let anchorsDOM = s.overflowContainer.querySelectorAll('[' + s.params.anchorAttr + ']')
    for (let i = 0, anchorDOM; (anchorDOM = anchorsDOM[i++]); ) {
      let anchorName = anchorDOM.getAttribute(s.params.anchorAttr)
      anchors.push(anchorName)
    }
    return anchors
  }

  // 选中button
  s.activeButton = function (button) {
    let buttonsDOM = s.container.querySelectorAll('.' + s.params.buttonClass)
    if (buttonsDOM && buttonsDOM.length) {
      for (let i = 0, buttonDOM; (buttonDOM = buttonsDOM[i++]); ) {
        buttonDOM.classList.remove(s.params.buttonActiveClass)
      }
    }

    if (button) {
      button.classList.add(s.params.buttonActiveClass)
    }
  }

  // 滚动到指定位置
  s.goAnchor = function (y) {
    var button = document.elementFromPoint(s.touches.startX, y)
    if (!button || !button.parentNode || button.parentNode !== s.container) return

    // 获取link文本
    let linkName = button.getAttribute(s.params.linkAnchorAttr)
    if (!linkName) return

    // 选中button
    s.activeButton(button)

    // 修改tooltip文字
    s.tooltipContainer.innerHTML = linkName || ''

    // 对应滚动容器中的目标元素
    var anchor = s.overflowContainer.querySelector(
      '[' + s.params.anchorAttr + '="' + linkName + '"]'
    )

    // 移动位置
    if (anchor) s.overflowContainer.scrollTop = anchor.offsetTop
  }

  /* -----------------------
	Touch Events
	----------------------- */
  // body事件绑定
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
    e.preventDefault()
    // e.currentTarget.addEventListener('touchmove', preventDefault, false)
    s.touches.startX = e.touches[0].clientX
    s.touches.startY = e.touches[0].clientY
    // 滚动到指定位置
    s.goAnchor(s.touches.startY)
    // 激活indexbar
    s.container.classList.add(s.params.containerActiveClass)
    s.tooltipContainer.classList.add(s.params.tooltipActiveClass)
  }
  s.onTouchMove = function (e) {
    e.preventDefault()
    s.touches.currentY = e.touches[0].clientY
    s.goAnchor(s.touches.currentY)
  }
  s.onTouchEnd = function (e) {
    e.preventDefault()
    // e.currentTarget.removeEventListener('touchmove', preventDefault, false)
    // 移除激活indexbar
    s.activeButton()
    s.container.classList.remove(s.params.containerActiveClass)
    s.tooltipContainer.classList.remove(s.params.tooltipActiveClass)
  }
  s.attach()
}

export default Indexbar
