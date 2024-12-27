// Dialog 自定义弹出框
var Dialog = function (params) {
  /* -------------------------
  Model
  ------------------------- */
  var defaults = {
    overflowContainer: document.body,
    overflowContainerActiveClass: 'overflow-hidden',

    animationAttr: 'data-animation',
    animation: 'fade', // slideLeft | slideRight | slideUp | slideDown | zoom | fade
    animationClass: 'popup-animation middle',
    duration: 300,

    mask: null,
    wrapper: null, // wrapper为注入内容, 必须存在实体DOM, 否则不能工作, 并且在没有parent的情况下, dialog将渲染于wrapper同级
    parent: null,

    maskClass: 'mask dialog-mask',
    maskActiveClass: 'active',

    dialogClass: 'dialog',
    dialogActiveClass: 'active',

    dialogCss: '',
    maskCss: '',
    isClickMaskHide: true,
    args: null
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
  // Parent
  s.parent = null
  // Mask
  s.mask = null
  // Dialog(外层生成的包裹容器)
  s.dialog = null
  // OverflowContainer
  s.overflowContainer =
    typeof s.params.overflowContainer === 'string'
      ? document.querySelector(s.params.overflowContainer)
      : s.params.overflowContainer

  // Mask
  s.updateMask = function () {
    if (!s.mask || !s.mask.tagName) {
      s.mask = document.createElement('div')
    }
    s.mask.setAttribute('class', s.params.maskClass)
    s.mask.setAttribute('style', s.params.maskCss)
    s.mask.style.webkitTransitionDuration = s.params.duration + 'ms'
  }
  // Wrapper
  s.updateWrapper = function () {
    // wrapper为注入内容, 必须存在实体DOM, 否则不能工作
    s.wrapper =
      typeof s.params.wrapper === 'string'
        ? document.querySelector(s.params.wrapper)
        : s.params.wrapper
  }
  // Parent
  s.updateParent = function () {
    s.parent =
      typeof s.params.parent === 'string'
        ? document.querySelector(s.params.parent)
        : s.params.parent
    // 没有parent的情况下, 取出wrapper的父级
    if (!s.parent && s.wrapper) {
      s.parent = s.wrapper.parentNode
    }
    if (!s.overflowContainer) s.overflowContainer = s.parent
  }
  // Dialog
  s.updateDialog = function () {
    if (!s.dialog) {
      s.dialog = document.createElement('div')
    }
    s.dialog.setAttribute(
      'class',
      s.params.dialogClass + (s.params.animationClass ? ' ' + s.params.animationClass : '')
    )
    s.dialog.setAttribute('style', s.params.dialogCss)
    s.dialog.setAttribute(s.params.animationAttr, s.params.animation)
    s.dialog.style.webkitTransitionDuration = s.params.duration + 'ms'
  }
  // 创建DOM
  s.createDOM = function () {
    // 先取出父级
    s.updateWrapper()
    s.updateParent()
    if (s.parent) {
      // Dialog
      s.updateDialog()
      s.parent.insertBefore(s.dialog, s.wrapper)
      s.dialog.appendChild(s.wrapper)

      // Mask
      s.updateMask()
      s.mask.appendChild(s.dialog)
      s.parent.appendChild(s.mask)

      // 显示
      s.wrapper.style.display = 'block'
    } else {
      console.warn('SeedsUI Dialog: 没有父级, 请检查wrapper是否存在, 或者传入正确的parent')
    }
  }
  // 更新DOM
  s.updateDOM = function () {
    // 先取出父级
    s.updateWrapper()
    s.updateParent()
    if (s.parent) {
      // Dialog
      s.updateDialog()
      // Mask
      s.updateMask()
    } else {
      console.warn('SeedsUI Dialog: 没有父级, 请检查wrapper是否存在, 或者传入正确的parent')
    }
  }

  // Dialog
  s.update = function () {
    if (s.mask && s.wrapper && s.dialog) {
      s.updateDOM()
    }
    if (s.params.mask)
      s.mask =
        typeof s.params.mask === 'string' ? document.querySelector(s.params.mask) : s.params.mask
    if (s.mask && s.mask.tagName) {
      s.dialog = s.mask.querySelector('.' + s.params.dialogClass)
      s.updateDOM()
    } else {
      s.createDOM()
    }
  }
  s.update()

  // 更新params
  s.updateParams = function (params = {}) {
    for (var param in params) {
      s.params[param] = params[param]
    }
    s.update()
  }
  /* -------------------------
  Method
  ------------------------- */
  s.setMaskCss = function (css) {
    if (css) s.params.maskCss = css
    s.mask.setAttribute('style', s.params.maskCss)
    s.mask.style.webkitTransitionDuration = s.params.duration + 'ms'
  }
  s.setMaskClassName = function (className) {
    if (className) s.params.maskClass = className
    s.mask.setAttribute('class', s.params.maskClass)
  }
  s.setDialogCss = function (css) {
    if (css) s.params.dialogCss = css
    s.dialog.setAttribute('style', s.params.dialogCss)
    s.dialog.style.webkitTransitionDuration = s.params.duration + 'ms'
  }
  s.setDialogClassName = function (className) {
    if (className) s.params.dialogClass = className
    s.dialog.setAttribute('class', s.params.dialogClass)
  }
  s.showMask = function () {
    s.mask.classList.add(s.params.maskActiveClass)
  }
  s.hideMask = function () {
    s.mask.classList.remove(s.params.maskActiveClass)
  }
  s.destroyMask = function () {
    s.mask.parentNode.removeChild(s.mask)
  }
  s.showDialog = function () {
    s.dialog.classList.add(s.params.dialogActiveClass)
  }
  s.hideDialog = function () {
    s.dialog.classList.remove(s.params.dialogActiveClass)
  }
  s.isHid = true
  s.hide = function () {
    s.isHid = true
    s.hideMask()
    s.hideDialog()
    // 显示滚动条
    if (s.overflowContainer)
      s.overflowContainer.classList.remove(s.params.overflowContainerActiveClass)
  }
  s.show = function () {
    s.isHid = false
    s.showMask()
    s.showDialog()
    // 禁用滚动条
    if (s.overflowContainer)
      s.overflowContainer.classList.add(s.params.overflowContainerActiveClass)
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
    if (!touchTarget) return
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
  s.getArgs = function (e) {
    var args = s.params.args
    if (args !== undefined) {
      if (typeof args === 'string' && args === '$event') {
        args = e
      } else if (Array.isArray(args) && args.indexOf('$event') > -1) {
        args[args.indexOf('$event')] = e
      }
    } else {
      args = e
    }
    return args
  }
  s.onClick = function (e) {
    s.event = e
    // CallBack onClick
    if (s.params.onClick) s.params.onClick(s, s.getArgs(e))
  }
  s.onClickMask = function (e) {
    if (e.target === s.mask) {
      s.event = e
      // CallBack onClickMask
      if (s.params.onClickMask) s.params.onClickMask(s, s.getArgs(e))
      if (s.params.isClickMaskHide) s.hide()
    }
  }
  s.onTransitionEnd = function (e) {
    if (e.propertyName === 'visibility') return
    s.event = e
    // Callback onTransitionEnd
    if (s.params.onTransitionEnd) s.params.onTransitionEnd(s, s.getArgs(e))
    if (s.isHid) {
      // Callback onHid
      if (s.params.onHid) s.params.onHid(s, s.getArgs(e))
    } else {
      // Callback onShowed
      if (s.params.onShowed) s.params.onShowed(s, s.getArgs(e))
    }
  }

  s.init = function () {
    s.attach()
  }
  s.init()
}

export default Dialog
