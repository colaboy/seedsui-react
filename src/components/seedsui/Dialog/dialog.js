// Dialog 自定义弹出框
var Dialog = function (params) {
  /* -------------------------
  Model
  ------------------------- */
  var defaults = {
    overflowContainer: document.body,
    overflowContainerActiveClass: 'overflow-hidden',

    position: 'middle',

    animationAttr: 'data-animation',
    animation: 'fade',

    mask: null,
    wrapper: null,

    maskClass: 'mask',
    maskActiveClass: 'active',
    maskFeatureClass: 'dialog-mask',

    dialogClass: 'dialog',
    dialogActiveClass: 'active',

    css: {},
    maskCss: {},
    isClickMaskHide: true
    /* callbacks
    onClick:function(Dialog)
    onClickMask:function(Dialog)
    onTransitionEnd:function(Dialog)
    onShowed(Dialog)// 显示动画结束后回调
    onHid(Dialog)// 隐藏动画结束后回调
      */
  }
  params = params || {}
  for (var def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def]
    }
  }

  // Dialog
  var s = this

  // Params
  s.params = params
  // Mask
  s.mask
  // Dialog(外层生成的包裹容器)
  s.dialog
  // Wrapper(源容器)
  s.wrapper
  // Parent(父容器，为了方便在源容器处插入包裹容器)
  s.parent
  // OverflowContainer
  s.overflowContainer = typeof s.params.overflowContainer === 'string' ? document.querySelector(s.params.overflowContainer) : s.params.overflowContainer

  // Mask
  s.createMask = function () {
    var mask = document.createElement('div')
    mask.setAttribute('class', s.params.maskClass + ' ' + s.params.maskFeatureClass)
    return mask
  }

  // Dialog
  s.createDialog = function () {
    var dialog = document.createElement('div')
    dialog.classList.add(s.params.dialogClass, s.params.position)
    dialog.setAttribute(s.params.animationAttr, s.params.animation)
    return dialog
  }
  s.create = function () {
    if (s.params.mask) s.mask = typeof s.params.mask === 'string' ? document.querySelector(s.params.mask) : s.params.mask
    if (s.mask) {
      s.parent = s.mask.parentNode
      s.dialog = s.mask.querySelector('.' + s.params.dialogClass)
      return true
    } else {
      // 获取wrapper
      s.wrapper = typeof s.params.wrapper === 'string' ? document.querySelector(s.params.wrapper) : s.params.wrapper
      if (!s.wrapper) {
        console.log('SeedsUI Error：未找到Dialog的DOM对象，请检查传入参数是否正确')
        return false
      }
      // 确定父级
      s.parent = s.wrapper.parentNode
      // 插入Dialog
      s.dialog = s.createDialog()
      s.parent.insertBefore(s.dialog, s.wrapper)
      s.dialog.appendChild(s.wrapper)
      // 插入遮罩
      s.mask = s.createMask()
      s.mask.appendChild(s.dialog)
      s.parent.appendChild(s.mask)
      return true
    }
  }
  var isCreated = s.create()
  if (!isCreated) return
  s.update = function () {
    var style
    // Dialog Css
    for (style in s.params.css) {
      s.dialog.style[style] = s.params.css[style]
    }
    // Mask Css
    for (style in s.params.maskCss) {
      s.mask.style[style] = s.params.maskCss[style]
    }
    // 源容器显示
    if (s.wrapper) s.wrapper.style.display = 'block'
  }
  s.update()

  /* -------------------------
  Method
  ------------------------- */
  s.showMask = function () {
    s.mask.classList.add(s.params.maskActiveClass)
  }
  s.hideMask = function () {
    s.mask.classList.remove(s.params.maskActiveClass)
  }
  s.destroyMask = function () {
    s.parent.removeChild(s.mask)
  }
  s.showDialog = function () {
    s.dialog.classList.add(s.params.dialogActiveClass)
  }
  s.hideDialog = function () {
    s.dialog.classList.remove(s.params.dialogActiveClass)
  }
  s.destroyDialog = function () {
    s.parent.removeChild(s.dialog)
  }
  s.isHid = true
  s.hide = function () {
    s.isHid = true
    s.hideMask()
    s.hideDialog()
    // 显示滚动条
    if (s.overflowContainer) s.overflowContainer.classList.remove(s.params.overflowContainerActiveClass)
  }
  s.show = function () {
    s.isHid = false
    s.showMask()
    s.showDialog()
    // 禁用滚动条
    if (s.overflowContainer) s.overflowContainer.classList.add(s.params.overflowContainerActiveClass)
  }
  s.toggle = function () {
    if (s.isHid) {
      s.show()
    } else {
      s.hide()
    }
  }
  s.destroy = function () {
    s.destroyMask()
    //  s.destroyDialog()
  }

  // 设置
  s.setOnClick = function (fn) {
    s.params.onClick = fn
  }
  s.setOnClickMask = function (fn) {
    s.params.onClickMask = fn
  }

  /* -------------------------
  Control
  ------------------------- */
  s.events = function (detach) {
    var touchTarget = s.dialog
    var action = detach ? 'removeEventListener' : 'addEventListener'
    touchTarget[action]('click', s.onClick, false)
    touchTarget[action]('webkitTransitionEnd', s.onTransitionEnd, false)
    // 遮罩
    s.mask[action]('click', s.onClickMask, false)
  }

  // attach、dettach事件
  s.attach = function (event) {
    s.events()
  }
  s.detach = function (event) {
    s.events(true)
  }
  s.onClick = function (e) {
    s.target = e.target
    // CallBack onClick
    if (s.params.onClick) s.params.onClick(s)
  }
  s.onClickMask = function (e) {
    if (e.target === s.mask) {
      s.target = e.target
      // CallBack onClickMask
      if (s.params.onClickMask) s.params.onClickMask(s)
      if (s.params.isClickMaskHide) s.hide()
    }
  }
  s.onTransitionEnd = function (e) {
    if (e.propertyName === 'visibility') return
    s.target = e.target
    // Callback onTransitionEnd
    if (s.params.onTransitionEnd) s.params.onTransitionEnd(s)
    if (s.isHid) {
      // Callback onHid
      if (s.params.onHid) s.params.onHid(s)
    } else {
      // Callback onShowed
      if (s.params.onShowed) s.params.onShowed(s)
    }
  }

  s.init = function () {
    s.attach()
  }
  s.init()
}

export default Dialog
