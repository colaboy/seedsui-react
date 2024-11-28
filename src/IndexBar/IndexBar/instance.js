// Indexbar 索引控件
const Indexbar = function (params) {
  /* -----------------------
  Model
  ----------------------- */
  let defaults = {
    overflowContainer: null,
    container: null,
    tooltipContainer: null
  }
  // eslint-disable-next-line
  params = params || {}
  for (let def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def]
    }
  }
  // Indexbar
  let s = this

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
  s.overflowContainer =
    typeof s.params.overflowContainer === 'string'
      ? document.querySelector(s.params.overflowContainer)
      : s.params.overflowContainer

  if (!s.overflowContainer && s.container.previousElementSibling) {
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
    let anchorsDOM = s.overflowContainer.querySelectorAll('[data-indexbar-anchor]')
    for (let i = 0, anchorDOM; (anchorDOM = anchorsDOM[i++]); ) {
      let anchorName = anchorDOM.getAttribute('data-indexbar-anchor')
      anchors.push(anchorName)
    }
    return anchors
  }

  // 选中button
  s.activeButton = function (button) {
    let buttonsDOM = s.container.querySelectorAll('.indexbar-button')
    if (buttonsDOM && buttonsDOM.length) {
      for (let i = 0, buttonDOM; (buttonDOM = buttonsDOM[i++]); ) {
        buttonDOM.classList.remove('active')
      }
    }

    if (button) {
      button.classList.add('active')
    }
  }

  // 滚动到指定位置
  s.goAnchor = function (y) {
    let button = document.elementFromPoint(s.touches.startX, y)
    if (!button || !button.parentNode || button.parentNode !== s.container) return

    // 获取link文本
    let linkName = button.getAttribute('data-indexbar-link')
    if (!linkName) return

    // 选中button
    s.activeButton(button)

    // 修改tooltip文字
    s.tooltipContainer.innerHTML = linkName || ''

    // 对应滚动容器中的目标元素
    let anchor = s.overflowContainer.querySelector('[data-indexbar-anchor="' + linkName + '"]')

    // 移动位置
    if (anchor) s.overflowContainer.scrollTop = anchor.offsetTop
  }

  /* -----------------------
	Touch Events
	----------------------- */
  // body事件绑定
  s.events = function (detach) {
    let touchTarget = s.container
    let action = detach ? 'removeEventListener' : 'addEventListener'
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
    s.container.classList.add('active')
    s.tooltipContainer.classList.add('active')
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
    s.container.classList.remove('active')
    s.tooltipContainer.classList.remove('active')
  }
  s.attach()
}

export default Indexbar
